import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

const pros = [
  'Cliente controla la respuesta (no over/under-fetching)',
  'Un solo endpoint',
  'Schema fuertemente tipado (self-documenting)',
  'Excelente para UI con datos anidados',
];

const cons = [
  'Complejidad en el resolver (N+1 problem)',
  'Caching complejo (aunque posible con Persisted Queries)',
  'Query cost: una consulta puede ser costosa sin límites claros',
  'Overhead de parsing y validación',
];

export default function GraphQLProsCons() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 36px 0">
          GraphQL — Ventajas y Desventajas
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
