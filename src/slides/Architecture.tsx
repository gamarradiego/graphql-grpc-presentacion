import { Slide, Heading, Text, Quote, FlexBox, Box, Appear } from 'spectacle';

export default function Architecture() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 32px 0">
          ¿Qué es la Arquitectura de Software?
        </Heading>
        <Appear>
          <Quote
            fontSize="1.15rem"
            color="#c8d6e5"
            fontStyle="italic"
            lineHeight="1.6"
            margin="0 0 36px 0"
            border="none"
            borderLeft="4px solid #a78bfa"
            padding="16px 24px"
          >
            "La arquitectura de software es el conjunto de decisiones de diseño
            fundamentales sobre la estructura de un sistema y las interacciones
            entre sus componentes."
          </Quote>
        </Appear>
        <Appear>
          <Box>
            <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
              — Define <Text as="span" color="primary" fontWeight="700">cómo</Text> los componentes se comunican
            </Text>
          </Box>
        </Appear>
        <Appear>
          <Box>
            <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
              — Determina la <Text as="span" color="tertiary" fontWeight="700">escalabilidad</Text>, mantenibilidad y rendimiento
            </Text>
          </Box>
        </Appear>
        <Appear>
          <Box>
            <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
              — La <Text as="span" color="secondary" fontWeight="700">elección del API</Text> es una decisión arquitectónica crítica
            </Text>
          </Box>
        </Appear>
      </FlexBox>
    </Slide>
  );
}
