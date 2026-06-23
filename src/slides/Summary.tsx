import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

export default function Summary() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 36px 0">
          Resumen
        </Heading>
        <Appear>
          <FlexBox width="80%" backgroundColor="#0a1a0a" padding="20px 24px" borderRadius="8px" marginBottom="16px" style={{ border: '1px solid #064e3b', borderLeft: '4px solid #34d399' }}>
            <Text fontSize="1.1rem" color="#c8d6e5" margin="0">
              <Text as="span" color="#06b6d4" fontWeight="700">GraphQL</Text>:{' '}
              flexibilidad para el cliente, ideal para APIs públicas y diversas
            </Text>
          </FlexBox>
        </Appear>
        <Appear>
          <FlexBox width="80%" backgroundColor="#1a0a0a" padding="20px 24px" borderRadius="8px" marginBottom="16px" style={{ border: '1px solid #7f1d1d', borderLeft: '4px solid #f87171' }}>
            <Text fontSize="1.1rem" color="#c8d6e5" margin="0">
              <Text as="span" color="#fbbf24" fontWeight="700">gRPC</Text>:{' '}
              rendimiento y contrato estricto, ideal para microservicios
            </Text>
          </FlexBox>
        </Appear>
        <Appear>
          <Box
            backgroundColor="#0d1117"
            padding="20px 24px"
            borderRadius="8px"
            width="80%"
            style={{ border: '1px solid #7928ca', borderLeft: '4px solid #a78bfa' }}
          >
            <Text fontSize="1.1rem" color="#c4b5fd" margin="0" fontWeight="600">
              💡 No son mutuamente excluyentes
            </Text>
            <Text fontSize="0.95rem" color="#94a3b8" margin="8px 0 0 0">
              Muchas empresas usan gRPC para comunicación interna y GraphQL como
              BFF (Backend For Frontend) o API gateway
            </Text>
          </Box>
        </Appear>
      </FlexBox>
    </Slide>
  );
}
