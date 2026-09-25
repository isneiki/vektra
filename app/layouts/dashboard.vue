<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const route = useRoute();

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: "Chat",
      icon: "i-lucide-message-square",
      to: "/user/dashboard",
      active: route.path === "/user/dashboard",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      defaultOpen: true,
      children: [
        {
          label: "General",
          to: "/user/dashboard/settings/general",
          active: route.path === "/user/dashboard/settings/general",
        },
      ],
    },
  ],
  [
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: "https://github.com/isneiki",
      target: "_blank",
    },
    {
      label: "Help & Support",
      icon: "i-lucide-info",
      to: "https://discord.gg/dUABgAc8eR",
      target: "_blank",
    },
  ],
]);

const userMenuItems = [
  [
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/user/dashboard/settings/general",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: async () => {
        await authClient.signOut();

        await navigateTo("/user/login");
      },
    },
  ],
];

const { data: session } = await authClient.getSession();
</script>

<template>
  <div class="flex">
    <UDashboardGroup class="flex h-screen w-screen overflow-hidden">
      <UDashboardSidebar
        collapsible
        resizable
        :ui="{ footer: 'border-t border-default' }"
      >
        <template #header="{ collapsed }">
          <p v-if="!collapsed" class="text-lg font-bold w-auto shrink-0">
            Vektra
          </p>
          <UIcon
            v-else
            name="i-simple-icons-v"
            class="size-5 text-primary mx-auto"
          />
        </template>

        <template #default="{ collapsed }">
          <UNavigationMenu
            :collapsed="collapsed"
            :items="items[0]"
            orientation="vertical"
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="items[1]"
            orientation="vertical"
            class="mt-auto"
          />
        </template>

        <template #footer="{ collapsed }">
          <UDropdownMenu
            :items="userMenuItems"
            :content="{
              align: 'end',
              side: collapsed ? 'right' : 'top',
            }"
          >
            <UButton
              :avatar="{
                src: session?.user.image
                  ? session.user.image
                  : '/images/avatar.png',
                loading: 'lazy' as const,
              }"
              :label="collapsed ? undefined : session?.user.name"
              color="neutral"
              variant="ghost"
              class="w-full"
              :block="collapsed"
            />
          </UDropdownMenu>
        </template>
      </UDashboardSidebar>

      <UDashboardPanel>
        <template #header>
          <UDashboardNavbar title="Dashboard" />
        </template>

        <template #body>
          <div class="flex justify-center items-center h-full w-full">
            <slot></slot>
          </div>
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>
