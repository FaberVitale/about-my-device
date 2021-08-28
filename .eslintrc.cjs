'use strict';
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['svelte3', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['*.cjs'],
  rules: {
    curly: 1,
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/typescript': require('typescript'),
    'svelte3/ignore-styles': () => true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    project: ['./tsconfig.json'],
  },
  globals: { $$props: 'readonly' },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
