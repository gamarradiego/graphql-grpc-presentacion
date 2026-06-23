import { Slide, Heading, Text, Table, TableRow, TableCell, FlexBox } from 'spectacle';

const cellStyle = {
  padding: '12px 16px',
  fontSize: '1rem',
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

export default function APIOverview() {
  return (
    <Slide backgroundColor="#0b0d1a">
      <FlexBox width="100%" height="100%" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading fontSize="2.2rem" color="primary" margin="0 0 36px 0">
          Paradigmas de API
        </Heading>
        <Table width="100%" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <TableRow>
              <TableCell style={headerStyle}>Paradigma</TableCell>
              <TableCell style={headerStyle}>Transporte</TableCell>
              <TableCell style={headerStyle}>Formato</TableCell>
              <TableCell style={headerStyle}>Acoplamiento</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}><Text fontWeight="700" color="#c8d6e5" margin="0" fontSize="1rem">REST</Text></TableCell>
              <TableCell style={cellStyle}>HTTP/1.1, HTTP/2</TableCell>
              <TableCell style={cellStyle}>JSON / XML</TableCell>
              <TableCell style={cellStyle}>Débil</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}><Text fontWeight="700" color="#06b6d4" margin="0" fontSize="1rem">GraphQL</Text></TableCell>
              <TableCell style={cellStyle}>HTTP/1.1, HTTP/2</TableCell>
              <TableCell style={cellStyle}>JSON</TableCell>
              <TableCell style={cellStyle}>Débil (cliente demanda)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}><Text fontWeight="700" color="#fbbf24" margin="0" fontSize="1rem">gRPC</Text></TableCell>
              <TableCell style={cellStyle}>HTTP/2</TableCell>
              <TableCell style={cellStyle}>Protocol Buffers</TableCell>
              <TableCell style={cellStyle}>Fuerte (contrato estricto)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}>SOAP</TableCell>
              <TableCell style={cellStyle}>HTTP, SMTP, ...</TableCell>
              <TableCell style={cellStyle}>XML</TableCell>
              <TableCell style={cellStyle}>Muy fuerte</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}>WebSocket</TableCell>
              <TableCell style={cellStyle}>TCP</TableCell>
              <TableCell style={cellStyle}>Binario / Texto</TableCell>
              <TableCell style={cellStyle}>Medio</TableCell>
            </TableRow>
        </Table>
      </FlexBox>
    </Slide>
  );
}
