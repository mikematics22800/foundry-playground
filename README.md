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
| `VITE_AZURE_CLIENT_ID` | Chat | **Application (client) ID** of an App Registration used with `InteractiveBrowserCredential`. |
| `VITE_AZURE_TENANT_ID` | Chat | Microsoft Entra **Directory (tenant) ID** for that app registration. |

Example shape (replace values with yours; do not commit real secrets):

```env
VITE_AZURE_API_KEY=
VITE_PROJECT_ENDPOINT=
VITE_AZURE_CLIENT_ID=
VITE_AZURE_TENANT_ID=
```

Restart `npm run dev` after changing env files.

### Text Analytics endpoint and auth

The Language service endpoint is read from `VITE_TEXT_ANALYTICS_ENDPOINT` in `src/utils/Foundry.ts`, with a fallback endpoint used if the env var is not set. Text Analytics auth prefers `VITE_AZURE_API_KEY`; if that key is missing, the app falls back to `InteractiveBrowserCredential`.

Add this to your env file to avoid using the fallback endpoint:

```env
VITE_TEXT_ANALYTICS_ENDPOINT=https://<your-language-resource>.cognitiveservices.azure.com/
```

### Chat: App Registration and redirect URI

Chat uses [`InteractiveBrowserCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/interactivebrowsercredential) in the browser. In Microsoft Entra ID, register a **single-page application** (or configure the app accordingly) and add a **redirect URI** for local dev, typically:

`http://localhost:5173`

Use the same port Vite prints when you run `npm run dev` (default is **5173**). Grant the signed-in user access to the AI Foundry project as required by your subscription (e.g. appropriate RBAC on the project or workspace).

### Fixing `AADSTS650057` (invalid resource)

If you see:

`invalid_client: AADSTS650057 ... Resource value from request: https://cognitiveservices.azure.com`

your app registration is requesting a resource that is not currently listed in its API permissions.

In Azure Portal:

1. Go to **Microsoft Entra ID** -> **App registrations** -> your app.
2. Open **API permissions** -> **Add a permission**.
3. Choose **APIs my organization uses** and find **Azure Cognitive Services**.
4. Add delegated permission **`user_impersonation`** (or the permission required by your flow).
5. Click **Grant admin consent** if your tenant requires it.

After changing permissions, sign out/in (or clear token cache) and try again.

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
- **Text analysis errors:** Confirm `VITE_TEXT_ANALYTICS_ENDPOINT`, `VITE_AZURE_API_KEY`, and that the resource region and features match what the UI calls.  
- **Env not picked up:** Only `VITE_*` names are available in the browser bundle; restart the dev server after edits.
