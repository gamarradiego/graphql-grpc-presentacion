import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "..", "proto", "library.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const authors = [
  { id: 1, name: "Gabriel García Márquez", nationality: "Colombiana", birthYear: 1927 },
  { id: 2, name: "Jane Austen", nationality: "Británica", birthYear: 1775 },
  { id: 3, name: "Haruki Murakami", nationality: "Japonesa", birthYear: 1949 },
];

const books = [
  { id: 1, title: "Cien Años de Soledad", authorId: 1, year: 1967, genres: ["Realismo Mágico", "Novela"] },
  { id: 2, title: "Orgullo y Prejuicio", authorId: 2, year: 1813, genres: ["Novela Romántica", "Sátira"] },
  { id: 3, title: "Tokio Blues", authorId: 3, year: 1987, genres: ["Novela", "Coming of Age"] },
  { id: 4, title: "El Amor en los Tiempos del Cólera", authorId: 1, year: 1985, genres: ["Novela Romántica"] },
];

function handleGetBooks(_call: any, callback: any) {
  callback(null, { books });
}

function handleGetBookById(call: any, callback: any) {
  const book = books.find((b) => b.id === call.request.id);
  callback(null, { book: book || null });
}

function handleGetAuthorById(call: any, callback: any) {
  const author = authors.find((a) => a.id === call.request.id);
  callback(null, { author: author || null });
}

function handleGetAuthors(_call: any, callback: any) {
  callback(null, { authors });
}

function main() {
  const server = new grpc.Server();
  server.addService(proto.library.LibraryService.service, {
    GetBooks: handleGetBooks,
    GetBookById: handleGetBookById,
    GetAuthorById: handleGetAuthorById,
    GetAuthors: handleGetAuthors,
  });

  const address = "0.0.0.0:50051";
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Error al iniciar el servidor gRPC:", err);
      return;
    }
    console.log(`Servicio gRPC de Biblioteca ejecutándose en localhost:${port}`);
  });
}

main();
