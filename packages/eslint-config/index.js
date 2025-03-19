import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import astro from 'eslint-plugin-astro'
import globals from 'globals'
import ts from 'typescript-eslint'

export const config = ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    ignores: ['.svelte-kit/*'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
)
