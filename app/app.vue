<template>
  <div>
    <UHeader title="Cveck">
      <template #right> </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-lucide-file-user" />

    <UFooter>
      <template #left
        >Francisco Ossian &copy; {{ new Date().getFullYear() }}</template
      >
    </UFooter>
  </div>
</template>
