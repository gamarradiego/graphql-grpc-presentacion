import { useState, useCallback } from 'react';
import { Slide, Heading, Text, FlexBox, Box, Appear } from 'spectacle';

const GATEWAY_URL = 'http://localhost:4000/graphql';

const QUERIES = {
  'books': {
    label: 'Obtener todos los libros',
    query: `query {\n  books {\n    id\n    title\n    year\n    genres\n  }\n}`,
  },
  'books-author': {
    label: 'Libros con autor',
    query: `query {\n  books {\n    title\n    author {\n      name\n      nationality\n    }\n  }\n}`,
  },
  'authors': {
    label: 'Obtener autores',
    query: `query {\n  authors {\n    id\n    name\n    nationality\n    birthYear\n  }\n}`,
  },
};

type StepStatus = 'pending' | 'active' | 'done' | 'error';

interface GRPCCall {
  method: string;
  request: any;
  response: any;
  durationMs: number;
}

const GATEWAY_CALLS: Record<string, { query: string; resolver: string }> = {
  GetBooks: { query: 'books { ... }', resolver: 'Query.books' },
  GetBookById: { query: 'book(id: ...)', resolver: 'Query.book' },
  GetAuthors: { query: 'authors { ... }', resolver: 'Query.authors' },
  GetAuthorById: { query: 'book.author { ... }', resolver: 'Book.author' },
};

