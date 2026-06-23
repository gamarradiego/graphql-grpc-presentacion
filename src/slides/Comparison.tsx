import { Slide, Heading, Text, Table, TableRow, TableCell, FlexBox, Appear } from 'spectacle';

const cellStyle = {
  padding: '10px 14px',
  fontSize: '0.95rem',
  borderBottom: '1px solid #1e293b',
};

const headerStyle = {
  ...cellStyle,
  fontWeight: '700' as const,
  color: '#06b6d4',
  borderBottom: '2px solid #06b6d4',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  fontSize: '0.85rem',
};

const rows = [
  ['Formato', 'JSON (texto)', 'Protocol Buffers (binario)'],
  ['Transporte', 'HTTP/1.1 o HTTP/2', 'HTTP/2 (obligatorio)'],
  ['Contrato', 'Schema GraphQL', 'Archivo .proto'],
  ['Queries', 'Flexibles, cliente define', 'Fijas (RPC methods)'],
  ['Streaming', 'Subscripciones (WS)', 'Streaming nativo'],
  ['Caching', 'Complejo', 'Posible en capa HTTP'],
  ['Ecosistema Web', 'Nativo', 'Necesita gRPC-Web'],
];

const graphqlColor = '#06b6d4';
const grpcColor = '#fbbf24';

export default function Comparison() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 28px 0">
          GraphQL vs gRPC — Comparación
        </Heading>
        <Appear>
          <Table width="85%" style={{ borderCollapse: 'collapse' }}>
            <TableRow>
              <TableCell style={headerStyle}>Aspecto</TableCell>
              <TableCell style={{ ...headerStyle, color: graphqlColor }}>GraphQL</TableCell>
              <TableCell style={{ ...headerStyle, color: grpcColor }}>gRPC</TableCell>
            </TableRow>
            {rows.map(([aspect, gql, grpc], i) => (
              <TableRow key={i}>
                <TableCell style={{ ...cellStyle, fontWeight: '600', color: '#94a3b8' }}>{aspect}</TableCell>
                <TableCell style={cellStyle}>{gql}</TableCell>
                <TableCell style={cellStyle}>{grpc}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Appear>
      </FlexBox>
    </Slide>
  );
}
