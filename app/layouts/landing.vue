<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui";

const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const { data: session } = await authClient.getSession();
</script>

<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="text-xl text-black font-bold mr-4"
          >Vektra</NuxtLink
        >
      </template>

      <template #right>
        <div v-if="session">
          <UButton label="Dashboard" variant="solid" to="/user/dashboard" />
        </div>
        <div v-else>
          <UButton :label="$t('sign_in')" variant="ghost" to="/user/login" />
          <UButton :label="$t('sign_up')" variant="solid" to="/user/register" />
        </div>
      </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-lucide-file-user" />

    <UFooter>
      <template #left
        >Kauã Thalison Rosa Moreira &copy;
        {{ new Date().getFullYear() }}</template
      >
    </UFooter>
  </div>
</template>
