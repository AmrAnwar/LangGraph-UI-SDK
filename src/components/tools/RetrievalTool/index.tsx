import React from "react";
import { makeAssistantToolUI } from "@assistant-ui/react";

export const retrievalTools = (toolNames: string[]) => {
  return toolNames.map((toolName) => {
    return makeAssistantToolUI<any, any>({
      toolName: toolName,
      render: function PriceSnapshotUI({ args, result }) {
        return (
          <div>
            <pre>retrieval_tool({JSON.stringify(args)})</pre>
            {result && (
              <div>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        );
      },
    });
  });
};
