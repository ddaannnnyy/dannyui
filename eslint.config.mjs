import antfu from '@antfu/eslint-config';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu({
    stylistic: true,
    rules: {
      'node/prefer-global/process': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/semi': ['error', 'always']
    }
  }, {
    files: ['**/*.vue'],
    rules: {
      'vue/custom-event-name-casing': [
        'error',
        'kebab-case',
        {
          // Ignores colon-middot. e.g. input:value
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u']
        }
      ]
    }
  }),
);