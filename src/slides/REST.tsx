import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';

const problems = [
  {
    title: 'Over-fetching',
    desc: 'Recibes más datos de los que necesitas',
  },
  {
    title: 'Under-fetching',
    desc: 'Múltiples requests para datos relacionados (N+1)',
  },
  {
    title: 'Endpoints rígidos',
    desc: 'Un endpoint por cada vista/combinación de datos',
  },
  {
    title: 'Versionado complejo',
    desc: '/v1, /v2... mantener múltiples versiones en paralelo',
  },
];

export default function REST() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 24px 0">
          REST — Representational State Transfer
        </Heading>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
          — Arquitectura basada en <Text as="span" color="primary" fontWeight="700">recursos</Text> (URIs)
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
          — Verbos HTTP: GET, POST, PUT, DELETE
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0">
          — Stateless: cada request contiene toda la info necesaria
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 24px 0">
          — Cacheable
        </Text>

        <Heading fontSize="1.2rem" color="quinary" margin="0 0 12px 0">
          Problemas comunes
        </Heading>
        <FlexBox width="100%" justifyContent="space-between" flexWrap="wrap">
          {problems.map((p, i) => (
            <Box
              key={i}
              width="23%"
              backgroundColor="#1a0a0a"
              padding="16px 18px"
              borderRadius="8px"
              style={{ borderLeft: '4px solid #f87171' }}
            >
              <Text fontSize="0.95rem" color="#fca5a5" fontWeight="700" margin="0 0 8px 0">
                ❌ {p.title}
              </Text>
              <Text fontSize="0.8rem" color="#fca5a5" margin="0">
                {p.desc}
              </Text>
            </Box>
          ))}
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
