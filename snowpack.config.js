module.exports = {
  scripts: {
    'build:css': 'postcss',
  },
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-babel',
    [
      'snowpack-plugin-imagemin',
      {
        include: ['**/*.png'],
        plugins: [
          require('imagemin-pngquant')({
            strip: true,
          }),
        ],
      },
    ],
  ],
}