function StepBox({ label, sublabel, status, color }: {
  label: string;
  sublabel: string;
  status: StepStatus;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    pending: '#0d1117',
    active: '#1a1a2e',
    done: '#0a1a0a',
    error: '#1a0a0a',
  };
  const borderMap: Record<string, string> = {
    pending: '#1e293b',
    active: '#a78bfa',
    done: '#34d399',
    error: '#f87171',
  };
  const iconMap: Record<string, string> = {
    pending: '○',
    active: '◉',
    done: '●',
    error: '✕',
  };

  return (
    <Box
      backgroundColor={bgMap[status]}
      padding="8px 14px"
      borderRadius="6px"
      margin="0 4px"
      textAlign="center"
      flex={1}
      style={{
        border: `1px solid ${borderMap[status]}`,
        opacity: status === 'pending' ? 0.5 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      <Text fontSize="0.7rem" color={color} fontWeight="700" margin="0 0 2px" fontFamily="monospace">
        {iconMap[status]} {label}
      </Text>
      <Text fontSize="0.6rem" color="#64748b" margin="0">
        {sublabel}
      </Text>
    </Box>
  );
}

export default function IntegratedDemo() {
  const [started, setStarted] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [grpcCalls, setGrpcCalls] = useState<GRPCCall[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [steps, setSteps] = useState<StepStatus[]>(['pending', 'pending', 'pending', 'pending', 'pending']);

  const executeQuery = useCallback(async (key: string) => {
    const { query } = QUERIES[key as keyof typeof QUERIES];
    setActiveQuery(key);
    setLoading(true);
    setError(null);
    setResponse(null);
    setGrpcCalls([]);
    setSteps(['active', 'pending', 'pending', 'pending', 'pending']);

    try {
      setSteps(['done', 'active', 'pending', 'pending', 'pending']);
      const res = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      setSteps(['done', 'done', 'active', 'active', 'pending']);
      const data = await res.json();

      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      setSteps(['done', 'done', 'done', 'done', 'done']);
      setResponse(data.data);
      setGrpcCalls(data.extensions?.grpcCalls || []);
    } catch (err: any) {
      setError(err.message);
      setSteps(['done', 'done', 'error', 'error', 'error']);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!started) {
    return (
      <Slide backgroundColor="#0b0d1a">
        <FlexBox height="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Heading fontSize="2rem" color="primary" margin="0 0 16px 0" textAlign="center">
            Demo Integrada — GraphQL + gRPC
          </Heading>
          <Text fontSize="1rem" color="#94a3b8" margin="0 0 24px 0" textAlign="center" width="70%">
            La demo conecta el gateway GraphQL con el servicio gRPC de la biblioteca.
            Presioná el botón para cargarla y ejecutar consultas sobre el flujo integrado.
          </Text>
          <Box
            as="button"
            onClick={() => setStarted(true)}
            backgroundColor="#06b6d4"
            color="#0b0d1a"
            padding="14px 28px"
            borderRadius="10px"
            style={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.28)',
            }}
          >
            Comenzar demo
          </Box>
        </FlexBox>
      </Slide>
    );
  }

  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" style={{ overflow: 'hidden' }}>
        <Heading fontSize="1.6rem" color="primary" margin="0 0 12px 0">
          Demo Integrada — GraphQL + gRPC
        </Heading>

        <FlexBox width="95%" justifyContent="space-between" marginBottom="10px" alignItems="stretch">
          <Box backgroundColor="#0d1117" padding="10px 12px" borderRadius="8px" width="32%" style={{ border: '1px solid #1e293b' }}>
            <Text fontSize="0.75rem" color="#06b6d4" fontWeight="800" margin="0 0 4px 0">
              1. Elegí una query
            </Text>
            <Text fontSize="0.68rem" color="#94a3b8" margin="0">
              Disparás una consulta del frontend para ver cómo GraphQL decide qué datos pedir.
            </Text>
          </Box>
          <Box backgroundColor="#0d1117" padding="10px 12px" borderRadius="8px" width="32%" style={{ border: '1px solid #1e293b' }}>
            <Text fontSize="0.75rem" color="#a78bfa" fontWeight="800" margin="0 0 4px 0">
              2. Gateway traduce
            </Text>
            <Text fontSize="0.68rem" color="#94a3b8" margin="0">
              El gateway resuelve cada campo y llama al servicio gRPC de la biblioteca.
            </Text>
          </Box>
          <Box backgroundColor="#0d1117" padding="10px 12px" borderRadius="8px" width="32%" style={{ border: '1px solid #1e293b' }}>
            <Text fontSize="0.75rem" color="#34d399" fontWeight="800" margin="0 0 4px 0">
              3. Revisá el trace
            </Text>
            <Text fontSize="0.68rem" color="#94a3b8" margin="0">
              Mirás la respuesta final y las RPC concretas que ejecutó el backend.
            </Text>
          </Box>
        </FlexBox>

        <FlexBox width="95%" justifyContent="center" marginBottom="12px">
          <StepBox label="React App" sublabel="presentación" status={steps[0]} color="#06b6d4" />
          <Text fontSize="1rem" color="#475569" margin="0 2px">→</Text>
          <StepBox label="GraphQL Gateway" sublabel="Apollo Server" status={steps[1]} color="#a78bfa" />
          <Text fontSize="1rem" color="#475569" margin="0 2px">→</Text>
          <StepBox label="gRPC Client" sublabel="protocol buffers" status={steps[2]} color="#fbbf24" />
          <Text fontSize="1rem" color="#475569" margin="0 2px">→</Text>
          <StepBox label="gRPC Service" sublabel="source of truth" status={steps[3]} color="#34d399" />
          <Text fontSize="1rem" color="#475569" margin="0 2px">→</Text>
          <StepBox label="Respuesta" sublabel="JSON" status={steps[4]} color="#f87171" />
        </FlexBox>

        <FlexBox width="100%" justifyContent="center" marginBottom="10px" flexWrap="wrap">
          {Object.entries(QUERIES).map(([key, q]) => (
            <Box
              key={key}
              as="button"
              onClick={() => executeQuery(key)}
              backgroundColor={activeQuery === key ? '#1e3a5f' : '#111827'}
              padding="8px 18px"
              borderRadius="6px"
              margin="0 6px 6px"
              style={{
                border: activeQuery === key ? '2px solid #06b6d4' : '1px solid #1e293b',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading && activeQuery !== key ? 0.5 : 1,
                transition: 'all 0.2s',
                color: '#c8d6e5',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
              }}
              onMouseOver={(e: any) => {
                if (!loading) e.currentTarget.style.borderColor = '#06b6d4';
              }}
              onMouseOut={(e: any) => {
                if (activeQuery !== key) e.currentTarget.style.borderColor = '#1e293b';
              }}
            >
              {q.label}
            </Box>
          ))}
        </FlexBox>

        <FlexBox width="95%" justifyContent="space-between" flex={1} style={{ minHeight: 0 }}>
          <Box
            width="49%"
            backgroundColor="#0d1117"
            borderRadius="8px"
            padding="12px"
            style={{
              border: '1px solid #1e293b',
              overflow: 'auto',
              maxHeight: '240px',
            }}
          >
            <Text fontSize="0.8rem" color="#06b6d4" fontWeight="700" margin="0 0 8px 0" fontFamily="monospace">
              {'>'} Response
            </Text>
            {loading && (
              <Text fontSize="0.85rem" color="#64748b" fontFamily="monospace">
                Ejecutando consulta...
              </Text>
            )}
            {error && (
              <Text fontSize="0.85rem" color="#f87171" fontFamily="monospace">
                Error: {error}
              </Text>
            )}
            {response && !loading && (
              <Text fontSize="0.75rem" color="#c8d6e5" fontFamily="monospace" margin="0">
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {JSON.stringify(response, null, 2)}
                </pre>
              </Text>
            )}
            {!response && !loading && !error && (
              <Text fontSize="0.85rem" color="#475569" fontFamily="monospace">
                Selecciona una consulta para ejecutar
              </Text>
            )}
          </Box>
          <Box
            width="49%"
            backgroundColor="#0d1117"
            borderRadius="8px"
            padding="12px"
            style={{
              border: '1px solid #1e293b',
              overflow: 'auto',
              maxHeight: '240px',
            }}
          >
            <Text fontSize="0.8rem" color="#fbbf24" fontWeight="700" margin="0 0 8px 0" fontFamily="monospace">
              {'>'} gRPC Trace ({grpcCalls.length} calls)
            </Text>
            {grpcCalls.length === 0 && !loading && (
              <Text fontSize="0.85rem" color="#475569" fontFamily="monospace">
                Los detalles de gRPC aparecerán aquí
              </Text>
            )}
            {loading && (
              <Text fontSize="0.85rem" color="#64748b" fontFamily="monospace">
                Esperando respuesta...
              </Text>
            )}
            {grpcCalls.map((call, i) => {
              const info = GATEWAY_CALLS[call.method] || { query: '?', resolver: '?' };
              return (
                <Box
                  key={i}
                  backgroundColor="#111827"
                  padding="8px 10px"
                  borderRadius="4px"
                  marginBottom="6px"
                  style={{ borderLeft: '3px solid #fbbf24' }}
                >
                  <FlexBox justifyContent="space-between">
                    <Text fontSize="0.75rem" color="#fbbf24" fontWeight="700" margin="0" fontFamily="monospace">
                      {call.method}
                    </Text>
                    <Text fontSize="0.65rem" color="#64748b" margin="0" fontFamily="monospace">
                      {call.durationMs}ms
                    </Text>
                  </FlexBox>
                  <Text fontSize="0.65rem" color="#94a3b8" margin="2px 0 0" fontFamily="monospace">
                    Request: {JSON.stringify(call.request)} → Response: {JSON.stringify(call.response).slice(0, 60)}...
                  </Text>
                </Box>
              );
            })}
          </Box>
        </FlexBox>

        <Appear>
          <FlexBox width="95%" marginTop="8px" flexWrap="wrap">
            <Box
              width="49%"
              backgroundColor="#0a1628"
              padding="8px 14px"
              borderRadius="6px"
              marginRight="1%"
              style={{ borderLeft: '3px solid #06b6d4' }}
            >
              <Text fontSize="0.75rem" color="#06b6d4" fontWeight="700" margin="0 0 2px">
                Lo que hace GraphQL
              </Text>
              <Text fontSize="0.65rem" color="#94a3b8" margin="0">
                Expone un schema unificado, recibe consultas del frontend y traduce
                cada campo a llamadas a servicios internos.
              </Text>
            </Box>
            <Box
              width="49%"
              backgroundColor="#1a0a0a"
              padding="8px 14px"
              borderRadius="6px"
              marginLeft="1%"
              style={{ borderLeft: '3px solid #fbbf24' }}
            >
              <Text fontSize="0.75rem" color="#fbbf24" fontWeight="700" margin="0 0 2px">
                Lo que hace gRPC
              </Text>
              <Text fontSize="0.65rem" color="#94a3b8" margin="0">
                Actúa como fuente de datos real, expone operaciones RPC con
                contrato estricto y transmite datos en binario sobre HTTP/2.
              </Text>
            </Box>
          </FlexBox>
        </Appear>
      </FlexBox>
    </Slide>
  );
}
