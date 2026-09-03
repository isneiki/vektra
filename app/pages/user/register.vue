<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField, ButtonProps } from "@nuxt/ui";

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const providers: ButtonProps[] = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    color: "secondary",
    onClick: async () => {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/user/dashboard",
      });
    },
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    color: "secondary",
    onClick: async () => {
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/user/dashboard",
      });
    },
  },
];

const schema = z.object({
  name: z.string("Name is required").min(3, "Name is required"),
  email: z.email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data, error } = await authClient.signUp.email({
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
    callbackURL: "/user/dashboard",
  });

  if (error) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "error",
    });
    return;
  }

  await navigateTo("/user/dashboard");
}

definePageMeta({
  middleware: ["logged"],
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Register"
        description="Enter your details to create an account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit.prevent="onSubmit"
      />
    </UPageCard>
  </div>
</template>
