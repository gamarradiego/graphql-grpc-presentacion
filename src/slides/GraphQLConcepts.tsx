import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';

export default function GraphQLConcepts() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 24px 0">
          GraphQL — Conceptos Clave
        </Heading>
        <FlexBox width="100%" justifyContent="space-between" alignItems="flex-start" style={{ gap: '24px' }}>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text fontSize="1rem" color="secondary" fontWeight="700" margin="0 0 8px 0">Schema</Text>
            <CodeSnippet>{`type Book {
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
  addBook(
    title: String!
    author: String!
    year: Int!
    genres: [String!]!
  ): Book!
}`}</CodeSnippet>
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text fontSize="1rem" color="tertiary" fontWeight="700" margin="0 0 8px 0">Consulta</Text>
            <CodeSnippet>{`query {
  books {
    title
    author
  }
}`}</CodeSnippet>
            <Box backgroundColor="#0a1a0a" padding="12px 16px" borderRadius="6px" marginTop="12px" style={{ borderLeft: '3px solid #34d399' }}>
              <Text fontSize="0.9rem" color="#34d399" margin="0">
                ✅ Solo devuelve <Text fontFamily="monospace" fontSize="0.85rem">title</Text> y{' '}
                <Text fontFamily="monospace" fontSize="0.85rem">author</Text> —{' '}
                <Text as="span" fontWeight="700">sin over-fetching</Text>
              </Text>
            </Box>
            <Box backgroundColor="#1a0a1a" padding="12px 16px" borderRadius="6px" marginTop="12px" style={{ borderLeft: '3px solid #a78bfa' }}>
              <Text fontSize="0.9rem" color="#c4b5fd" margin="0">
                🔄 Las <Text as="span" fontWeight="700">mutaciones</Text> modifican datos en el servidor
              </Text>
            </Box>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
