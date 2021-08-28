import sveltePreprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static';
import fs from 'fs';
import vite from 'vite';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: adapterStatic(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: vite.defineConfig({
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
      resolve: {
        alias: {
          $utils: path.resolve(__dirname, './src/utils'),
          $components: path.resolve(__dirname, './src/components'),
          $styles: path.resolve(__dirname, './src/styles'),
        },
      },
    }),
  },
};

export default config;
