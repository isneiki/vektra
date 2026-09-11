<script setup lang="ts">
const { data: session, error } = await authClient.getSession();

interface Message {
  role: "user" | "assistant";
  content: string;
}

const messages = ref<Message[]>([]);

const userMessage = ref<string>("");

const handleUserMessage = () => {
  if (userMessage.value.trim() !== "") {
    messages.value.push({
      role: "user",
      content: userMessage.value,
    });
    userMessage.value = "";
  }
};

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <UContainer
    class="absolute border-2 rounded-xl border-default flex flex-col justify-end ml-0 md:ml-12 mt-4 w-full h-[calc(100vh-3rem)]"
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
            <span class="font-semibold">VektrAI</span>
          </div>

          <p class="mt-2">
            {{ message.content }}
          </p>
        </div>
      </div>
    </div>
    <UForm @submit.prevent="handleUserMessage()">
      <div></div>

      <UFormField name="chat">
        <UInput
          v-model="userMessage"
          type="text"
          for="chat"
          placeholder="Enter your message..."
          class="w-full *:py-4 my-4"
        />
      </UFormField>
    </UForm>
  </UContainer>
</template>
