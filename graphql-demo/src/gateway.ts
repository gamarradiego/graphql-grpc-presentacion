import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import * as grpcClient from "../../grpc-demo/src/library-client";

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

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    nationality: String!
    birthYear: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    year: Int!
    genres: [String!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    books: async () => {
      const { books } = await trace("GetBooks", {}, () => grpcClient.getBooks());
      return books;
    },
    book: async (_: unknown, args: { id: string }) => {
      const { book } = await trace("GetBookById", { id: Number(args.id) }, () =>
        grpcClient.getBookById(Number(args.id))
      );
      return book;
    },
    authors: async () => {
      const { authors } = await trace("GetAuthors", {}, () => grpcClient.getAuthors());
      return authors;
    },
  },
  Book: {
    author: async (parent: any) => {
      const { author } = await trace("GetAuthorById", { id: parent.authorId }, () =>
        grpcClient.getAuthorById(parent.authorId)
      );
      return author;
    },
  },
};

async function main() {
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

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`Gateway GraphQL ejecutándose en ${url}`);
  console.log(`El gateway consulta el servicio gRPC en localhost:50051`);
}

main().catch(console.error);
