// This is how the AI is going to deliver the message, just a simple json with type, message and resume formatted in html.

export interface ChatResponse {
  type: string;
  message: string;
  resume?: string;
}
