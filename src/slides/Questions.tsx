import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';

const links = [
  { label: 'GraphQL', url: 'https://graphql.org' },
  { label: 'gRPC', url: 'https://grpc.io' },
  { label: 'Apollo Server', url: 'https://www.apollographql.com/docs/apollo-server/' },
  { label: 'Spectacle', url: 'https://formidable.com/open-source/spectacle/' },
];

export default function Questions() {
  return (
    <Slide backgroundImage="linear-gradient(160deg, #0c0e1a 0%, #1a1040 50%, #0f2027 100%)">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="3.5rem" color="primary" margin="0 0 12px 0">
          ¿Preguntas?
        </Heading>
        <Text fontSize="1.3rem" color="#94a3b8" fontWeight="300" margin="0 0 48px 0">
          GRACIAS
        </Text>
        <Box
          backgroundColor="#111827"
          padding="24px 32px"
          borderRadius="12px"
          style={{ border: '1px solid #1e293b' }}
        >
          <Text fontSize="1rem" color="#64748b" fontWeight="600" margin="0 0 16px 0" textTransform="uppercase" letterSpacing="2px">
            Recursos
          </Text>
          {links.map((link, i) => (
            <Text key={i} fontSize="1rem" color="#c8d6e5" margin="0 0 8px 0" fontFamily="monospace">
              {link.label.padEnd(16)} {link.url}
            </Text>
          ))}
        </Box>
      </FlexBox>
    </Slide>
  );
}
