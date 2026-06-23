import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

const commTypes = [
  {
    type: 'Unary',
    desc: 'Request + response simple',
    color: '#34d399',
  },
  {
    type: 'Server Streaming',
    desc: 'Request, múltiples responses',
    color: '#06b6d4',
  },
  {
    type: 'Client Streaming',
    desc: 'Múltiples requests, una response',
    color: '#a78bfa',
  },
  {
    type: 'Bidirectional',
    desc: 'Canal bidireccional',
    color: '#fbbf24',
  },
];

export default function GRPCCommunication() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 24px 0">
          gRPC — Tipos de Comunicación
        </Heading>
        <FlexBox width="100%" justifyContent="center" flexWrap="wrap">
          <Box
            backgroundColor="#111827"
            padding="24px"
            borderRadius="12px"
            width="90%"
            style={{ border: '1px solid #1e293b' }}
          >
            <FlexBox justifyContent="space-around" flexWrap="wrap">
              {commTypes.map((item, i) => (
                <Appear key={i}>
                  <Box
                    backgroundColor="#0d1117"
                    padding="16px 20px"
                    borderRadius="8px"
                    width="200px"
                    margin="8px"
                    style={{ border: `1px solid ${item.color}40` }}
                  >
                    <Text
                      fontSize="1rem"
                      color={item.color}
                      fontWeight="700"
                      margin="0 0 8px 0"
                      textTransform="uppercase"
                      letterSpacing="1px"
                    >
                      {item.type}
                    </Text>
                    <Text fontSize="0.85rem" color="#94a3b8" margin="0">
                      {item.desc}
                    </Text>
                  </Box>
                </Appear>
              ))}
            </FlexBox>
            <Appear>
              <Box
                backgroundColor="#1a1a0a"
                padding="16px"
                borderRadius="8px"
                marginTop="16px"
                style={{ borderLeft: '4px solid #fbbf24' }}
              >
                <Text fontSize="0.95rem" color="#fde68a" margin="0">
                  Todos los tipos corren sobre una <Text as="span" fontWeight="700">única conexión HTTP/2</Text> persistente
                </Text>
              </Box>
            </Appear>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
