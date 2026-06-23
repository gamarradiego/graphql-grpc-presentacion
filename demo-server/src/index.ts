import express from 'express';
import cors from 'cors';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import gql from 'graphql-tag';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- Shared data ----
const authors = [
  { id: 1, name: 'Gabriel García Márquez', nationality: 'Colombiana', birthYear: 1927 },
  { id: 2, name: 'Jane Austen', nationality: 'Británica', birthYear: 1775 },
  { id: 3, name: 'Haruki Murakami', nationality: 'Japonesa', birthYear: 1949 },
];

let books = [
  { id: 1, title: 'Cien Años de Soledad', authorId: 1, year: 1967, genres: ['Realismo Mágico', 'Novela'] },
  { id: 2, title: 'Orgullo y Prejuicio', authorId: 2, year: 1813, genres: ['Novela Romántica', 'Sátira'] },
  { id: 3, title: 'Tokio Blues', authorId: 3, year: 1987, genres: ['Novela', 'Coming of Age'] },
  { id: 4, title: 'El Amor en los Tiempos del Cólera', authorId: 1, year: 1985, genres: ['Novela Romántica'] },
];

// ============================================================
// 1. gRPC — Calculator Server (port 50052)
// ============================================================
function startCalculatorServer(): Promise<void> {
  const PROTO_PATH = path.join(__dirname, '..', '..', 'grpc-demo', 'proto', 'calculator.proto');
  const def = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
  const proto = grpc.loadPackageDefinition(def) as any;

  const server = new grpc.Server();
  server.addService(proto.Calculator.service, {
    Add:      (call: any, cb: any) => { cb(null, { result: call.request.a + call.request.b }); },
    Subtract: (call: any, cb: any) => { cb(null, { result: call.request.a - call.request.b }); },
    Multiply: (call: any, cb: any) => { cb(null, { result: call.request.a * call.request.b }); },
    Divide:   (call: any, cb: any) => {
      if (call.request.b === 0) return cb({ code: grpc.status.INVALID_ARGUMENT, message: 'Cannot divide by zero' });
      cb(null, { result: call.request.a / call.request.b });
    },
  });

  return new Promise((resolve, reject) => {
    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (err) => {
      if (err) return reject(err);
      server.start();
      console.log('  [gRPC] Calculator server on :50052');
      resolve();
    });
  });
}

// ============================================================
// 2. gRPC — Library Server (port 50051)
// ============================================================
function startLibraryServer(): Promise<void> {
  const PROTO_PATH = path.join(__dirname, '..', '..', 'grpc-demo', 'proto', 'library.proto');
  const def = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
  const proto = grpc.loadPackageDefinition(def) as any;

  const server = new grpc.Server();
  server.addService(proto.library.LibraryService.service, {
    GetBooks(_call: any, cb: any) { cb(null, { books }); },
    GetBookById(call: any, cb: any) { cb(null, { book: books.find(b => b.id === call.request.id) || null }); },
    GetAuthors(_call: any, cb: any) { cb(null, { authors }); },
    GetAuthorById(call: any, cb: any) { cb(null, { author: authors.find(a => a.id === call.request.id) || null }); },
  });

  return new Promise((resolve, reject) => {
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err) => {
      if (err) return reject(err);
      server.start();
      console.log('  [gRPC] Library server on :50051');
      resolve();
    });
  });
}

// ============================================================
// 3. Calculator gRPC Client
// ============================================================
function createCalculatorClient(): Promise<any> {
  const PROTO_PATH = path.join(__dirname, '..', '..', 'grpc-demo', 'proto', 'calculator.proto');
  const def = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
  const proto = grpc.loadPackageDefinition(def) as any;
  const client = new proto.Calculator('localhost:50052', grpc.credentials.createInsecure());
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 5000;
    client.waitForReady(deadline, (err: any) => {
      if (err) return reject(err);
      resolve(client);
    });
  });
}

