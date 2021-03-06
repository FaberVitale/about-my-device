const webpack = require('webpack');
const WebpackModules = require('webpack-modules');
const sveltePreprocess = require('svelte-preprocess');
const postCssFlexBugsFixesPlugin = require('postcss-flexbugs-fixes');
const postCssPresetEnvPlugin = require('postcss-preset-env');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = {
  svelte: path.resolve('node_modules', 'svelte'),
  '@': path.resolve(__dirname, 'src'),
};

const extensions = ['.mjs', '.js', '.ts', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];
const fileLoaderRule = {
  test: /\.(png|jpe?g|gif)$/i,
  use: ['file-loader'],
};

const sveltePreprocessStep = sveltePreprocess({
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          // No need for babel to resolve modules
          modules: false,
          targets: {
            // ! Very important. Target es6+
            esmodules: true,
          },
        },
      ],
    ],
  },
  scss: {
    sourcemap: false,
  },
  postcss: {
    plugins: [
      postCssFlexBugsFixesPlugin,
      postCssPresetEnvPlugin({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ],
  },
});

module.exports = {
  client: {
    entry: { main: config.client.entry().main.replace(/\.js$/, '.ts') },
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        },
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              immutable: true,
              dev,
              hydratable: true,
              preprocess: sveltePreprocessStep,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
            },
          },
        },
        fileLoaderRule,
      ],
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: dev,
        __BROWSER__: true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
    ].filter(Boolean),
    devtool: dev && 'inline-source-map',
  },

  server: {
    entry: { server: config.server.entry().server.replace(/\.js$/, '.ts') },
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        },
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              immutable: true,
              css: false,
              generate: 'ssr',
              hydratable: true,
              preprocess: sveltePreprocessStep,
              dev,
            },
          },
        },
        fileLoaderRule,
      ],
    },
    mode,
    plugins: [
      new WebpackModules(),
      new webpack.DefinePlugin({
        __DEV__: dev,
        __BROWSER__: false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
    ],
    performance: {
      hints: false, // it doesn't matter if server.js is large
    },
  },

  serviceworker: {
    entry: {
      'service-worker': config.serviceworker
        .entry()
        ['service-worker'].replace(/\.js$/, '.ts'),
    },
    output: config.serviceworker.output(),
    resolve: { extensions: ['.mjs', '.js', '.ts', '.json'] },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        },
      ],
    },
    mode,
  },
};
