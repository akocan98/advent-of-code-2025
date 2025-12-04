// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: [`**/*.{js,mjs,cjs,ts,mts,cts}`],
    plugins: { js },
    extends: [`js/recommended`],
    languageOptions: { globals: globals.browser },
    rules: {
      curly: [`error`, `all`],
      quotes: [`error`, `backtick`]
    }
  },
  tseslint.configs.recommended
]);
