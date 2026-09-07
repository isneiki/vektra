<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const { data: session } = await authClient.getSession();
</script>

<template>
  <div>
    <UHeader title="Vektra">
      <template #right>
        <div v-if="session">
          <UButton label="Dashboard" variant="solid" to="/user/dashboard" />
        </div>
        <div v-else>
          <UButton label="Sign In" variant="ghost" to="/user/login" />
          <UButton label="Sign Up" variant="solid" to="/user/register" />
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
