'use strict';
module.exports = {
  'src/**/*.{ts,tsx}': [() => 'tsc --noEmit'],
  'src/**/*.svelte': [
    'prettier --write',
    // https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
    () => 'npm run validate',
  ],
  'src/**/*.{json,ts,tsx,js,jsx}': ['prettier --write'],
};
