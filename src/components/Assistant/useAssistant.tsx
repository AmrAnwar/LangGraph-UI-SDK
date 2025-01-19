import { useRef } from "react";
import {
  LangChainMessage,
  useLangGraphRuntime,
} from "@assistant-ui/react-langgraph";
import { DefaultHeaders } from "../../types";
import { Client, ThreadState } from "@langchain/langgraph-sdk";
import { AssistantParams } from "./types";

export default function useAssistant(params: AssistantParams) {
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

  return { runtime };
}

function createClient(
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
) {
  return new Client({
    apiUrl,
    apiKey: apiKey,
    defaultHeaders: headers,
  });
}

async function createThread(
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
) {
  const client = createClient(apiUrl, apiKey, headers);
  return client.threads.create();
}

async function getThreadState(
  threadId: string,
  apiUrl: string,
  apiKey: string | undefined,
  headers: DefaultHeaders
): Promise<ThreadState<{ messages: LangChainMessage[] }>> {
  const client = createClient(apiUrl, apiKey, headers);
  return client.threads.getState(threadId);
}

async function sendMessage(
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
) {
  const client = createClient(params.apiUrl, params.apiKey, headers);
  return client.runs.stream(params.threadId, params.agentId, {
    config: {
      configurable: {
        thread_id: params.threadId,
        ...configurable,
      },
    },

    input:
      params.messages.length != 0
        ? {
            messages: params.messages,
          }
        : undefined,
    streamMode: ["messages", "debug"],
  });
}
