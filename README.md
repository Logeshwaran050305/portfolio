
## Deploying the CMS

The admin panel publishes shared portfolio content through `api/content.js`. Local storage is only a browser cache; it cannot update the public site by itself.

1. In Vercel, create or connect an Upstash Redis/KV store to this project.
2. Confirm one of these production environment variable pairs is available:
	- `KV_REST_API_URL`
	- `KV_REST_API_TOKEN`
	- `UPSTASH_REDIS_REST_URL`
	- `UPSTASH_REDIS_REST_TOKEN`
3. Redeploy after adding the variables.

After deployment, sign in to `/admin`, edit content, and use the save button. The public site loads the shared content from `/api/content` on each new browser session. Existing visitors may need a refresh.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
