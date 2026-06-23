import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';

export default function UseCases() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 36px 0">
          ¿Cuándo usar cada uno?
        </Heading>
        <FlexBox width="100%" justifyContent="space-between" alignItems="stretch" style={{ gap: '24px' }}>
          <Box
            backgroundColor="#0a1628"
            padding="28px"
            borderRadius="12px"
            style={{ border: '1px solid #1e3a5f', flex: 1, minWidth: 0 }}
          >
            <Text fontSize="1.2rem" color="#06b6d4" fontWeight="700" margin="0 0 16px 0">
              GraphQL es mejor para...
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0 0 10px 0">
              🌐 APIs públicas con múltiples clientes (web, mobile, third-party)
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0 0 10px 0">
              🖥️ Aplicaciones con UI compleja y datos anidados
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0">
              🎯 Cuando el cliente necesita flexibilidad en los datos
            </Text>
          </Box>
          <Box
            backgroundColor="#1a0a0a"
            padding="28px"
            borderRadius="12px"
            style={{ border: '1px solid #5f1e1e', flex: 1, minWidth: 0 }}
          >
            <Text fontSize="1.2rem" color="#fbbf24" fontWeight="700" margin="0 0 16px 0">
              gRPC es mejor para...
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0 0 10px 0">
              🔗 Comunicación interna entre microservicios
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0 0 10px 0">
              ⚡ Sistemas de alto rendimiento y baja latencia
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0 0 10px 0">
              📡 Streaming de datos en tiempo real
            </Text>
            <Text fontSize="1rem" color="#94a3b8" margin="0">
              📋 Cuando el contrato debe ser estricto
            </Text>
          </Box>
        </FlexBox>
        <Box
          backgroundColor="#0d1117"
          padding="16px 24px"
          borderRadius="8px"
          marginTop="28px"
          style={{ border: '1px solid #7928ca' }}
        >
          <Text fontSize="1rem" color="#a78bfa" margin="0" fontWeight="600">
            💡 No son mutuamente excluyentes — muchas empresas usan ambos
          </Text>
        </Box>
      </FlexBox>
    </Slide>
  );
}
