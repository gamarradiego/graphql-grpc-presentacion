# Demos

## Demo de GraphQL — API de Biblioteca

Una API de biblioteca simple construida con **Apollo Server 4**.

### Ejecución

```bash
cd graphql-demo && npm run dev
```

El servidor inicia en `http://localhost:4000`. Abrir Apollo Sandbox en el navegador o enviar peticiones con `curl`.

### Schema

```graphql
type Book {
  id: ID!
  title: String!
  author: String!
  year: Int!
  genres: [String!]!
}

type Query {
  books: [Book!]!
  book(id: ID!): Book
}

type Mutation {
  addBook(title: String!, author: String!, year: Int!, genres: [String!]!): Book!
}
```

### Script de Demostración

#### 1. Solicitar solo campos seleccionados (evitar overfetching)

```graphql
query {
  books {
    title
    author
  }
}
```
**Nota:** Solo se devuelven `title` y `author` — sin overfetching.

#### 2. Obtener un libro por ID

```graphql
query {
  book(id: "2") {
    id
    title
    year
    genres
  }
}
```

#### 3. Agregar un nuevo libro (mutación)

```graphql
mutation {
  addBook(title: "Dune", author: "Frank Herbert", year: 1965, genres: ["Science Fiction", "Adventure"]) {
    id
    title
    author
  }
}
```

#### 4. Comparar selección de campos vs obtención completa

```bash
# Obtener solo title + author (payload pequeño)
curl -s -X POST http://localhost:4000/ \
  -H "Content-Type: application/json" \
  -d '{"query":"{ books { title author } }"}' | jq .

# Obtener todos los campos (payload más grande)
curl -s -X POST http://localhost:4000/ \
  -H "Content-Type: application/json" \
  -d '{"query":"{ books { id title author year genres } }"}' | jq .
```

Demuestra cómo el **cliente controla la forma de la respuesta**, eliminando el overfetching.

---

## Demo de gRPC — Servicio de Calculadora

Un servicio de calculadora construido con **gRPC** y `@grpc/grpc-js`, usando **Protocol Buffers** para la definición del contrato y serialización.

### Ejecución

Abre **dos terminales**.

**Terminal 1 — Iniciar el servidor:**

```bash
cd grpc-demo && npm run server
```

**Terminal 2 — Ejecutar el cliente:**

```bash
cd grpc-demo && npm run client
```

### Definición de Protocol Buffer

Archivo: [`proto/calculator.proto`](grpc-demo/proto/calculator.proto)

```protobuf
syntax = "proto3";

service Calculator {
  rpc Add      (CalcRequest) returns (CalcResponse);
  rpc Subtract (CalcRequest) returns (CalcResponse);
  rpc Multiply (CalcRequest) returns (CalcResponse);
  rpc Divide   (CalcRequest) returns (CalcResponse);
}

message CalcRequest {
  double a = 1;
  double b = 2;
}

message CalcResponse {
  double result = 1;
}
```

### Script de Demostración

1. En la **Terminal 1**, inicia el servidor gRPC:
   ```bash
   cd grpc-demo && npm run server
   ```
   Deberías ver: `Servidor de calculadora ejecutándose en localhost:50051`

2. En la **Terminal 2**, ejecuta el cliente:
   ```bash
   cd grpc-demo && npm run client
   ```

3. Salida esperada del cliente:
   ```
   Cliente gRPC de Calculadora
   ---------------------------
   10 + 5 = 15
   10 - 5 = 5
   10 * 5 = 50
   10 / 5 = 2
   ```
