import tailwindcss from '@tailwindcss/vite';
import { addVitePlugin, defineNuxtModule } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'danny-ui-init',
    configKey: 'danny-ui'
  },
  moduleDependencies: {
    '@vueuse/nuxt': {
      optional: false,
      defaults: {},
      overrides: {}
    }
  },
  async setup() {
    addVitePlugin(tailwindcss());
  }
});
