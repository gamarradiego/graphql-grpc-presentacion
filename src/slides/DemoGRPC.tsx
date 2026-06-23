import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';
import LiveGRPCDemo from '../components/LiveGRPCDemo';

export default function DemoGRPC() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 20px 0">
          Demo: gRPC — Calculator
        </Heading>

        <FlexBox width="100%" justifyContent="space-between" alignItems="stretch">
          <Box width="48%">
            <Text fontSize="0.9rem" color="#34d399" fontWeight="700" margin="0 0 6px 0">
              Calculadora en Vivo
            </Text>
            <LiveGRPCDemo />
          </Box>
          <Box width="48%">
            <Appear>
              <Box
                backgroundColor="#1a1a0a"
                padding="14px 18px"
                borderRadius="8px"
                marginBottom="12px"
                style={{ borderLeft: '3px solid #fbbf24' }}
              >
                <Text fontSize="0.8rem" color="#c8d6e5" margin="0">
                  El browser llama al <Text as="span" color="tertiary" fontWeight="700">API HTTP</Text> que internamente crea un cliente gRPC
                </Text>
              </Box>
            </Appear>
            <Appear>
              <Box
                backgroundColor="#1a1a0a"
                padding="14px 18px"
                borderRadius="8px"
                marginBottom="12px"
                style={{ borderLeft: '3px solid #34d399' }}
              >
                <Text fontSize="0.8rem" color="#c8d6e5" margin="0">
                  El cliente gRPC envía la petición en <Text as="span" color="quaternary" fontWeight="700">formato binario</Text> sobre HTTP/2
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
                  El <Text as="span" color="secondary" fontWeight="700">contrato .proto</Text> define los métodos y tipos
                </Text>
              </Box>
            </Appear>
            <Appear>
              <CodeSnippet>{`rpc Add(CalcRequest) returns (CalcResponse);
message CalcRequest {
  double a = 1;
  double b = 2;
}
message CalcResponse {
  double result = 1;
}`}</CodeSnippet>
            </Appear>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
