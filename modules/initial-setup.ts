import { addVitePlugin, createResolver, defineNuxtModule } from 'nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

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
})