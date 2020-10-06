module.exports = {
  globDirectory: './web/',
  globPatterns: [
    '\*\*/\*.{html,js,css}'
  ],
  swDest: './web/sw.js',
  clientsClaim: true,
  skipWaiting: true
};