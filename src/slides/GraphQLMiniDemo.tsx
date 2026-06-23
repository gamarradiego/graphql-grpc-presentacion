import { useState } from 'react';
import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';
import CodeSnippet from '../components/CodeSnippet';

const QUERY = `query {
  books {
    title
    author
    year
  }
}`;

const RESPONSE = `{
  "data": {
    "books": [
      { "title": "1984", "author": "George Orwell", "year": 1949 },
      { "title": "Dune", "author": "Frank Herbert", "year": 1965 }
    ]
  }
}`;

const BOOKS = [
  { title: '1984', author: 'George Orwell', year: 1949 },
  { title: 'Dune', author: 'Frank Herbert', year: 1965 },
];

function MiniStep({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <Box
      backgroundColor="#0d1117"
      padding="14px 16px"
      borderRadius="10px"
      style={{ border: `1px solid ${color}` }}
    >
      <Text fontSize="0.82rem" color={color} fontWeight="800" margin="0 0 6px 0">
        {title}
      </Text>
      <Text fontSize="0.72rem" color="#94a3b8" margin="0">
        {body}
      </Text>
    </Box>
  );
}

export default function GraphQLMiniDemo() {
  const [runDemo, setRunDemo] = useState(false);

  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2rem" color="#06b6d4" margin="0 0 12px 0">
          Mini demo 1: GraphQL
        </Heading>
        <Text fontSize="0.95rem" color="#94a3b8" margin="0 0 18px 0">
          Acá el cliente pide solo los campos que necesita y GraphQL arma una sola respuesta.
        </Text>

        <FlexBox width="100%" justifyContent="space-between" alignItems="stretch" gap="16px">
          <Box width="40%">
            <Text fontSize="0.9rem" color="#06b6d4" fontWeight="700" margin="0 0 8px 0">
              Paso 1: la query del cliente
            </Text>
            <CodeSnippet>{QUERY}</CodeSnippet>
            <Text fontSize="0.8rem" color="#94a3b8" margin="10px 0 0">
              El frontend envía una única petición al endpoint /graphql con exactamente los campos que quiere.
            </Text>
          </Box>

          <Box width="56%">
            <FlexBox justifyContent="space-between" alignItems="center" marginBottom="10px">
              <Text fontSize="0.9rem" color="#a78bfa" fontWeight="700" margin="0">
                Paso 2 y 3: resolver y respuesta
              </Text>
              <button
                type="button"
                onClick={() => setRunDemo(true)}
                style={{
                  backgroundColor: '#06b6d4',
                  color: '#0b0d1a',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                }}
              >
                Ejecutar consulta
              </button>
            </FlexBox>

            <Box backgroundColor="#0d1117" padding="10px 12px" borderRadius="8px" marginBottom="10px" style={{ border: '1px solid #1f2937' }}>
              <Text fontSize="0.75rem" color={runDemo ? '#34d399' : '#64748b'} margin="0">
                {runDemo ? 'Consulta ejecutada: se construyó la respuesta GraphQL.' : 'Esperando que ejecutes la consulta.'}
              </Text>
            </Box>

            <FlexBox width="100%" justifyContent="space-between" gap="10px" marginBottom="10px">
              <MiniStep
                title="2. Resolver books"
                body="El gateway valida el schema y llama al resolver que arma los libros desde memoria."
                color="#a78bfa"
              />
              <MiniStep
                title="3. Respuesta final"
                body="GraphQL devuelve JSON con solo title, author y year."
                color="#34d399"
              />
            </FlexBox>

            {runDemo ? (
              <Appear>
                <FlexBox flexDirection="column" gap="10px">
                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                    <Text fontSize="0.82rem" color="#06b6d4" fontWeight="800" margin="0 0 8px 0">
                      Resultado visible
                    </Text>
                    <Text fontSize="1.5rem" color="#e5e7eb" fontWeight="800" margin="0 0 6px 0">
                      {BOOKS.length} libros devueltos
                    </Text>
                    <FlexBox width="100%" justifyContent="space-between" gap="10px" flexWrap="wrap">
                      {BOOKS.map((book) => (
                        <Box key={book.title} width="48%" backgroundColor="#111827" padding="12px 14px" borderRadius="8px" style={{ border: '1px solid #1f2937' }}>
                          <Text fontSize="0.85rem" color="#e5e7eb" fontWeight="700" margin="0 0 4px 0">
                            {book.title}
                          </Text>
                          <Text fontSize="0.72rem" color="#94a3b8" margin="0">
                            {book.author} · {book.year}
                          </Text>
                        </Box>
                      ))}
                    </FlexBox>
                  </Box>

                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                    <Text fontSize="0.82rem" color="#34d399" fontWeight="800" margin="0 0 6px 0">
                      Qué demuestra
                    </Text>
                    <Text fontSize="0.8rem" color="#cbd5e1" margin="0">
                      GraphQL devuelve un JSON único con solo los campos pedidos por el cliente.
                    </Text>
                  </Box>

                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                    <Text fontSize="0.82rem" color="#a78bfa" fontWeight="800" margin="0 0 6px 0">
                      Por qué sirve
                    </Text>
                    <Text fontSize="0.8rem" color="#cbd5e1" margin="0">
                      Evita sobrecargar la red con datos innecesarios y simplifica el frontend cuando hay muchos consumidores.
                    </Text>
                  </Box>

                  <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                    <Text fontSize="0.82rem" color="#06b6d4" fontWeight="800" margin="0 0 8px 0">
                      JSON devuelto por el gateway
                    </Text>
                    <CodeSnippet>{RESPONSE}</CodeSnippet>
                  </Box>
                </FlexBox>
              </Appear>
            ) : (
              <Box backgroundColor="#0d1117" padding="14px 16px" borderRadius="10px" style={{ border: '1px solid #1f2937' }}>
                <Text fontSize="0.82rem" color="#64748b" margin="0">
                  Pulsá el botón para ver la respuesta y cómo GraphQL reduce el overfetching.
                </Text>
              </Box>
            )}
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
}