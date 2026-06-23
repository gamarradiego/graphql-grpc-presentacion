import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "..", "proto", "library.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

let clientInstance: any = null;
let readyPromise: Promise<void> | null = null;

function getClient(): any {
  if (!clientInstance) {
    clientInstance = new proto.library.LibraryService(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );

    readyPromise = new Promise((resolve, reject) => {
      const deadline = Date.now() + 10000;
      clientInstance.waitForReady(deadline, (err: any) => {
        if (err) {
          reject(new Error(`gRPC connection failed: ${err.message}`));
        } else {
          resolve();
        }
      });
    });
  }
  return clientInstance;
}

async function waitForReady(): Promise<void> {
  getClient();
  if (readyPromise) {
    await readyPromise;
  }
}

function promisify<T>(method: string, request: object): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      await waitForReady();
      const client = clientInstance;
      client[method](request, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function getBooks() {
  return promisify<{ books: any[] }>("GetBooks", {});
}

export function getBookById(id: number) {
  return promisify<{ book: any | null }>("GetBookById", { id });
}

export function getAuthorById(id: number) {
  return promisify<{ author: any | null }>("GetAuthorById", { id });
}

export function getAuthors() {
  return promisify<{ authors: any[] }>("GetAuthors", {});
}
