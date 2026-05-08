# Foundry Playground

A Vite + React + TypeScript playground for testing Azure AI capabilities in a single UI:

- **Agent chat** via Azure AI Projects (`@azure/ai-projects`)
- **Text analytics** via Azure AI Language (`@azure/ai-text-analytics`)
- **Global language switching** that affects chat responses and analysis requests

## What This App Does

The app has two main routes:

- `/chat`: conversational interface backed by an Azure AI Project agent.
- `/text-analysis`: interactive test harness for multiple Azure Language features.

Text Analysis modes currently include:

- Language detection
- Key phrase extraction
- Entity recognition
- Linked entity recognition
- Sentiment analysis
- PII detection
- Healthcare entity analysis
- Combined "All" analysis action pipeline

## Tech Stack

- React 19
- TypeScript
- Vite 7
- React Router 7
- MUI (`@mui/material`)
- Azure SDKs:
  - `@azure/ai-projects`
  - `@azure/ai-text-analytics`
  - `@azure/identity`

## Prerequisites

Before running locally, make sure you have:

- Node.js 20+ (recommended)
- npm 10+ (recommended)
- An Azure AI Project endpoint
- An Azure AI Language/Text Analytics endpoint
- Azure Entra app registration details (`clientId`, `tenantId`) for browser auth
- Permissions to use Interactive Browser sign-in flow

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env .env.local
```

If your shell does not support `cp` (Windows PowerShell), use:

```powershell
Copy-Item .env .env.local
```

3. Update values in `.env.local` (see **Environment Variables** below).

4. Start the app:

```bash
npm run dev
```

5. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Environment Variables

Set these in `.env.local` (or `.env` if you prefer):

- `VITE_PROJECT_ENDPOINT`: Azure AI Project endpoint, including project path.
- `VITE_TEXT_ANALYTICS_ENDPOINT`: Azure AI Language endpoint.
  - If omitted, `src/utils/Foundry.ts` falls back to a hard-coded default endpoint.
- `VITE_AZURE_CLIENT_ID`: Azure Entra application (client) ID used by `InteractiveBrowserCredential`.
- `VITE_AZURE_TENANT_ID`: Azure Entra tenant ID.
- `VITE_AZURE_API_KEY`: present in current env file, but not currently consumed by app code.

### Security Note

Treat `.env` values as sensitive. Do not commit real credentials/secrets to source control.  
If secrets were committed previously, rotate them in Azure and move to a local-only env file.

## Available npm Scripts

- `npm run dev`: start local Vite dev server.
- `npm run build`: type-check and create production build in `dist/`.
- `npm run preview`: serve built assets locally.
- `npm run lint`: run ESLint.
- `npm run deploy`: publish `dist/` via `gh-pages`.

## Project Structure

Key files and folders:

- `src/App.tsx`: route wiring and application shell.
- `src/components/Navbar.tsx`: nav links and global language selector.
- `src/pages/Chat.tsx`: chat UI and conversation lifecycle.
- `src/pages/TextAnalytics.tsx`: mode switcher for text analysis demos.
- `src/components/*`: per-feature analysis forms and handlers.
- `src/context/LanguageContext.tsx`: shared language state.
- `src/utils/Foundry.ts`: Azure clients, agent creation, and chat helper functions.
- `vite.config.ts`: Vite config (`base` currently set to `/foundry-playground`).

## Chat Flow (High Level)

1. User sends input in `Chat`.
2. App initializes project + OpenAI client + agent (cached in memory).
3. App creates a conversation if one doesn't exist yet.
4. User message is posted to the conversation.
5. Response is requested from the agent.
6. Assistant output is rendered in the message list.

The selected UI language is prepended to the prompt (e.g., "Please respond in Spanish...").

## Text Analysis Flow (High Level)

Each analysis component uses a shared `AnalysisTestForm` to:

1. Collect one document per line.
2. Call the selected Azure Text Analytics API.
3. Display raw JSON response in the UI.

The global language selector provides the language hint for most analysis calls.

## Deployment Notes

- `vite.config.ts` currently uses:
  - `base: '/foundry-playground'`
- This is suitable when hosting under that subpath (for example GitHub Pages repo site).
- If deploying to root domain/path, update `base` accordingly.

Deploy command:

```bash
npm run build
npm run deploy
```

## Troubleshooting

- **Sign-in popup issues**: ensure browser popups are allowed and tenant/client IDs are correct.
- **401/403 from Azure**: verify account permissions and endpoint/project access.
- **CORS or endpoint errors**: confirm endpoint URL formatting and service region.
- **Empty agent responses**: validate agent creation, model deployment name, and project configuration.
- **Build issues**: run `npm run lint` and `npm run build` to surface type/lint problems.

## Future Improvements

- Add `.env.example` with placeholder values only.
- Move sensitive auth handling out of client where possible.
- Add automated tests for core flows.
- Add improved error boundaries and retry UI.

