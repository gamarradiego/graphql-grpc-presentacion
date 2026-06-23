import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';
import LiveGraphQLDemo from '../components/LiveGraphQLDemo';

export default function DemoGraphQL() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 20px 0">
          Demo: GraphQL — Library API
        </Heading>

        <FlexBox width="100%" justifyContent="space-between" alignItems="stretch">
          <Box width="48%">
            <Text fontSize="0.9rem" color="#06b6d4" fontWeight="700" margin="0 0 6px 0">
              Query Runner en Vivo
            </Text>
            <LiveGraphQLDemo />
          </Box>
          <Box width="48%">
            <Appear>
              <Box
                backgroundColor="#0a1628"
                padding="14px 18px"
                borderRadius="8px"
                marginBottom="12px"
                style={{ borderLeft: '3px solid #06b6d4' }}
              >
                <Text fontSize="0.8rem" color="#c8d6e5" margin="0">
                  El cliente envía una <Text as="span" color="primary" fontWeight="700">query</Text> al servidor Apollo (puerto 4001)
                </Text>
              </Box>
            </Appear>
            <Appear>
              <Box
                backgroundColor="#0a1628"
                padding="14px 18px"
                borderRadius="8px"
                marginBottom="12px"
                style={{ borderLeft: '3px solid #a78bfa' }}
              >
                <Text fontSize="0.8rem" color="#c8d6e5" margin="0">
                  El <Text as="span" color="secondary" fontWeight="700">Schema</Text> define qué campos existen y sus tipos
                </Text>
              </Box>
            </Appear>
            <Appear>
              <Box
                backgroundColor="#0a1a0a"
                padding="14px 18px"
                borderRadius="8px"
                marginBottom="12px"
                style={{ borderLeft: '3px solid #34d399' }}
              >
                <Text fontSize="0.8rem" color="#c8d6e5" margin="0">
                  ✅ Solo devuelve los campos solicitados — sin over-fetching
                </Text>
              </Box>
            </Appear>
            <Appear>
              <CodeSnippet>{`query {
  books {
    title
    author
  }
}`}</CodeSnippet>
            </Appear>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
