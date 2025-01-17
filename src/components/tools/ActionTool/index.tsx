import React, { useState } from "react";
import { makeAssistantToolUI } from "@assistant-ui/react";
import { TransactionConfirmationPending } from "./components/TransactionConfirmationPending";

export const actionTools = (toolNames: string[]) => {
  return toolNames.map((toolName) => {
    return makeAssistantToolUI<any, string>({
      toolName: toolName,
      render: ({ args, result, status, addResult }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const handleReject = async () => {
          addResult({ approve: false });
        };

        const handleConfirm = async () => {
          addResult({});
        };
        return (
          <div className="max-w-sm my-2  bg-white rounded-lg border border-gray-200 p-2">
            <h2 className="text-base font-semibold text-gray-800 border-b pb-2 mb-4">
              🛠️ {toolName}
            </h2>
            <ul className="space-y-1">
              {Object.entries(args).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium text-gray-600">{key}</span>
                  <span className="text-gray-800">{JSON.stringify(value)}</span>
                </li>
              ))}
            </ul>
            {!result && status.type !== "running" && (
              <TransactionConfirmationPending
                {...args}
                onConfirm={handleConfirm}
                onReject={handleReject}
              />
            )}
            {result} {status.type}
            {!result && status.type == "running" ? (
              <div className="mt-4 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
              </div>
            ) : (
              result && (
                <div className="mt-2">
                  <button
                    className="w-full text-sm text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md focus:outline-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Hide Results" : "Show Results"}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-auto">
                      <pre className="text-sm text-gray-800">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        );

        // return (
        //   <div className="mb-4 flex flex-col items-center gap-2">
        //     <div>
        //       <pre className="whitespace-pre-wrap break-all text-center">
        //         action_tool({JSON.stringify(args)})
        //       </pre>
        //     </div>
        //     {!result && status.type !== "running" && (
        //       <TransactionConfirmationPending
        //         {...args}
        //         onConfirm={handleConfirm}
        //         onReject={handleReject}
        //         toolName={toolName}
        //       />
        //     )}
        //   </div>
        // );
      },
    });
  });
};
