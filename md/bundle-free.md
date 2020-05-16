## ES Module Import & Bundle Free

----

## ES Module Import 是什么？

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

<!-- .slide: data-background="white" data-background-image="https://brandonxiang.github.io/keynote/img/bundle-free-waterfall-1.png" data-background-size="contain" -->

----

<!-- .slide: data-background="white" data-background-image="https://brandonxiang.github.io/keynote/img/bundle-free-waterfall-2.png" data-background-size="contain" -->

----

# snowpack

----


```html
<link rel="modulepreload" href="html.js">
<link rel="modulepreload" href="lib.js">
<script type="module" src="./app.js"></script>
```


```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

---- 

### 参考资料

- [Using ES Modules in the Browser Today](https://www.sitepoint.com/using-es-modules/)