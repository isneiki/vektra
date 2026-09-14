<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const route = useRoute();

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/user/dashboard",
      active: route.path === "/user/dashboard",
    },
    {
      label: "Analytics",
      icon: "i-lucide-bar-chart-3",
      to: "/user/dashboard/analytics",
      active: route.path === "/user/dashboard/analytics",
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
        {
          label: "Security",
          to: "/user/dashboard/settings/security",
          active: route.path === "/user/dashboard/settings/security",
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
          <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
          <UIcon
            v-else
            name="i-simple-icons-nuxtdotjs"
            class="size-5 text-primary mx-auto"
          />
        </template>

        <template #default="{ collapsed }">
          <UButton
            :label="collapsed ? undefined : 'Search...'"
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            block
            :square="collapsed"
          >
            <template v-if="!collapsed" #trailing>
              <div class="flex items-center gap-0.5 ms-auto">
                <UKbd value="meta" variant="subtle" />
                <UKbd value="K" variant="subtle" />
              </div>
            </template>
          </UButton>

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
