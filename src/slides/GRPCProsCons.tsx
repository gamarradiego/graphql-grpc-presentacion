import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

const pros = [
  'Alto rendimiento (binario, HTTP/2)',
  'Streaming nativo (ideal para real-time)',
  'Contrato estricto (type safety)',
  'Generación de código automática',
  'Ideal para microservicios',
];

const cons = [
  'No es human-readable (necesitas grpcurl o herramientas)',
  'Los navegadores no tienen soporte nativo (necesitas gRPC-Web)',
  'Curva de aprendizaje (Protocol Buffers, HTTP/2)',
  'Menos flexible para consultas complejas',
];

export default function GRPCProsCons() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 36px 0">
          gRPC — Ventajas y Desventajas
        </Heading>
        <FlexBox width="100%" justifyContent="space-between">
          <Box width="47%" backgroundColor="#0a1a0a" padding="24px" borderRadius="8px" style={{ border: '1px solid #064e3b' }}>
            <Appear>
              <Text fontSize="1.1rem" color="quaternary" fontWeight="700" margin="0 0 16px 0">
                ✅ Ventajas
              </Text>
            </Appear>
            {pros.map((item, i) => (
              <Appear key={i}>
                <Text fontSize="0.95rem" color="#c8d6e5" margin="0 0 10px 0">
                  {item}
                </Text>
              </Appear>
            ))}
          </Box>
          <Box width="47%" backgroundColor="#1a0a0a" padding="24px" borderRadius="8px" style={{ border: '1px solid #7f1d1d' }}>
            <Appear>
              <Text fontSize="1.1rem" color="quinary" fontWeight="700" margin="0 0 16px 0">
                ❌ Desventajas
              </Text>
            </Appear>
            {cons.map((item, i) => (
              <Appear key={i}>
                <Text fontSize="0.95rem" color="#c8d6e5" margin="0 0 10px 0">
                  {item}
                </Text>
              </Appear>
            ))}
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
