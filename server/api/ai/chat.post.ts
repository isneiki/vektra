import { auth } from "../../utils/auth";
import { routePrompt } from "../../utils/ai/router";
import { prompts } from "../../utils/ai/prompts";
import { freeModel } from "~~/server/utils/ai/models";
import type { ChatResponse } from "#shared/types/chat";
import openai from "../../utils/openai";

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
    model: freeModel,
    prompt: prompts[route],
    input: messages,
    store: false,
  });

  try {
    return JSON.parse(response.output_text) as ChatResponse;
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "AI returned an invalid response",
    });
  }
});
