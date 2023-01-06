---
title: PWA 开发实战
revealOptions: 
   transition: slide
   transitionSpeed: slow
---

## PWA 开发实战

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2018 年 11 月 26 日

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/qrcode.jpg" data-background-size="contain" -->

---

## PWA 两大基本要素

- Web App Manifest 添加 App 图标到主屏幕
- Service Worker 离线缓存

---

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

---

Service Worker 与 Web Worker 的区别

---

#### Service Worker

![Service Worker](https://keynote.brandonxiang.top/public/img/stale-while-revalidate.png)

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/pwa-chrome.png" data-background-size="contain" -->


---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/pwa-lifecycle.jpg" data-background-size="contain" -->

---

## 生命周期

https://github.com/yyx990803/register-service-worker

---
<!-- .slide: data-auto-animate -->

<h2 data-id="code-title">Even Prettier Animations</h2>
<pre data-id="code-animation"><code class="hljs" data-trim data-line-numbers="|3-6|13-16|22-32">
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready () {
          console.log('[vuepress:sw] Service worker is active.')
          event.$emit('sw-ready')
        },

        cached (registration) {
          console.log('[vuepress:sw] Content has been cached for offline use.')
          event.$emit('sw-cached', new SWUpdateEvent(registration))
        },

        updated (registration) {
          console.log('[vuepress:sw] Content updated.')
          event.$emit('sw-updated', new SWUpdateEvent(registration))
        },

        offline () {
          console.log('[vuepress:sw] No internet connection found. App is running in offline mode.')
          event.$emit('sw-offline')
        },

        error (err) {
          console.error('[vuepress:sw] Error during service worker registration:', err)
          event.$emit('sw-error', err)
          if (GA_ID) {
            ga('send', 'exception', {
              exDescription: err.message,
              exFatal: false
            })
          }
        }
</code></pre>

---

## PWA 其他概念

- App Shell  优先显示 APP 的主结构，再填充主数据，更快显示更好体验
- Push Notification 消息推送
- Background Sync 请求后台发送
- PaymentRequest 支付请求

---

## [兼容性问题](https://lavas.baidu.com/ready)

---

## [Workbox 插件](https://developers.google.com/web/tools/workbox/)

它具备 workbox-webpack-plugin

- generateSW 新建 service worker 文件
- injectManifest 已有 service worker 文件

---

## vue-cli2.0

```javascript
// Inside of webpack.config.js:
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  // Other webpack config...

  plugins: [
    // Other plugins...

    new WorkboxPlugin.GenerateSW({
      // Exclude images from the precache
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [
        {
          // Match any request ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          // Apply a cache-first strategy.
          handler: "cacheFirst",

          options: {
            // Use a custom cache name.
            cacheName: "images",

            // Only cache 10 images.
            expiration: {
              maxEntries: 10
            }
          }
        }
      ]
    })
  ]
};
```

---

## vue-cli3.0

```shell
vue add @vue/pwa
```

```javascript
// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "dev/sw.js"
      // ...other Workbox options...
    }
  }
};
```

---

## 如何解决sw缓存问题

- SW注册名必须更新
- SW文件必须是协商缓存

https://github.com/lavas-project/sw-register-webpack-plugin

---

## 演示环节

https://github.com/brandonxiang/example-pwa

