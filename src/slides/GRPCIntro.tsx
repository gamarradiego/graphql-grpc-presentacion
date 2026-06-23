import { Slide, Heading, Text, Quote, FlexBox } from 'spectacle';

export default function GRPCIntro() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="tertiary" margin="0 0 28px 0">
          gRPC — Definición
        </Heading>
        <Quote
          fontSize="1.15rem"
          color="#c8d6e5"
          fontStyle="italic"
          lineHeight="1.6"
          margin="0 0 36px 0"
          border="none"
          borderLeft="4px solid #fbbf24"
          padding="16px 24px"
        >
          "gRPC es un framework de RPC (Remote Procedure Call) de alto
          rendimiento, desarrollado por Google."
        </Quote>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
          🔹 Usa <Text as="span" color="tertiary" fontWeight="700">Protocol Buffers</Text> como lenguaje de definición de interfaces (IDL)
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
          🔹 Corre sobre <Text as="span" color="tertiary" fontWeight="700">HTTP/2</Text>
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
          🔹 Generación de código automática en múltiples lenguajes
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 12px 0" padding="0 24px">
          🔹 Soporta <Text as="span" color="tertiary" fontWeight="700">streaming bidireccional</Text>
        </Text>
      </FlexBox>
    </Slide>
  );
}
