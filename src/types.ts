import { ThreadWelcomeConfig } from "@assistant-ui/react";

export type DefaultHeaders = Record<string, string | null | undefined>;
export type ColorsConfig = {primary?: string, cancellation?: string};

export interface ChatBotInput {
  containerId: string;
  apiUrl: string;
  apiKey?: string;
  agentId: string;
  configurable: { [key: string]: unknown };
  headers: DefaultHeaders;
  retrievalTools?: string[];
  actionTools?: string[];
  welcome?: ThreadWelcomeConfig;
  colors?: ColorsConfig;
}
