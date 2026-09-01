// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
});
