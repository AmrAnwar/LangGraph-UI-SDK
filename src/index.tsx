import React from "react";
import ReactDOM from "react-dom/client";
import Assistant from "./components/Assistant";
import {ChatBotInput} from "./types";

require("@assistant-ui/react/styles/index.css");

export function initChatBot(params: ChatBotInput) {
  const { containerId, apiUrl, configurable, agentId, headers, apiKey } = params;

  const container = document.getElementById(containerId);
  const root = ReactDOM.createRoot(container!);

  root.render(
    <Assistant
      apiUrl={apiUrl}
      apiKey={apiKey}
      configurable={configurable ?? {}}
      headers={headers ?? {}}
      agentId={agentId ?? "agent"}
    />
  );
}
