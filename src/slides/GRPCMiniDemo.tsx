import { useState } from 'react';
import { Slide, Heading, Text, FlexBox, Box } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';

const REQUEST = `const client = new Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.Add({ a: 10, b: 5 }, (err, res) => {
  console.log(res.result);
});`;

const RESPONSE = `15`;

const OPERATION = {
  name: 'Add',
  a: 10,
  b: 5,
  result: 15,
};

export default function GRPCMiniDemo() {
  const [runDemo, setRunDemo] = useState(false);

  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2rem" color="#fbbf24" margin="0 0 12px 0">
          Mini demo 2: gRPC
        </Heading>
        <Text fontSize="0.95rem" color="#94a3b8" margin="0 0 18px 0">
          Acá el cliente llama a un método del stub generado y el servidor ejecuta la operación tipo función local.
        </Text>

        <FlexBox width="100%" justifyContent="space-between" alignItems="stretch" gap="16px">
          <Box width="40%">
            <Text fontSize="0.9rem" color="#fbbf24" fontWeight="700" margin="0 0 8px 0">
              Paso 1: request del cliente
            </Text>
            <CodeSnippet>{REQUEST}</CodeSnippet>
            <Text fontSize="0.8rem" color="#94a3b8" margin="10px 0 0">
              El cliente usa el contrato del .proto para invocar Add sin pensar en HTTP o JSON.
            </Text>
          </Box>

          <Box width="56%">
            <FlexBox justifyContent="space-between" alignItems="center" marginBottom="10px">
              <Text fontSize="0.9rem" color="#34d399" fontWeight="700" margin="0">
                Paso 2 y 3: servidor y respuesta
              </Text>
              <button
                type="button"
                onClick={() => setRunDemo(true)}
                style={{
                  backgroundColor: '#fbbf24',
                  color: '#0b0d1a',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                }}
              >
                Llamar Add
              </button>
            </FlexBox>

            <Box backgroundColor="#0d1117" padding="10px 12px" borderRadius="8px" marginBottom="10px" style={{ border: '1px solid #1f2937' }}>
              <Text fontSize="0.75rem" color={runDemo ? '#fbbf24' : '#64748b'} margin="0">
                {runDemo ? 'RPC ejecutada: el servicio devolvió el resultado de Add.' : 'Esperando la llamada RPC.'}
              </Text>
            </Box>

            {runDemo ? (
              <FlexBox flexDirection="column" gap="8px">
                <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                  <Text fontSize="0.82rem" color="#fbbf24" fontWeight="800" margin="0 0 8px 0">
                    Resultado
                  </Text>
                  <Text fontSize="1.3rem" color="#e5e7eb" fontWeight="800" margin="0 0 6px 0">
                    {OPERATION.name}({OPERATION.a}, {OPERATION.b}) = {OPERATION.result}
                  </Text>
                  <Text fontSize="0.78rem" color="#94a3b8" margin="0">
                    El servidor respondió con el valor esperado sin que el cliente conozca detalles internos.
                  </Text>
                </Box>

                <Box backgroundColor="#0d1117" padding="12px 14px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                  <Text fontSize="0.82rem" color="#fbbf24" fontWeight="800" margin="0 0 6px 0">
                    Salida de la llamada
                  </Text>
                  <CodeSnippet>{RESPONSE}</CodeSnippet>
                </Box>

                <Box backgroundColor="#0d1117" padding="12px 14px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                  <Text fontSize="0.82rem" color="#34d399" fontWeight="800" margin="0 0 4px 0">
                    Por qué sirve
                  </Text>
                  <Text fontSize="0.75rem" color="#cbd5e1" margin="0">
                    gRPC permite invocar operaciones tipadas como si fueran funciones locales, con binario sobre HTTP/2 para máximo rendimiento.
                  </Text>
                </Box>
              </FlexBox>
            ) : (
              <>
                <FlexBox width="100%" justifyContent="space-between" gap="10px" marginBottom="10px">
                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #34d399' }}>
                    <Text fontSize="0.82rem" color="#34d399" fontWeight="800" margin="0 0 6px 0">
                      2. Server Add
                    </Text>
                    <Text fontSize="0.72rem" color="#94a3b8" margin="0">
                      El servicio recibe a y b, ejecuta la suma y responde por RPC.
                    </Text>
                  </Box>
                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #fbbf24' }}>
                    <Text fontSize="0.82rem" color="#fbbf24" fontWeight="800" margin="0 0 6px 0">
                      3. Resultado binario
                    </Text>
                    <Text fontSize="0.72rem" color="#94a3b8" margin="0">
                      La respuesta viaja en HTTP/2 como protobuf, no como JSON.
                    </Text>
                  </Box>
                </FlexBox>

                <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                  <Text fontSize="0.82rem" color="#64748b" margin="0">
                    Pulsá el botón para ejecutar la llamada RPC y ver el resultado del servicio.
                  </Text>
                </Box>
              </>
            )}
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}
