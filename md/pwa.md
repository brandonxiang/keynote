## PWA开发实战

项伟平

2018年11月26日

----

<!-- .slide: data-background="white" data-background-image="./img/qrcode.jpg" data-background-size="contain" -->

----

## PWA两大基本要素

- Web App Manifest 添加App图标到主屏幕
- Service Worker 离线缓存

----

#### Web App Manifest

```json
{
  "name": "preact-sw-magic",
  "short_name": "preact-sw-magic",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fff",
  "theme_color": "#673ab8",
  "icons": [
    {
      "src": "/assets/icons/android-chrome-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/assets/icons/android-chrome-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]

```


----

Service Worker 与 Web Worker的区别

----

#### Service Worker

![Service Worker](./img/stale-while-revalidate.png)

----

<!-- .slide: data-background="white" data-background-image="./img/pwa-chrome.png" data-background-size="contain" -->

----

## PWA其他三个概念

- App Shell 优先显示APP的主结构，再填充主数据，更快显示更好体验
- Push Notification 消息推送
- Background Sync 请求后台发送
- PaymentRequest 支付请求

----

## [兼容性问题](https://lavas.baidu.com/ready)

----

## [Workbox插件](https://developers.google.com/web/tools/workbox/)

- generateSW 新建service worker文件
- injectManifest 已有service worker文件

----

## vue-cli2.0

```javascript
// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...

  plugins: [
    // Other plugins...

    new WorkboxPlugin.GenerateSW({
      // Exclude images from the precache
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Match any request ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'cacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    })
  ]
};
```

----

## vue-cli3.0

```shell
vue add @vue/pwa
```

```javascript
// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}
```

