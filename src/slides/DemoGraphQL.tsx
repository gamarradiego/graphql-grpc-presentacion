import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';

export default function DemoGraphQL() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 20px 0">
          Demo 1: GraphQL — Library API
        </Heading>

        <FlexBox
          width="100%"
          backgroundColor="#111827"
          padding="16px 20px"
          borderRadius="8px"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="20px"
          style={{ border: '1px solid #1e293b' }}
        >
          <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #06b6d4' }}>
            <Text fontSize="0.85rem" color="#06b6d4" fontWeight="700" margin="0">Cliente</Text>
            <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">curl / Sandbox</Text>
          </Box>
          <Text fontSize="1.2rem" color="#475569" margin="0 8px">⟷</Text>
          <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #a78bfa' }}>
            <Text fontSize="0.85rem" color="#a78bfa" fontWeight="700" margin="0">Apollo Server</Text>
            <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">Schema + Resolvers</Text>
          </Box>
          <Text fontSize="1.2rem" color="#475569" margin="0 8px">⟷</Text>
          <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #34d399' }}>
            <Text fontSize="0.85rem" color="#34d399" fontWeight="700" margin="0">In-Memory</Text>
            <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">Data Store</Text>
          </Box>
        </FlexBox>

        <FlexBox width="100%" justifyContent="space-between">
          <Box width="48%">
            <Text fontSize="0.9rem" color="#06b6d4" fontWeight="700" margin="0 0 6px 0">
              Query: seleccionar campos
            </Text>
            <CodeSnippet>{`query {
  books {
    title
    author
  }
}`}</CodeSnippet>
            <Box backgroundColor="#0a1a0a" padding="8px 12px" borderRadius="6px" marginTop="8px" style={{ borderLeft: '3px solid #34d399' }}>
              <Text fontSize="0.8rem" color="#34d399" margin="0">
                ✅ Solo title + author — sin overfetching
              </Text>
            </Box>
            <Text fontSize="0.9rem" color="#a78bfa" fontWeight="700" margin="16px 0 6px 0">
              Query: libro por ID
            </Text>
            <CodeSnippet>{`query {
  book(id: "2") {
    id
    title
    year
    genres
  }
}`}</CodeSnippet>
          </Box>
          <Box width="48%">
            <Text fontSize="0.9rem" color="#fbbf24" fontWeight="700" margin="0 0 6px 0">
              Mutation: agregar libro
            </Text>
            <CodeSnippet>{`mutation {
  addBook(
    title: "Dune"
    author: "Frank Herbert"
    year: 1965
    genres: [
      "Science Fiction"
      "Adventure"
    ]
  ) {
    id
    title
    author
  }
}`}</CodeSnippet>
            <Box backgroundColor="#0a0a1a" padding="8px 12px" borderRadius="6px" marginTop="8px" style={{ borderLeft: '3px solid #a78bfa' }}>
              <Text fontSize="0.8rem" color="#a78bfa" margin="0">
                🔄 El cliente define qué datos devolver tras la mutación
              </Text>
            </Box>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
