import React from "react";
import { makeAssistantToolUI } from "@assistant-ui/react";
import "./index.css";
require("./index.css");

export const retrievalTools = (toolNames: string[]) => {
  return toolNames.map((toolName) => {
    return makeAssistantToolUI<any, any>({
      toolName: toolName,
      render: function PriceSnapshotUI({ args, result }) {
        console.log("args::", args);
        return (
          <div>
            <pre>retrieval_tool({JSON.stringify(args)})</pre>
            <h1 className="text-primary text-4xl font-bold">
              Hello world! I am using React
            </h1>

            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Card Title
              </h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-600">Key 1</span>
                  <span className="text-gray-800">Value 1</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-600">Key 2</span>
                  <span className="text-gray-800">Value 2</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-600">Key 3</span>
                  <span className="text-gray-800">Value 3</span>
                </li>
              </ul>
            </div>
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