function promisifyGrpc(client: any, method: string, request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client[method](request, (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

interface GRPCCall {
  method: string;
  request: any;
  response: any;
  durationMs: number;
}

const grpcCalls: GRPCCall[] = [];

function trace<T>(method: string, request: any, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  return fn().then((response) => {
    grpcCalls.push({ method, request, response, durationMs: Date.now() - start });
    return response;
  });
}

// ============================================================
// 4. Library gRPC Client
// ============================================================
function createLibraryClient(): Promise<any> {
  const PROTO_PATH = path.join(__dirname, '..', '..', 'grpc-demo', 'proto', 'library.proto');
  const def = protoLoader.loadSync(PROTO_PATH, { keepCase: false, longs: String, enums: String, defaults: true, oneofs: true });
  const proto = grpc.loadPackageDefinition(def) as any;
  const client = new proto.library.LibraryService('localhost:50051', grpc.credentials.createInsecure());
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 5000;
    client.waitForReady(deadline, (err: any) => {
      if (err) return reject(err);
      resolve(client);
    });
  });
}

// ============================================================
// 5. GraphQL Gateway (port 4000) — calls gRPC Library
// ============================================================
async function startGraphQLGateway(libraryClient: any): Promise<void> {
  const typeDefs = gql`
    type Author { id: ID!, name: String!, nationality: String!, birthYear: Int! }
    type Book { id: ID!, title: String!, author: Author!, year: Int!, genres: [String!]! }
    type Query { books: [Book!]!, book(id: ID!): Book, authors: [Author!]! }
  `;

  const resolvers = {
    Query: {
      books: async () => {
        const { books: bs } = await trace('GetBooks', {}, () => promisifyGrpc(libraryClient, 'GetBooks', {}));
        return bs;
      },
      book: async (_: unknown, args: { id: string }) => {
        const { book } = await trace('GetBookById', { id: Number(args.id) }, () =>
          promisifyGrpc(libraryClient, 'GetBookById', { id: Number(args.id) })
        );
        return book;
      },
      authors: async () => {
        const { authors: as } = await trace('GetAuthors', {}, () => promisifyGrpc(libraryClient, 'GetAuthors', {}));
        return as;
      },
    },
    Book: {
      author: async (parent: any) => {
        const { author } = await trace('GetAuthorById', { id: parent.authorId }, () =>
          promisifyGrpc(libraryClient, 'GetAuthorById', { id: parent.authorId })
        );
        return author;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse(requestContext: any) {
              if (grpcCalls.length > 0) {
                requestContext.response.body.singleResult.extensions = {
                  grpcCalls: [...grpcCalls],
                };
                grpcCalls.length = 0;
              }
            },
          };
        },
      },
    ],
  });
  await server.start();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  return new Promise((resolve) => {
    app.listen(4000, () => {
      console.log('  [GraphQL] Gateway on http://localhost:4000/graphql');
      resolve(undefined);
    });
  });
}

// ============================================================
// 6. Express API for Browser (port 3001)
// ============================================================
function startBrowserAPI(calculatorClient: any, graphqlUrl: string) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Proxy to GraphQL gateway
  app.post('/api/graphql', async (req, res) => {
    try {
      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Calculator operations
  app.post('/api/calculator', async (req, res) => {
    try {
      const { a, b } = req.body;
      const methods = ['Add', 'Subtract', 'Multiply', 'Divide'];
      const results: any[] = [];
      for (const method of methods) {
        const r = await promisifyGrpc(calculatorClient, method, { a, b });
        results.push({ operation: method, a, b, result: r.result });
      }
      res.json({ results });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // All graphql queries (standalone GraphQL server without gRPC backend)
  app.post('/api/graphql/standalone', async (req, res) => {
    try {
      const response = await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return new Promise((resolve) => {
    app.listen(3001, () => {
      console.log('  [API] Browser API on http://localhost:3001');
      resolve(undefined);
    });
  });
}

// ============================================================
// 7. Standalone GraphQL (no gRPC) — for pure GraphQL demo
// ============================================================
async function startStandaloneGraphQL(): Promise<void> {
  let standaloneBooks = [
    { id: '1', title: '1984', author: 'George Orwell', year: 1949, genres: ['Dystopian', 'Political Fiction'] },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genres: ['Southern Gothic', 'Bildungsroman'] },
    { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genres: ['Tragedy', 'Realist Novel'] },
  ];
  let nextId = 4;

  const typeDefs = gql`
    type Book { id: ID!, title: String!, author: String!, year: Int!, genres: [String!]! }
    type Query { books: [Book!]!, book(id: ID!): Book }
    type Mutation { addBook(title: String!, author: String!, year: Int!, genres: [String!]!): Book! }
  `;

  const resolvers = {
    Query: {
      books: () => standaloneBooks,
      book: (_: unknown, args: { id: string }) => standaloneBooks.find(b => b.id === args.id),
    },
    Mutation: {
      addBook: (_: unknown, args: { title: string; author: string; year: number; genres: string[] }) => {
        const book = { id: String(nextId++), title: args.title, author: args.author, year: args.year, genres: args.genres };
        standaloneBooks.push(book);
        return book;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  return new Promise((resolve) => {
    app.listen(4001, () => {
      console.log('  [GraphQL] Standalone on http://localhost:4001/graphql');
      resolve(undefined);
    });
  });
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('\n  Starting demo servers...\n');

  // Start gRPC servers
  await startCalculatorServer();
  await startLibraryServer();

  // Create gRPC clients
  const calculatorClient = await createCalculatorClient();
  const libraryClient = await createLibraryClient();

  // Start GraphQL servers
  await Promise.all([
    startGraphQLGateway(libraryClient),
    startStandaloneGraphQL(),
  ]);

  // Start browser API
  await startBrowserAPI(calculatorClient, 'http://localhost:4000/graphql');

  console.log('\n  ✓ All servers ready!');
  console.log('  ─────────────────────────────────────────');
  console.log('  Browser API    → http://localhost:3001');
  console.log('  GraphQL Gateway → http://localhost:4000/graphql');
  console.log('  GraphQL Pure   → http://localhost:4001/graphql');
  console.log('  gRPC Library   → :50051');
  console.log('  gRPC Calculator → :50052\n');
}

main().catch((err) => {
  console.error('Failed to start demo servers:', err);
  process.exit(1);
});
