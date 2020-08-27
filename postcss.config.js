const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [
    postcssImport({
      path: 'src/css',
    }),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
}
