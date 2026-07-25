# yoedu-real-estate-web

**Prerequisites**
- Node.js 18+ installed
- npm (or pnpm/yarn) available

**Install dependencies**

```bash
npm install
```

**Run (development)**

Starts the Vite dev server with HMR on the default port.

```bash
npm run dev
```

Open http://localhost:5173 (or the port Vite reports) in your browser.

**Lint**

```bash
npm run lint
```

**OpenAPI / API client generation**

This repository includes an OpenAPI client generator configuration in `openapitools.json`. The project depends on `@openapitools/openapi-generator-cli` (see `devDependencies`). 

```bash
npm run openapi generate
```

The generated client code locates in `/api/openapi-generated` **(READ-ONLY)**:
- `/clients`: Contains API clients.
- `/models`: Contains DTO objects (written as *interface*).
