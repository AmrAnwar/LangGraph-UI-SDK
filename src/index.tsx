require("@assistant-ui/react/styles/index.css");
import ReactDOM from "react-dom/client";
import { useRef } from "react";
import {
  LangChainMessage,
  useLangGraphRuntime,
} from "@assistant-ui/react-langgraph";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { Client, ThreadState } from "@langchain/langgraph-sdk";
import { Thread } from "@assistant-ui/react";
import React from "react";

export type DefaultHeaders = Record<string, string | null | undefined>;
export interface ChatBotInput {
  containerId: string;
  apiUrl: string;
  apiKey?: string;
  agentId: string;
  configurable: { [key: string]: unknown };
  headers: DefaultHeaders;
}

const createClient = (
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
) => {
  return new Client({
    apiUrl,
    apiKey: apiKey,
    defaultHeaders: headers,
  });
};

export const createThread = async (
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
) => {
  const client = createClient(apiUrl, apiKey, headers);
  return client.threads.create();
};

export const getThreadState = async (
  threadId: string,
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
): Promise<ThreadState<{ messages: LangChainMessage[] }>> => {
  const client = createClient(apiUrl, apiKey, headers);
  return client.threads.getState(threadId);
};

/**
 *
 * @param  {threadId: string;  messages: LangChainMessage[];}
 * @returns
 */
export const sendMessage = async (
  params: {
    threadId: string;
    messages: LangChainMessage[];
    agentId: string;
    apiUrl: string;
    apiKey?: string;
  },
  configurable: {
    [key: string]: unknown;
    thread_id?: string;
    checkpoint_id?: string;
  },
  headers: DefaultHeaders
) => {
  const client = createClient(params.apiUrl, params.apiKey, headers);
  return client.runs.stream(params.threadId, params.agentId, {
    config: {
      configurable: {
        thread_id: params.threadId,
        ...configurable,
      },
    },
    input: {
      messages: params.messages,
    },
    streamMode: "messages",
  });
};

const MarkdownText = makeMarkdownText();

export function MyAssistant(params: Omit<ChatBotInput, "containerId">) {
  const threadIdRef = useRef<string>();
  const runtime = useLangGraphRuntime({
    threadId: threadIdRef.current,
    stream: async (messages) => {
      if (!threadIdRef.current) {
        const { thread_id } = await createThread(
          params.apiUrl,
          params.apiKey,
          params.headers
        );
        threadIdRef.current = thread_id;
      }
      const threadId = threadIdRef.current;
      return sendMessage(
        {
          threadId,
          messages,
          agentId: params.agentId,
          apiUrl: params.apiUrl,
        },
        params.configurable,
        params.headers
      );
    },
    onSwitchToNewThread: async () => {
      const { thread_id } = await createThread(
        params.apiUrl,
        params.apiKey,
        params.headers
      );
      threadIdRef.current = thread_id;
    },
    onSwitchToThread: async (threadId) => {
      const state = await getThreadState(
        threadId,
        params.apiUrl,
        params.apiKey,
        params.headers
      );
      threadIdRef.current = threadId;
      return { messages: state.values.messages };
    },
  });

  return (
    <Thread
      runtime={runtime}
      assistantMessage={{ components: { Text: MarkdownText } }}
    />
  );
}

export function initChatBot(params: ChatBotInput) {
  const { containerId, apiUrl, configurable, agentId, headers, apiKey } =
    params;
  const container = document.getElementById(containerId);
  const root = ReactDOM.createRoot(container!);
  root.render(
    <MyAssistant
      apiUrl={apiUrl}
      apiKey={apiKey}
      configurable={configurable ?? {}}
      headers={headers ?? {}}
      agentId={agentId ?? "agent"}
    />
  );
}
