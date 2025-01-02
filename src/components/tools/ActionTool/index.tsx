import React from "react";
import { makeAssistantToolUI } from "@assistant-ui/react";
import { TransactionConfirmationPending } from "./components/TransactionConfirmationPending";

export const actionTools = (toolNames: string[]) => {
  return toolNames.map((toolName) => {
    return makeAssistantToolUI<any, string>({
      toolName: toolName,
      render: ({ args, result, status, addResult }) => {
        const handleReject = async () => {
          addResult({ approve: false });
        };

        const handleConfirm = async () => {
          addResult({ approve: true });
        };

        return (
          <div className="mb-4 flex flex-col items-center gap-2">
            <div>
              <pre className="whitespace-pre-wrap break-all text-center">
                action_tool({JSON.stringify(args)})
              </pre>
            </div>
            {!result && status.type !== "running" && (
              <TransactionConfirmationPending
                {...args}
                onConfirm={handleConfirm}
                onReject={handleReject}
              />
            )}
          </div>
        );
      },
    });
  });
};
