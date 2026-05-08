import { InteractiveBrowserCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { AgentVersion } from "@azure/ai-projects";
import type OpenAI from "openai";

const projectEndpoint = import.meta.env["VITE_PROJECT_ENDPOINT"] as string;
const deploymentName = import.meta.env["VITE_MODEL_DEPLOYMENT"] as string;
const clientId = import.meta.env["VITE_AZURE_CLIENT_ID"] as string;
const tenantId = import.meta.env["VITE_AZURE_TENANT_ID"] as string;

const AGENT_NAME = "my-agent-basic";

let cachedProject: AIProjectClient | null = null;
let cachedOpenAIClient: OpenAI | null = null;
let cachedAgent: AgentVersion | null = null;

function getCredential() {
  return new InteractiveBrowserCredential({ clientId, tenantId });
}

/**
 * Returns the project client, OpenAI client, and agent (creates agent if needed).
 * Call this once when starting a chat session.
 */
export async function getProjectAndAgent(): Promise<{
  project: AIProjectClient;
  openAIClient: OpenAI;
  agent: AgentVersion;
}> {
  if (cachedProject && cachedOpenAIClient && cachedAgent) {
    return {
      project: cachedProject,
      openAIClient: cachedOpenAIClient,
      agent: cachedAgent,
    };
  }
  const credential = getCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();
  const agent = await project.agents.createVersion(AGENT_NAME, {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant that answers general questions",
  });
  cachedProject = project;
  cachedOpenAIClient = openAIClient;
  cachedAgent = agent;
  return { project, openAIClient, agent };
}

/**
 * Creates a new conversation, optionally with an initial user message.
 */
export async function createConversation(
  openAIClient: OpenAI,
  initialUserMessage?: string
): Promise<{ id: string }> {
  const items = initialUserMessage
    ? [
        {
          type: "message" as const,
          role: "user" as const,
          content: initialUserMessage,
        },
      ]
    : undefined;
  const conversation = await openAIClient.conversations.create(
    items ? { items } : undefined
  );
  return { id: conversation.id };
}

/**
 * Adds a user message to the conversation and gets the agent's response text.
 */
export async function addMessageAndGetResponse(
  openAIClient: OpenAI,
  conversationId: string,
  agent: AgentVersion,
  userContent: string
): Promise<string> {
  await openAIClient.conversations.items.create(conversationId, {
    items: [
      {
        type: "message" as const,
        role: "user" as const,
        content: userContent,
      },
    ],
  });
  const response = await openAIClient.responses.create({
    conversation: conversationId,
    agent: { name: agent.name, type: "agent_reference" },
  } as Parameters<OpenAI["responses"]["create"]>[0]);
  return (response as { output_text?: string }).output_text ?? "";
}

export default async function main(): Promise<void> {
  const { agent } = await getProjectAndAgent();
  console.log(
    `Agent ready (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`
  );
}
