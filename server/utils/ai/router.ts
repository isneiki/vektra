import openai from "../openai";

export type PromptRoute = "general" | "resume" | "technical";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function routePrompt(messages: Message[]): Promise<PromptRoute> {
  const response = await openai.responses.create({
    model: "gpt-5.6-luna",
    prompt: prompts.router,
    input: messages,
  });

  const route = response.output_text.trim();

  if (route !== "general" && route !== "resume" && route !== "technical") {
    return "general";
  }

  return route;
}
