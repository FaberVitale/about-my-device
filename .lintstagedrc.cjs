'use strict';
module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': [() => 'tsc --noEmit', 'eslint --fix'],
  'src/**/*.svelte': [
    'prettier --write',
    // https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
    () => 'tsc --noEmit',
  ],
  'src/**/*.{json}': ['prettier --write'],
};
