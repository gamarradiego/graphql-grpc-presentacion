import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';

export default function ArchitectureBridge() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 32px 0">
          Arquitectura Unificada
        </Heading>

        <FlexBox width="90%" justifyContent="center" alignItems="stretch" gap="24px">
          <Box
            backgroundColor="#0a1628"
            padding="20px 24px"
            borderRadius="8px"
            style={{ border: '1px solid #1e3a5f', borderLeft: '4px solid #06b6d4', flex: 1 }}
          >
            <Text fontSize="1.1rem" color="#06b6d4" fontWeight="700" margin="0 0 12px 0">
              GraphQL para APIs de Cliente
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • Un solo endpoint para el frontend
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • El cliente selecciona los campos que necesita
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • Flexibilidad para múltiples clientes
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0">
              • Schema auto-documentado
            </Text>
          </Box>

          <Box
            backgroundColor="#1a0a0a"
            padding="20px 24px"
            borderRadius="8px"
            style={{ border: '1px solid #5f1e1e', borderLeft: '4px solid #fbbf24', flex: 1 }}
          >
            <Text fontSize="1.1rem" color="#fbbf24" fontWeight="700" margin="0 0 12px 0">
              gRPC para Comunicación Interna
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • Contrato estricto con Protocol Buffers
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • Alto rendimiento (binario, HTTP/2)
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0 0 6px 0">
              • Comunicación directa servicio a servicio
            </Text>
            <Text fontSize="0.9rem" color="#94a3b8" margin="0">
              • Tipado fuerte y generación de código
            </Text>
          </Box>
        </FlexBox>

        <FlexBox
          backgroundColor="#111827"
          padding="14px 24px"
          borderRadius="8px"
          width="80%"
          marginTop="16px"
          justifyContent="center"
          style={{ border: '1px solid #7928ca', borderLeft: '4px solid #a78bfa' }}
        >
          <Text fontSize="1rem" color="#c4b5fd" margin="0" textAlign="center">
            <Text as="span" fontWeight="700">Flujo:</Text>{' '}
            Cliente (React) →{' '}
            <Text as="span" color="#06b6d4" fontWeight="700">GraphQL Gateway</Text>
            {' → '}
            <Text as="span" color="#fbbf24" fontWeight="700">gRPC Service</Text>
          </Text>
        </FlexBox>

        <Box
          backgroundColor="#0a1a0a"
          padding="14px 20px"
          borderRadius="8px"
          width="80%"
          marginTop="12px"
          style={{ border: '1px solid #064e3b' }}
        >
          <Text fontSize="0.9rem" color="#34d399" margin="0" textAlign="center">
            GraphQL orquesta las consultas del frontend y traduce cada petición
            a llamadas gRPC internas
          </Text>
        </Box>
      </FlexBox>
    </Slide>
  );
}
