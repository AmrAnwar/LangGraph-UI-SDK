import {ChatBotInput} from "../../types";

export type AssistantParams = Omit<ChatBotInput, "containerId">;