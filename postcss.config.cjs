const cssnano = require('cssnano');
const postCssFlexBugsFixesPlugin = require('postcss-flexbugs-fixes');
const postCssPresetEnvPlugin = require('postcss-preset-env');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    postCssFlexBugsFixesPlugin,
    postCssPresetEnvPlugin({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    production &&
      cssnano({
        preset: 'default',
      }),
  ],
};
