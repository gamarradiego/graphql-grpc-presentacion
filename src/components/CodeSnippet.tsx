type CodeSnippetProps = {
  children: string;
};

export default function CodeSnippet({ children }: CodeSnippetProps) {
  return (
    <pre
      style={{
        margin: 0,
        padding: '18px 20px',
        borderRadius: '10px',
        background: '#111827',
        color: '#e5e7eb',
        border: '1px solid #1f2937',
        overflowX: 'auto',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '0.8rem',
        lineHeight: 1.5,
        whiteSpace: 'pre',
        tabSize: 2,
      }}
    >
      <code>{children}</code>
    </pre>
  );
}