module.exports = {
  globDirectory: './dist/',
  globPatterns: [
    '\*\*/\*.{html,js,css}'
  ],
  swDest: './dist/sw.js',
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === 'image',
      handler: 'CacheFirst',
      options: {
        cacheName: 'slide-images',
        expiration: {
          maxEntries: 80,
          maxAgeSeconds: 30 * 24 * 60 * 60
        }
      }
    }
  ],
  clientsClaim: true,
  skipWaiting: true
};
