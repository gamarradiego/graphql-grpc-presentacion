import { Slide, Heading, Text, Quote, FlexBox } from 'spectacle';

export default function GraphQLIntro() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 28px 0">
          GraphQL — Definición
        </Heading>
        <Quote
          fontSize="1.15rem"
          color="#c8d6e5"
          fontStyle="italic"
          lineHeight="1.6"
          margin="0 0 36px 0"
          border="none"
          borderLeft="4px solid #06b6d4"
          padding="16px 24px"
        >
          "GraphQL es un lenguaje de consulta para APIs y un runtime para
          ejecutar esas consultas."
        </Quote>
        <Text fontSize="1rem" color="#576574" margin="0 0 28px 0" padding="0 24px">
          Creado por <Text as="span" color="secondary" fontWeight="700">Meta (Facebook)</Text> en 2012, open source en 2015
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0" padding="0 24px">
          🔹 El <Text as="span" color="primary" fontWeight="700">cliente</Text> describe exactamente los datos que necesita
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0" padding="0 24px">
          🔹 Un <Text as="span" color="primary" fontWeight="700">único endpoint</Text> (<Text fontFamily="monospace" fontSize="1rem">/graphql</Text>)
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0" padding="0 24px">
          🔹 Tipado fuerte con un <Text as="span" color="primary" fontWeight="700">Schema</Text> auto-documentado
        </Text>
        <Text fontSize="1.1rem" color="#8395a7" margin="0 0 8px 0" padding="0 24px">
          🔹 Consultas, Mutaciones y Subscripciones
        </Text>
      </FlexBox>
    </Slide>
  );
}
