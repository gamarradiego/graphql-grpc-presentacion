import { Slide, Heading, Text, FlexBox } from 'spectacle';

export default function Title() {
  return (
    <Slide backgroundImage="linear-gradient(160deg, #0c0e1a 0%, #1a1040 50%, #0f2027 100%)">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="4.5rem" letterSpacing="2px" margin="0 0 16px 0">
          <Text
            as="span"
            color="primary"
            fontSize="inherit"
            fontWeight="800"
            fontFamily="header"
            margin="0"
          >
            GraphQL
          </Text>
          <Text
            as="span"
            color="secondary"
            fontSize="inherit"
            fontWeight="800"
            fontFamily="header"
            margin="0"
          >
            {' '}&{' '}
          </Text>
          <Text
            as="span"
            color="tertiary"
            fontSize="inherit"
            fontWeight="800"
            fontFamily="header"
            margin="0"
          >
            gRPC
          </Text>
        </Heading>
        <Text
          fontSize="1.6rem"
          color="#c8d6e5"
          fontWeight="300"
          letterSpacing="4px"
          textTransform="uppercase"
          margin="0 0 48px 0"
        >
          Paradigmas de API
        </Text>
        <Text fontSize="1.3rem" color="#576574" fontWeight="450">
          Análisis y Diseño de Aplicaciones I
        </Text>
        <Text fontSize="0.9rem" color="#858d95" fontWeight="250" margin="15px 0 0 0">
          Universidad Católica del Uruguay
        </Text>
      </FlexBox>
    </Slide>
  );
}
