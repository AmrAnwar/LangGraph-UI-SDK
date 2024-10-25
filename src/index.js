require("@assistant-ui/react/styles/index.css");
import ReactDOM from "react-dom/client";
import { Thread } from "@assistant-ui/react";
import { useRef } from "react";
import { useLangGraphRuntime } from "@assistant-ui/react-langgraph";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { Client } from "@langchain/langgraph-sdk";

const createClient = (apiUrl) => {
  return new Client({
    apiUrl,
  });
};

export const createThread = async (apiUrl) => {
  const client = createClient(apiUrl);
  return client.threads.create();
};

export const getThreadState = async (threadId, apiUrl) => {
  const client = createClient(apiUrl);
  return client.threads.getState(threadId);
};

/**
 *
 * @param  {threadId: string;  messages: LangChainMessage[];}
 * @returns
 */
export const sendMessage = async (params, configurable) => {
  const client = createClient(params.apiUrl);
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

export function MyAssistant(params) {
  const threadIdRef = useRef();
  const runtime = useLangGraphRuntime({
    threadId: threadIdRef.current,
    stream: async (messages) => {
      if (!threadIdRef.current) {
        const { thread_id } = await createThread(params.apiUrl);
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
        params.configurable
      );
    },
    onSwitchToNewThread: async () => {
      const { thread_id } = await createThread();
      threadIdRef.current = thread_id;
    },
    onSwitchToThread: async (threadId) => {
      const state = await getThreadState(threadId, params.apiUrl);
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

export function initChatBot(params) {
  const { containerId, apiUrl, configurable, agentId } = params;
  const container = document.getElementById(containerId);
  const root = ReactDOM.createRoot(container);
  root.render(
    <MyAssistant
      apiUrl={apiUrl}
      configurable={configurable}
      agentId={agentId ?? "agent"}
    />
  );
}
