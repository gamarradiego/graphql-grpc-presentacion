import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

// --- Almacenamiento de datos en memoria ---
interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genres: string[];
}

let books: Book[] = [
  { id: "1", title: "1984", author: "George Orwell", year: 1949, genres: ["Dystopian", "Political Fiction"] },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genres: ["Southern Gothic", "Bildungsroman"] },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genres: ["Tragedy", "Realist Novel"] },
];

let nextId = 4;

// --- Schema GraphQL ---
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int!
    genres: [String!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, year: Int!, genres: [String!]!): Book!
  }
`;

// --- Resolvers ---
const resolvers = {
  Query: {
    books: (): Book[] => books,
    book: (_: unknown, args: { id: string }): Book | undefined =>
      books.find((b) => b.id === args.id),
  },
  Mutation: {
    addBook: (_: unknown, args: { title: string; author: string; year: number; genres: string[] }): Book => {
      const book: Book = {
        id: String(nextId++),
        title: args.title,
        author: args.author,
        year: args.year,
        genres: args.genres,
      };
      books.push(book);
      return book;
    },
  },
};

// --- Servidor ---
async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`Servidor GraphQL listo en ${url}`);
  console.log(`Abre Apollo Sandbox en ${url} o envía peticiones POST con curl`);
}

main().catch(console.error);
