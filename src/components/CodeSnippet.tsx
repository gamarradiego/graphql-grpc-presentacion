import { Fragment, type ReactNode } from 'react';
import { syntaxColors } from '../theme';

type CodeSnippetProps = {
  children: string;
};

const keywords = new Set([
  'const', 'let', 'var', 'function', 'return', 'import', 'export', 'from',
  'type', 'interface', 'query', 'mutation', 'subscription', 'syntax', 'proto3',
  'service', 'rpc', 'message', 'returns', 'if', 'else', 'true', 'false',
  'null', 'undefined', 'new', 'class', 'extends', 'implements', 'as',
  'void', 'number', 'string', 'boolean', 'double', 'float', 'int32',
  'int64', 'bool', 'enum', 'repeated', 'optional', 'required', 'package',
  'reserved', 'oneof', 'map', 'using', 'namespace', 'schema', 'extend',
  'input', 'union', 'scalar', 'directive', 'on', 'fragment', 'type',
  'query', 'mutation', 'subscription',
]);

function tokenizeLine(line: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining) {
    const ws = remaining.match(/^(\s+)/);
    if (ws) {
      tokens.push(<span key={key++}>{ws[1]}</span>);
      remaining = remaining.slice(ws[1].length);
      continue;
    }

    const comment = remaining.match(/^\/\/.*/);
    if (comment) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.comment, fontStyle: 'italic' }}>{comment[0]}</span>);
      remaining = remaining.slice(comment[0].length);
      continue;
    }

    const str = remaining.match(/^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/);
    if (str) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.string }}>{str[0]}</span>);
      remaining = remaining.slice(str[0].length);
      continue;
    }

    const tmpl = remaining.match(/^`(?:[^`\\]|\\.)*`/);
    if (tmpl) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.string }}>{tmpl[0]}</span>);
      remaining = remaining.slice(tmpl[0].length);
      continue;
    }

    const num = remaining.match(/^\b(\d+\.?\d*)\b/);
    if (num) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.number }}>{num[1]}</span>);
      remaining = remaining.slice(num[1].length);
      continue;
    }

    const kw = remaining.match(/^([a-zA-Z_$][\w$]*)\b/);
    if (kw) {
      const word = kw[1];
      if (keywords.has(word)) {
        tokens.push(<span key={key++} style={{ color: syntaxColors.keyword, fontWeight: '600' }}>{word}</span>);
      } else if (word[0] >= 'A' && word[0] <= 'Z') {
        tokens.push(<span key={key++} style={{ color: syntaxColors.type }}>{word}</span>);
      } else if (remaining.length > word.length && remaining[word.length] === '(') {
        tokens.push(<span key={key++} style={{ color: syntaxColors.function }}>{word}</span>);
      } else {
        tokens.push(<span key={key++} style={{ color: syntaxColors.plain }}>{word}</span>);
      }
      remaining = remaining.slice(word.length);
      continue;
    }

    const op = remaining.match(/^([=+*/<>!-]+)/);
    if (op) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.operator }}>{op[1]}</span>);
      remaining = remaining.slice(op[1].length);
      continue;
    }

    const punct = remaining.match(/^([{}()\[\];:,|&?.]+)/);
    if (punct) {
      tokens.push(<span key={key++} style={{ color: syntaxColors.punctuation }}>{punct[1]}</span>);
      remaining = remaining.slice(punct[1].length);
      continue;
    }

    tokens.push(<span key={key++} style={{ color: syntaxColors.plain }}>{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return tokens;
}

function highlightCode(code: string): ReactNode {
  const lines = code.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      <span style={{ display: 'inline-block', width: '2ch', color: '#4a5568', userSelect: 'none', textAlign: 'right', marginRight: '1.5ch', fontSize: '0.75rem', opacity: 0.4 }}>
        {i + 1}
      </span>
      {tokenizeLine(line)}
      {i < lines.length - 1 ? '\n' : null}
    </Fragment>
  ));
}

export default function CodeSnippet({ children }: CodeSnippetProps) {
  return (
    <pre
      style={{
        margin: 0,
        padding: '18px 20px',
        borderRadius: '10px',
        background: '#0d1117',
        color: '#e5e7eb',
        border: '1px solid #1f2937',
        overflowX: 'auto',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '0.8rem',
        lineHeight: 1.6,
        whiteSpace: 'pre',
        tabSize: 2,
      }}
    >
      <code>{highlightCode(children)}</code>
    </pre>
  );
}
