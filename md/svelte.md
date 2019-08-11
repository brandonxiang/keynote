## svelte 入门

###### 项伟平

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
- Vallina js
- Template

----

#### svelte demo

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
[demo](https://svelte.dev/repl/embed?example=blog-write-less-code)
</font>

----

<!-- .slide: data-background="white" data-background-image="./img/vueReact.png" data-background-size="contain" -->

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
[demo](https://svelte.dev/repl/hello-world?version=3.7.1)
</font>

----

