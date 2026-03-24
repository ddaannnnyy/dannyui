import { createResolver } from '@nuxt/kit'
// Resolve will enable the tailwind files to work in parents.
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    resolve('app/assets/css/dannyui.css'),
    resolve('app/assets/css/tailwind.css')
  ],
  devtools: { enabled: true },
  modules: [resolve('modules/initial-setup.ts'), '@vueuse/nuxt']
})