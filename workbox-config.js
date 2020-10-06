module.exports = {
  globDirectory: './web/',
  globPatterns: [
    '\*\*/\*.{html,js}'
  ],
  swDest: './web/sw.js',
  clientsClaim: true,
  skipWaiting: true
};