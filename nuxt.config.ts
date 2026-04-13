import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      dannyui: {
        barebones: true,
        google: {
          mapsApiKey: undefined as string | undefined
        }
      },
    },
  },
  extends: [
    ['github:ddaannnnyy/utility-layer-nuxt4', { install: true }],
  ],
  css: [
    join(currentDirectory, './app/assets/css/dannyui.css'),
    join(currentDirectory, './app/assets/css/tailwind.css')
  ],
  devtools: { enabled: true },
  modules: [
    join(currentDirectory, './modules/initial-setup.ts'),
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
});
