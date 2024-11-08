import React from "react";
import {Thread} from "@assistant-ui/react";
import {makeMarkdownText} from "@assistant-ui/react-markdown";
import {ActionTool} from "../tools/ActionTool";
import {RetrievalTool} from "../tools/RetrievalTool";
import useAssistant from "./useAssistant";
import {AssistantParams} from "./types";

const MarkdownText = makeMarkdownText();

export default function Assistant(params: AssistantParams) {
    const { runtime } = useAssistant(params);

    return (
        <Thread
            runtime={runtime}
            assistantMessage={{ components: { Text: MarkdownText } }}
            tools={[ActionTool, RetrievalTool]}
        />
    );
}
