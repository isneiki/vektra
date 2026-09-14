import { freeModel } from "./models";
import { prompts } from "./prompts";
import openai from "../openai";

export type PromptRoute = "general" | "resume" | "technical";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function routePrompt(messages: Message[]): Promise<PromptRoute> {
  const response = await openai.responses.create({
    model: freeModel,
    prompt: prompts.router,
    input: messages,
    store: false,
  });

  const route = response.output_text.trim();

  if (route !== "general" && route !== "resume" && route !== "technical") {
    return "general";
  }

  return route;
}
