## ES Module Import & Bundle Free

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

<img src="https://brandonxiang.github.io/keynote/img/bundle-free-waterfall-1.png" width="100%">

----

<!-- .slide: data-background="white" -->
### What we expect

<img src="https://brandonxiang.github.io/keynote/img/bundle-free-waterfall-2.png" width="60%">


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

<!-- .slide: data-background="white" data-background-image="https://brandonxiang.github.io/keynote/img/es-module.png" data-background-size="contain" -->


----

### 兼容性解决方案

```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

----


### Bundle Free（No Bundle）是什么？


----

<!-- .slide: data-background="black" data-background-image="https://brandonxiang.github.io/keynote/img/vite-twitter.png" data-background-size="contain" -->

----

- snowpack 方案
- vite 方案

----

### 参考资料

- [Using ES Modules in the Browser Today](https://www.sitepoint.com/using-es-modules/)