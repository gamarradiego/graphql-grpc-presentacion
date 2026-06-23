import { Slide, Heading, Table, TableRow, TableCell, FlexBox } from 'spectacle';

const cellStyle = {
  padding: '10px 14px',
  fontSize: '0.85rem',
  lineHeight: 1.3,
  borderBottom: '1px solid #1e293b',
  verticalAlign: 'middle' as const,
};

const headerStyle = {
  ...cellStyle,
  fontWeight: '700' as const,
  color: '#06b6d4',
  borderBottom: '2px solid #06b6d4',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  fontSize: '0.75rem',
};

const colWidths = ['18%', '41%', '41%'];

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
      <FlexBox height="100%" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading fontSize="2rem" color="primary" margin="0 0 20px 0">
          GraphQL vs gRPC — Comparación
        </Heading>
        <Table
          width="92%"
          style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
        >
          <TableRow>
            <TableCell style={{ ...headerStyle, width: colWidths[0] }}>Aspecto</TableCell>
            <TableCell style={{ ...headerStyle, width: colWidths[1], color: graphqlColor }}>GraphQL</TableCell>
            <TableCell style={{ ...headerStyle, width: colWidths[2], color: grpcColor }}>gRPC</TableCell>
          </TableRow>
          {rows.map(([aspect, gql, grpc], i) => (
            <TableRow key={i}>
              <TableCell style={{ ...cellStyle, width: colWidths[0], fontWeight: '600', color: '#94a3b8' }}>{aspect}</TableCell>
              <TableCell style={{ ...cellStyle, width: colWidths[1] }}>{gql}</TableCell>
              <TableCell style={{ ...cellStyle, width: colWidths[2] }}>{grpc}</TableCell>
            </TableRow>
          ))}
        </Table>
      </FlexBox>
    </Slide>
  );
}
