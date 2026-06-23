# GraphQL & gRPC

Presentación para el TFU de la Unidad 6 que compara **GraphQL** y **gRPC** como paradigmas de API modernos en la arquitectura de software. Además de la presentación, se incluyen ambos demos funcionales.

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
│       ├── DemoGraphQL.tsx
│       ├── DemoGRPC.tsx
│       ├── Summary.tsx
│       └── Questions.tsx
├── graphql-demo/           # Demo de API de biblioteca con GraphQL
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts        # Apollo Server con schema, resolvers y datos
└── grpc-demo/              # Demo del servicio calculadora con gRPC
    ├── package.json
    ├── tsconfig.json
    ├── proto/
    │   └── calculator.proto
    └── src/
        ├── server.ts       # Servidor gRPC
        └── client.ts       # Cliente gRPC
```

---

## Configuración

### Requisitos previos

- **Node.js** >= 18
- **npm** >= 9

### 1. Instalar dependencias raíz (Vite + React + Spectacle)

```bash
npm install
```

### 2. Instalar dependencias del demo de GraphQL

```bash
cd graphql-demo && npm install && cd ..
```

### 3. Instalar dependencias del demo de gRPC

```bash
cd grpc-demo && npm install && cd ..
```

---

## Ejecutar la Presentación

```bash
npm run dev
```

Abre el servidor de desarrollo de Vite en `http://localhost:5173`. Navega con las flechas del teclado (izquierda/derecha).

Para compilar para producción:

```bash
npm run build
npm run preview
```
