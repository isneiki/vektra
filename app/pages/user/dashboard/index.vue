<script setup lang="ts">
// TODO: do something when this returns an error.
const { data: session } = await authClient.getSession();
import { marked } from "marked";
import DOMPurify from "dompurify";

const renderMarkdown = (content: string) => {
  const html = marked.parse(content) as string;

  return DOMPurify.sanitize(html);
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const messages = ref<Message[]>([
  {
    role: "assistant",
    content:
      "Olá! Eu sou o VektrAI, seu assistente de criação de currículos. Como posso ajudá-lo hoje?",
  },
]);

const userMessage = ref<string>("");
const isLoading = ref<boolean>(false);

const handleUserMessage = async () => {
  const message = userMessage.value.trim();

  if (message === "" || isLoading.value) {
    return;
  }

  messages.value.push({
    role: "user",
    content: userMessage.value,
  });

  userMessage.value = "";
  isLoading.value = true;

  // Call the API to get the assistant's response
  try {
    const res = await useFetch("/api/ai/chat", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    });

    if (res.data.value) {
      messages.value.push({
        role: "assistant",
        content: res.data.value,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const handleInputKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleUserMessage();
  }
};

definePageMeta({
  middleware: "logged",
  layout: "dashboard",
});
</script>

<template>
  <UContainer
    class="flex h-[calc(100vh-10rem)] flex-col overflow-hidden md:ml-12 md:rounded-xl md:border md:border-default"
  >
    <!-- Messages -->
    <div class="flex-1 overflow-y-auto px-4 py-6">
      <div class="mx-auto flex max-w-3xl flex-col gap-6">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex gap-3',
            message.role === 'user' ? 'justify-end' : 'justify-start',
          ]"
        >
          <!-- Assistant -->
          <template v-if="message.role === 'assistant'">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
            >
              <UIcon name="i-lucide-bot" class="size-4 text-primary" />
            </div>

            <div class="max-w-[85%]">
              <p class="mb-1 text-sm font-semibold">VektrAI</p>

              <div
                class="prose prose-sm dark:prose-invert max-w-none"
                v-html="renderMarkdown(message.content)"
              />
            </div>
          </template>

          <!-- User -->
          <template v-else>
            <div class="flex max-w-[85%] flex-col items-end">
              <div class="rounded-2xl bg-primary px-4 py-3 text-sm text-white">
                <p class="whitespace-pre-wrap">
                  {{ message.content }}
                </p>
              </div>
            </div>

            <NuxtImg
              v-if="session?.user.image"
              :src="session.user.image"
              alt="User Avatar"
              class="size-8 shrink-0 rounded-full"
            />

            <div
              v-else
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted"
            >
              <UIcon name="i-lucide-user" class="size-4" />
            </div>
          </template>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center gap-3">
          <div
            class="flex size-8 items-center justify-center rounded-full bg-primary/10"
          >
            <UIcon name="i-lucide-bot" class="size-4 text-primary" />
          </div>

          <div class="flex gap-1">
            <span class="size-2 animate-bounce rounded-full bg-muted" />
            <span
              class="size-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]"
            />
            <span
              class="size-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-default p-4">
      <UForm @submit.prevent="handleUserMessage">
        <div class="relative mx-auto max-w-3xl">
          <UTextarea
            v-model="userMessage"
            :rows="2"
            autoresize
            :maxrows="8"
            placeholder="Digite sua mensagem..."
            class="w-full"
            @keydown="handleInputKeydown"
          />

          <UButton
            type="submit"
            icon="i-lucide-arrow-up"
            size="sm"
            class="absolute bottom-2 right-2"
            :loading="isLoading"
            :disabled="!userMessage.trim()"
            aria-label="Enviar mensagem"
          />
        </div>

        <p class="mt-2 text-center text-xs text-muted">
          Enter para enviar · Shift + Enter para nova linha
        </p>
      </UForm>
    </div>
  </UContainer>
</template>

<!-- <template>
  <UContainer
    class="absolute md:border-2 md:rounded-xl md:border-default flex flex-col justify-end h-[calc(100vh-8rem)]"
  >
    <div class="flex-1 overflow-y-auto p-4 mb-2">
      <div v-for="message in messages" :key="message.content" class="mb-2">
        <div
          :class="message.role === 'user' ? 'text-primary' : 'text-secondary'"
        >
          <div v-if="message.role === 'user'" class="flex items-center">
            <NuxtImg
              v-if="session?.user.image"
              :src="session.user.image"
              alt="User Avatar"
              class="w-7 h-7 rounded-full mr-2"
            />

            <span class="font-semibold">{{ session?.user.name }}</span>
          </div>

          <div v-else class="flex items-center">
            <UIcon name="i-lucide-bot" class="size-5 text-secondary mr-2" />
            <p>VektrAI</p>
          </div>

          <div
            v-if="message.role === 'assistant'"
            class="prose prose-sm dark:prose-invert max-w-none"
            v-html="renderMarkdown(message.content)"
          ></div>
          <div v-else class="prose prose-sm dark:prose-invert max-w-none">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <UForm @submit.prevent="handleUserMessage()" class="mb-2">
      <UFormField name="chat">
        <UTextarea
          v-model="userMessage"
          :rows="1"
          autoresize
          placeholder="Digite sua mensagem..."
          class="w-full"
          @keydown="handleInputKeydown"
        />
      </UFormField>
    </UForm>
  </UContainer>
</template> -->
