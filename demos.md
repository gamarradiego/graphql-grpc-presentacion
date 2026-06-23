# Demos

## Arquitectura Integrada (Demo Principal)

La presentación incluye una sección interactiva que demuestra GraphQL y gRPC
funcionando juntos en una arquitectura real.

```
React App (Vite, :5173)
    │
    ▼
GraphQL Gateway (Apollo Server, :4000)
    │
    ▼
gRPC Service (Biblioteca, :50051)
```

El gateway GraphQL NO lee datos directamente. Cada resolver del schema
GraphQL realiza una llamada gRPC interna al servicio de biblioteca.

### Ejecutar todo junto

```bash
npm run dev
```

Esto inicia concurrentemente:

| Proceso | Puerto | Comando |
|---|---|---|
| Presentación React (Vite) | `:5173` | `vite` |
| Servicio gRPC (Biblioteca) | `:50051` | `ts-node grpc-demo/src/library-server.ts` |
| Gateway GraphQL | `:4000` | `ts-node graphql-demo/src/gateway.ts` |

Navega a `http://localhost:5173` para ver la presentación. Las últimas
diapositivas contienen la demo interactiva donde puedes ejecutar consultas
GraphQL en vivo y ver cómo internamente se traducen a llamadas gRPC.

### Demo Interactiva

Dentro de la presentación, la sección "Demo Integrada" permite:

1. Seleccionar consultas predefinidas (libros, autores, libros con autor)
2. Ver el flujo de la petición paso a paso (React → GraphQL → gRPC → respuesta)
3. Inspeccionar la respuesta JSON devuelta por GraphQL
4. Ver el trace de gRPC: qué métodos se llamaron, con qué parámetros y
   cuánto tardaron

### Consultas disponibles

**Obtener todos los libros:**
```graphql
query {
  books {
    id
    title
    year
    genres
  }
}
```

**Libros con autor (demuestra llamada anidada gRPC):**
```graphql
query {
  books {
    title
    author {
      name
      nationality
    }
  }
}
```

**Obtener autores:**
```graphql
query {
  authors {
    id
    name
    nationality
    birthYear
  }
}
```

---

## Demos Individuales (Referencia)

Los demos individuales siguen disponibles para ejecución por separado.

### GraphQL — API de Biblioteca (Standalone)

```bash
cd graphql-demo && npm run standalone
```

Inicia Apollo Server en `http://localhost:4000` usando datos en memoria
(sin integración gRPC). Schema idéntico al del gateway.

### gRPC — Calculadora (Standalone)

```bash
cd grpc-demo && npm run server   # Terminal 1
cd grpc-demo && npm run client   # Terminal 2
```

Servicio de calculadora en `localhost:50051`. El cliente ejecuta
operaciones Add, Subtract, Multiply, Divide.

---

## Resumen

| Aspecto | GraphQL | gRPC |
|---|---|---|
| **Contract** | Schema (tipado, consultado libremente) | Proto (contrato RPC estricto) |
| **Serialization** | JSON (legible por humanos) | Protocol Buffers (binario) |
| **Transport** | HTTP/1.1 o HTTP/2 | HTTP/2 |
| **Client control** | El cliente selecciona campos | Respuesta definida por el servidor |
| **Use case** | APIs flexibles, web/mobile | Microservicios internos, streaming |
| **Tooling** | Apollo, GraphiQL, Relay | protoc, grpcurl, Envoy |
