export type DefaultHeaders = Record<string, string | null | undefined>;

export interface ChatBotInput {
  containerId: string;
  apiUrl: string;
  apiKey?: string;
  agentId: string;
  configurable: { [key: string]: unknown };
  headers: DefaultHeaders;
  retrievalTools: string[];
  actionTools: string[];
}
