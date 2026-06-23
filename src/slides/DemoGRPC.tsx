import { Slide, Heading, Text, CodePane, FlexBox, Box, Appear, codePaneThemes } from 'spectacle';

export default function DemoGRPC() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 20px 0">
          Demo 2: gRPC — Calculator
        </Heading>

        <Appear>
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
            <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #fbbf24' }}>
              <Text fontSize="0.85rem" color="#fbbf24" fontWeight="700" margin="0">Cliente (TS)</Text>
              <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">localhost:50051</Text>
            </Box>
            <Text fontSize="1.2rem" color="#475569" margin="0 8px">⟷</Text>
            <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #34d399' }}>
              <Text fontSize="0.85rem" color="#34d399" fontWeight="700" margin="0">gRPC Server</Text>
              <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">Calculator service</Text>
            </Box>
            <Text fontSize="1.2rem" color="#475569" margin="0 8px">⟷</Text>
            <Box backgroundColor="#0d1117" padding="12px 18px" borderRadius="6px" textAlign="center" style={{ border: '1px solid #a78bfa' }}>
              <Text fontSize="0.85rem" color="#a78bfa" fontWeight="700" margin="0">Proto Contract</Text>
              <Text fontSize="0.7rem" color="#64748b" margin="2px 0 0">calculator.proto</Text>
            </Box>
          </FlexBox>
        </Appear>

        <FlexBox width="100%" justifyContent="space-between">
          <Box width="48%">
            <Appear>
              <Text fontSize="0.9rem" color="#34d399" fontWeight="700" margin="0 0 6px 0">
                Server (server.ts)
              </Text>
            </Appear>
            <Appear>
              <CodePane language="typescript" theme={codePaneThemes.vsDark}>
                {`function add(call, callback) {
  const { a, b } = call.request;
  console.log(\`ADD \${a} + \${b}\`);
  callback(null, { result: a + b });
}

function divide(call, callback) {
  const { a, b } = call.request;
  if (b === 0) {
    callback({
      code: grpc.status
        .INVALID_ARGUMENT,
      message: "Cannot divide by zero",
    });
    return;
  }
  callback(null, { result: a / b });
}`}
              </CodePane>
            </Appear>
          </Box>
          <Box width="48%">
            <Appear>
              <Text fontSize="0.9rem" color="#06b6d4" fontWeight="700" margin="0 0 6px 0">
                Client (client.ts)
              </Text>
            </Appear>
            <Appear>
              <CodePane language="typescript" theme={codePaneThemes.vsDark}>
                {`const client = new Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const ops = [
  { name: "10 + 5", method: "Add",
    a: 10, b: 5 },
  { name: "10 - 5", method: "Subtract",
    a: 10, b: 5 },
  { name: "10 * 5", method: "Multiply",
    a: 10, b: 5 },
  { name: "10 / 5", method: "Divide",
    a: 10, b: 5 },
];`}
              </CodePane>
            </Appear>
            <Appear>
              <Box backgroundColor="#1a1a0a" padding="8px 12px" borderRadius="6px" marginTop="8px" style={{ borderLeft: '3px solid #fbbf24' }}>
                <Text fontSize="0.8rem" color="#fde68a" margin="0">
                  ⚡ Datos viajan en binario sobre HTTP/2
                </Text>
              </Box>
            </Appear>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
