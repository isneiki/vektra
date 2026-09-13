// This is how the AI is going to deliver the message, just a simple json with type, message and resume formated in html.

export interface ChatResponse {
  type: string;
  message: string;
  resume?: string;
}
