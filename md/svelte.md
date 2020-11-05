## svelte 入门

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2019年8月16日

----

#### svelte的背景

作者[Rich-Harris](https://github.com/Rich-Harris)，前端届“轮子哥”。

著名框架有[Rollup](https://github.com/rollup/rollup)，[Ractive.js](https://ractive.js.org/)。

----

#### [svelte的官方介绍](https://github.com/sveltejs/svelte)

> It's a compiler that takes your declarative components and converts them into efficient JavaScript that surgically updates the DOM.

----

#### svelte的特点

- No virtual DOM
- Template
- 接近Vallina js
- 极小Runtime

----

## 为什么我们需要前端框架？

----

- 组件化
- 数据流
- webcomponent还未成熟

----

#### 组件化

```html
<script>
    // parent
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>
```

```html
<script>
    // child
	export let answer;
</script>

<p>The answer is {answer}</p>
```
<font size="6">
[栗子一组件化](https://svelte.dev/examples#declaring-props)
</font>

----

#### 数据绑定

```html
<script>
	let a = 1;
	let b = 2;
</script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<p>{a} + {b} = {a + b}</p>
```

<font size="6">
[栗子二双向绑定](https://svelte.dev/repl/embed?example=blog-write-less-code)
</font>

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/img/vueReact.png" data-background-size="contain" -->

----

## 我们真的需要virtual dom吗？

----

### H5动画

- canvas
- css3
- svg

----

<font size="6">
[栗子三SVG动画](https://svelte.dev/examples#clock)
</font>

----

#### svelte源码

- compiler
- runtime

----

#### svelte 编译时

```javascript
const {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source, {
    generate: 'dom', // dom或者ssr模式
    dev: false, // 是否需要调试信息
    css: false, // JS是否包含css
    hydratable: false, //是否更新现有dom。适用ssr
    customElement: false, // 自定义element
    immutable: false, // 数据是否可变
    legacy: false //兼容ie9和ie10
});
```

----

#### svelte 运行时

<font size="6">
[栗子四运行时](https://svelte.dev/repl/hello-world?version=3.7.1)
</font>

----

#### 技术选型

![](https://user-gold-cdn.xitu.io/2019/8/4/16c5b1ea7164acdc?imageslim)

PC端复杂页面选用React，移动端页面选用Svelte
<font size="6">(图片来自尤雨溪JSConf)</font>

----

#### benchmark

![](https://keynote.vercel.app/img/benchmark.png)

----

## Q&A




