# GraphQL & gRPC

Presentación para el TFU de la Unidad 6 que compara **GraphQL** y **gRPC** como paradigmas de API modernos en la arquitectura de software. Incluye una demo integrada donde GraphQL consume un servicio gRPC internamente.

## Estructura del Repositorio

```
.
├── README.md               # Este archivo
├── demos.md                # Documentación de los demos
├── index.html              # HTML de entrada de Vite
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
├── src/                    # Presentación en React + Spectacle
│   ├── main.tsx            # Punto de entrada de React
│   ├── App.tsx             # Contenedor Deck con todas las diapositivas
│   ├── theme.ts            # Tema de Spectacle (colores, fuentes)
│   └── slides/             # Componentes de diapositivas
│       ├── Title.tsx
│       ├── Architecture.tsx
│       ├── APIOverview.tsx
│       ├── REST.tsx
│       ├── GraphQLIntro.tsx
│       ├── GraphQLConcepts.tsx
│       ├── GraphQLProsCons.tsx
│       ├── GRPCIntro.tsx
│       ├── GRPCConcepts.tsx
│       ├── GRPCCommunication.tsx
│       ├── GRPCProsCons.tsx
│       ├── Comparison.tsx
│       ├── UseCases.tsx
│       ├── ArchitectureBridge.tsx  # Transición a demo integrada
│       ├── IntegratedDemo.tsx      # Demo interactiva GraphQL+gRPC
│       ├── Summary.tsx
│       └── Questions.tsx
├── graphql-demo/           # Gateway GraphQL (consume gRPC)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts        # Apollo Server standalone (referencia)
│       └── gateway.ts      # Apollo Server que consulta gRPC
└── grpc-demo/              # Servicio gRPC de Biblioteca
    ├── package.json
    ├── tsconfig.json
    ├── proto/
    │   ├── calculator.proto
    │   └── library.proto   # Proto del servicio de biblioteca
    └── src/
        ├── server.ts       # Servidor calculadora (referencia)
        ├── client.ts       # Cliente calculadora (referencia)
        ├── library-server.ts   # Servidor gRPC de biblioteca
        └── library-client.ts   # Cliente gRPC usado por el gateway
```

---

## Configuración

### Requisitos previos

- **Node.js** >= 18
- **npm** >= 9

### 1. Instalar dependencias raíz

```bash
npm install
```

### 2. Instalar dependencias de los demos

```bash
cd graphql-demo && npm install && cd ..
cd grpc-demo && npm install && cd ..
```

---

## Ejecutar la Presentación (con demos integrados)

```bash
npm run dev
```

Inicia tres procesos concurrentemente:

| Proceso | Puerto | Descripción |
|---|---|---|
| Presentación React (Vite) | `:5173` | Slides navegables con flechas |
| Servicio gRPC (Biblioteca) | `:50051` | Fuente de datos (Protocol Buffers) |
| Gateway GraphQL | `:4000` | Traduce consultas GraphQL a RPC gRPC |

Abre `http://localhost:5173`. Espera a que los tres servicios muestren su mensaje de inicio antes de usar la demo interactiva (puede tomar ~10 segundos la primera vez).

Para compilar para producción:

```bash
npm run build
npm run preview
```

---

## Arquitectura

```
React App (cliente)
    │  Consultas GraphQL (HTTP)
    ▼
GraphQL Gateway (Apollo Server)
    │  Llamadas RPC (Protocol Buffers, HTTP/2)
    ▼
gRPC Service (Biblioteca — fuente de datos)
```

Los resolvers de GraphQL NO acceden a datos directamente. Cada consulta se traduce a una o más llamadas gRPC internas. Esto replica una arquitectura real donde GraphQL actúa como BFF (Backend For Frontend) y gRPC comunica los servicios internos.
