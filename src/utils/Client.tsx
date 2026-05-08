import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

export const client = new TextAnalyticsClient(import.meta.env["VITE_TEXT_ANALYTICS_ENDPOINT"], new AzureKeyCredential(import.meta.env["VITE_AZURE_API_KEY"]));