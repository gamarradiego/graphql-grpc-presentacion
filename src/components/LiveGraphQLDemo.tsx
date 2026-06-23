import { useState } from 'react';

const API = 'http://localhost:3001';

export default function LiveGraphQLDemo() {
  const [response, setResponse] = useState('');

  async function runQuery(e: React.MouseEvent) {
    e.stopPropagation();
    setResponse('cargando...');
    try {
      const res = await fetch(`${API}/api/graphql/standalone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { books { id title author year genres } }`,
        }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponse('ERROR: ' + e.message);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        onClick={runQuery}
        style={{
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.9rem',
          fontFamily: '"Inter", sans-serif',
          background: '#06b6d4',
          color: '#0b0d1a',
          textAlign: 'center',
          marginBottom: '12px',
          userSelect: 'none',
        }}
      >
        {response === 'cargando...' ? 'Consultando...' : response ? response : '▶ Ejecutar query'}
      </div>
    </div>
  );
}
