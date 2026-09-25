interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useMessages = () =>
  useState<Message[]>("messages", () => [
    {
      role: "assistant",
      content:
        "Olá! Eu sou o VektrAI, seu assistente de criação de currículos. Como posso ajudá-lo hoje?",
    },
  ]);
