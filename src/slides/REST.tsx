import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

export default function REST() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 28px 0">
          REST — Representational State Transfer
        </Heading>
        <Appear>
          <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
            — Arquitectura basada en <Text as="span" color="primary" fontWeight="700">recursos</Text> (URIs)
          </Text>
        </Appear>
        <Appear>
          <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
            — Verbos HTTP: GET, POST, PUT, DELETE
          </Text>
        </Appear>
        <Appear>
          <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
            — Stateless: cada request contiene toda la info necesaria
          </Text>
        </Appear>
        <Appear>
          <Text fontSize="1.1rem" color="#8395a7" margin="0 0 28px 0">
            — Cacheable
          </Text>
        </Appear>

        <Appear>
          <Box backgroundColor="#1a0a0a" padding="20px 28px" borderRadius="8px" width="100%" style={{ borderLeft: '4px solid #f87171' }}>
            <Heading fontSize="1.3rem" color="quinary" margin="0 0 12px 0">
              Problemas comunes
            </Heading>
            <Text fontSize="1rem" color="#fca5a5" margin="0 0 6px 0">
              ❌ <Text as="span" fontWeight="700">Over-fetching</Text>: recibes más datos de los que necesitas
            </Text>
            <Text fontSize="1rem" color="#fca5a5" margin="0 0 6px 0">
              ❌ <Text as="span" fontWeight="700">Under-fetching</Text>: múltiples requests para datos relacionados (N+1)
            </Text>
            <Text fontSize="1rem" color="#fca5a5" margin="0">
              ❌ Múltiples endpoints para diferentes vistas de los mismos datos
            </Text>
          </Box>
        </Appear>
      </FlexBox>
    </Slide>
  );
}
