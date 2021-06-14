const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssImportUrl = require("postcss-import-url")

module.exports = {
  plugins: [
    postcssImport({
      path: 'src/css',
    }),
    postcssImportUrl({
      modernBrowser: true
    }),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
}
