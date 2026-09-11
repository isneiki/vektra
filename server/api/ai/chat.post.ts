import { auth } from "../../utils/auth";
import { routePrompt } from "../../utils/ai/router";
import { prompts } from "../../utils/ai/prompts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // Todo: integrate this with the user's plan
  if (!session) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" }),
    );
  }

  const messages = body.messages as Message[];

  // Decides which prompt is the best for the occasion
  const route = await routePrompt(messages);

  // Actual response
  const response = await openai.responses.create({
    model: "gpt-5.6-luna",
    prompt: prompts[route],
    input: messages,
    store: true,
  });

  return response.output_text;
});
