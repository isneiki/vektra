<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/user/dashboard",
    active: true,
  },
  {
    label: "Analytics",
    icon: "i-lucide-bar-chart-2",
    to: "/user/dashboard/analytics",
  },
  {
    label: "settings",
    icon: "i-lucide-settings",
    defaultOpen: true,
    children: [
      {
        label: "Profile",
        icon: "i-lucide-user",
        to: "/user/dashboard/profile",
      },
      {
        label: "Account",
        icon: "i-lucide-user-check",
        to: "/user/dashboard/account",
      },
    ],
  },
];
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar open toggle-side="right">
      <template #header>
        <span class="text-xl font-bold">Vektra</span>
      </template>

      <UNavigationMenu :items="items" orientation="vertical" />
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
