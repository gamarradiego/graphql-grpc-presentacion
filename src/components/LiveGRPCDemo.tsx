import { useState } from 'react';

const API = 'http://localhost:3001';

export default function LiveGRPCDemo() {
  const [result, setResult] = useState('');

  async function runOp(e: React.MouseEvent, op: string) {
    e.stopPropagation();
    setResult('calculando...');
    try {
      const res = await fetch(`${API}/api/calculator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 10, b: 5 }),
      });
      const data = await res.json();
      if (data.error) {
        setResult('Error: ' + data.error);
      } else if (data.results) {
        const r = data.results.find((x: any) => x.operation === op);
        setResult(r ? `${r.a} ${op} ${r.b} = ${r.result}` : 'No match');
      }
    } catch (e: any) {
      setResult('ERROR: ' + e.message);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      {['Add', 'Subtract', 'Multiply', 'Divide'].map((op) => (
        <div
          key={op}
          onClick={(e) => runOp(e, op)}
          style={{
            padding: '10px 16px',
            marginBottom: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem',
            fontFamily: '"Inter", sans-serif',
            background: '#111827',
            color: '#e5e7eb',
            border: '1px solid #1f2937',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {result === 'calculando...'
            ? `Calculando ${op}...`
            : result
              ? result
              : `${op} (10 vs 5)`}
        </div>
      ))}
    </div>
  );
}
