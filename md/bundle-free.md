## ESM Import & Bundle Free

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2020年8月14日

----

### 目录

- ES Module Import 是什么？
- Bundle Free 是什么？
- 对未来web前端的畅想

----

### ES Module Import 是什么？

----

```javascript
// index.js
export default function plus (a, b) {
  return a + b;
}
```

```html
<!-- index.html -->
<script type="module">
  import plus from './index.js';
  document.querySelector('#app').innerText = 
  '1+1 = ' + plus(1,1);
</script>
```

----
<!-- .slide: data-background="white" -->
### Network Waterfall

<img src="https://keynote.vercel.app/img/bundle-free-waterfall-1.png" width="100%">

----

<!-- .slide: data-background="white" -->
### What we expect

<img src="https://keynote.vercel.app/img/bundle-free-waterfall-2.png" width="60%">


----

### es module preload

```html
<link rel="modulepreload" href="html.js">
<link rel="modulepreload" href="lib.js">
<script type="module" src="./app.js"></script>
```
----

### preact在es module import的使用

[htm example](https://github.com/developit/htm#example)

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/img/es-module.png" data-background-size="contain" -->


----

### 兼容性解决方案

```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

----

### polyfill--dimport

```html
<!-- Load the "module" version on browsers that can support it. -->
<script type="module" src="https://unpkg.com/dimport?module" data-main="/bundle.js"></script>
 
<!-- Load the "nomodule" version on older browsers – acts as fallback! -->
<script type="nomodule" src="https://unpkg.com/dimport/nomodule" data-main="/bundle.js"></script>
```

----


### Bundle Free（No Bundle）是什么？


----

<!-- .slide: data-background="black" data-background-image="https://keynote.vercel.app/img/vite-twitter.jpeg" data-background-size="contain" -->

----

## Bundle Free 解决方案

- [snowpack](https://github.com/pikapkg/snowpack) 方案
- [vite](https://github.com/vitejs/vite) 方案


----

## O(1) file builds.

- Bundling is a process of O(n) complexity
- Snowpack is an O(1) build system.


----

![](https://keynote.vercel.app/img/snowpack-unbundled-example-3.png)

----

> snowpack和vite主要将bundle-free用在开发模式，生产模式还是以bundle为主（或提供选择）


----


## 优点

- SPA开发效率高，每个页面独立
- 与浏览器http2的并发请求契合
- 与浏览器的ESM Import契合
- 与deno的ESM Import契合
- 依赖清晰

----

## 缺点

- 兼容性不好，生产还是考虑打包模式
- 如果生产使用bundle-free的[加载效率问题](https://github.com/jakedeichert/svelvet/issues/83)
- 依赖需要都满足esm（antd不满足）
- 开发与生产的不一致性


----

## 对未来web前端的畅想

----

![Third Age of JavaScript](https://keynote.vercel.app/img/javascript_third.png)


----

- 第一阶段：Jquery时代（直接依赖）
- 第二阶段：前端工程化（打包依赖）
- 第三阶段：Bundle Free？（混合依赖）

----

### 参考资料

- [Snowpack 2.0](https://www.snowpack.dev/posts/2020-05-26-snowpack-2-0-release/)
- [The Third Age of JavaScript](https://www.swyx.io/writing/js-third-age)
- [Using ES Modules in the Browser Today](https://www.sitepoint.com/using-es-modules/)
- [vite和webpack性能对比视频](https://mobile.twitter.com/its_hebilicious/status/1290487966347874313)