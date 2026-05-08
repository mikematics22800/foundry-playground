# foundry-playground

A small [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) app for experimenting with **Azure AI Language** (text analytics) and **Azure AI Foundry** agents via [`@azure/ai-projects`](https://www.npmjs.com/package/@azure/ai-projects) and interactive sign-in.

Routes:

- **`/chat`** — conversational UI backed by an AI Foundry project agent (Microsoft Entra ID / interactive browser login).
- **`/text-analysis`** — entity detection, language detection, and similar calls through the Text Analytics client.

The dev server redirects `/` to `/chat`.

---

## Prerequisites

- **Node.js** 20 or later (LTS recommended). Vite 7 expects a current Node release.
- **npm** (this repo uses `package-lock.json`).
- An **Azure subscription** with:
  - A **Language** (or compatible) resource if you use text analysis, and/or  
  - An **Azure AI Foundry** project and model deployment if you use chat.

---

## Clone and install

```bash
git clone <repository-url>
cd foundry-playground
npm install
```

---

## Environment variables

Create a **`.env`** or **`.env.local`** file in the project root (same folder as `package.json`). Vite only exposes variables that are prefixed with `VITE_`.

| Variable | Used by | Purpose |
|----------|---------|---------|
| `VITE_AZURE_API_KEY` | Text analysis | API key for Azure AI Language / Text Analytics. |
| `VITE_PROJECT_ENDPOINT` | Chat | Azure AI Foundry **project** endpoint URL (see your project in Azure AI Foundry). |
| `VITE_MODEL_DEPLOYMENT` | Chat | Name of the **model deployment** in that project (e.g. your chat model deployment id). |
| `VITE_AZURE_CLIENT_ID` | Chat | **Application (client) ID** of an App Registration used with `InteractiveBrowserCredential`. |
| `VITE_AZURE_TENANT_ID` | Chat | Microsoft Entra **Directory (tenant) ID** for that app registration. |

Example shape (replace values with yours; do not commit real secrets):

```env
VITE_AZURE_API_KEY=
VITE_PROJECT_ENDPOINT=https://your-region.api.azureml.ms/...
VITE_MODEL_DEPLOYMENT=
VITE_AZURE_CLIENT_ID=
VITE_AZURE_TENANT_ID=
```

Restart `npm run dev` after changing env files.

### Text Analytics endpoint

The Language service **endpoint URL** is currently set in code (`src/utils/Client.tsx`). For your own Azure resource, update that URL to match **Keys and endpoint** in the Azure portal for your Language resource. The **key** still comes from `VITE_AZURE_API_KEY`.

### Chat: App Registration and redirect URI

Chat uses [`InteractiveBrowserCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/interactivebrowsercredential) in the browser. In Microsoft Entra ID, register a **single-page application** (or configure the app accordingly) and add a **redirect URI** for local dev, typically:

`http://localhost:5173`

Use the same port Vite prints when you run `npm run dev` (default is **5173**). Grant the signed-in user access to the AI Foundry project as required by your subscription (e.g. appropriate RBAC on the project or workspace).

---

## Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Navigate with the in-app navbar: **Chat** and **Text analysis**.

Other scripts:

| Command | Description |
|---------|-------------|
| `npm run build` | Typecheck (`tsc -b`) and production build to `dist/`. |
| `npm run preview` | Serve the production build locally for a quick smoke test. |
| `npm run lint` | Run ESLint on the project. |

---

## Tech stack (high level)

- **UI:** React 19, [MUI](https://mui.com/), [Emotion](https://emotion.sh/), [React Router](https://reactrouter.com/)  
- **Azure:** `@azure/ai-text-analytics`, `@azure/ai-projects`, `@azure/identity`  
- **Tooling:** Vite 7, TypeScript 5.9, ESLint 9

---

## Troubleshooting

- **Blank or failing chat after login:** Confirm redirect URI, tenant/client IDs, project endpoint, deployment name, and that your account can use the Foundry project.  
- **Text analysis errors:** Confirm the endpoint in `Client.tsx`, the key in `VITE_AZURE_API_KEY`, and that the resource region and features match what the UI calls.  
- **Env not picked up:** Only `VITE_*` names are available in the browser bundle; restart the dev server after edits.
