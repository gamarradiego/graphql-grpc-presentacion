import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';

export default function GRPCConcepts() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 24px 0">
          gRPC — Conceptos Clave
        </Heading>
        <FlexBox width="100%" justifyContent="space-between" alignItems="flex-start">
          <Box width="48%">
            <Appear>
              <Text fontSize="1rem" color="secondary" fontWeight="700" margin="0 0 8px 0">Protocol Buffers (.proto)</Text>
            </Appear>
            <CodeSnippet>{`syntax = "proto3";

service Calculator {
  rpc Add(CalcRequest)
    returns (CalcResponse);
  rpc Subtract(CalcRequest)
    returns (CalcResponse);
  rpc Multiply(CalcRequest)
    returns (CalcResponse);
  rpc Divide(CalcRequest)
    returns (CalcResponse);
}

message CalcRequest {
  double a = 1;
  double b = 2;
}

message CalcResponse {
  double result = 1;
}`}</CodeSnippet>
          </Box>
          <Box width="48%">
            <Appear>
              <Text fontSize="1rem" color="tertiary" fontWeight="700" margin="0 0 8px 0">Llamada RPC (TS)</Text>
            </Appear>
            <Appear>
              <CodeSnippet>{`import * as grpc from "@grpc/grpc-js";

const client = new Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Se siente como una función local
client.Add(
  { a: 10, b: 5 },
  (err, res) => {
    console.log(res.result); // 15
  }
);`}</CodeSnippet>
            </Appear>
            <Appear>
              <Box backgroundColor="#1a1a0a" padding="12px 16px" borderRadius="6px" marginTop="12px" style={{ borderLeft: '3px solid #fbbf24' }}>
                <Text fontSize="0.9rem" color="#fde68a" margin="0">
                  ⚡ Datos transmitidos en <Text as="span" fontWeight="700">formato binario</Text> (no JSON)
                </Text>
              </Box>
            </Appear>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
