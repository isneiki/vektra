<template>
  <div>
    <UApp>
      <UHeader title="Vektra">
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
    </UApp>
  </div>
</template>
