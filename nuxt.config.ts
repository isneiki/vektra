// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  i18n: {
    locales: [
      { code: "en", name: "English", language: "en-US", file: "en.json" },
      { code: "pt", name: "Português", language: "pt-BR", file: "pt.json" },
    ],
    defaultLocale: "en",
  },
});