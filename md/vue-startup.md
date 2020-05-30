## Vue技术选型与Webpack入门

项伟平

2017年6月9日

----

### 为什么选择vue？

----

#### vue 与 angular

- ng是完整mvvm框架，vue主要是view层
- 双向绑定基于模版编译规则，“脏”检查
- vue可以el对象进行实例化，组件化
- ng框架重，整个设计模式具有依赖注入的思想
- ng2断层式升级

----

#### vue 与 react

<img src="https://brandonxiang.github.io/keynote/img/switch_react_vue.jpg" width ="80%" alt="react vs vue" align=center />

----

#### vue 与 react

- React的es5与es6写法
- JSX和CSS IN JS的写法
- this 相关的奇怪行为
- React的生态链，学习成本

----

#### vue2.0与1.0区别

- virtual dom
- 强调单向数据流，推荐vuex
- api区别，生命周期调整

----

#### virtual dom

<img src="https://brandonxiang.github.io/keynote/img/virtual-dom.jpg" width ="90%" alt="virtual-dom" align=center />

来自[对 virtual-dom 的一些理解](https://zhuanlan.zhihu.com/p/25630842)

----

#### 双向绑定

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```javascript
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

[官方demo](http://cn.vuejs.org/v2/guide/#处理用户输入)

----

#### vuex的单向数据流

<img src="https://brandonxiang.github.io/keynote/img/vuex.png" width ="70%" alt="vuex单向数据流" align=center />

----

#### vue的选型

轻量，易学，适用于移动端，大生态

<img src="https://brandonxiang.github.io/keynote/img/architech.png" width ="70%" alt="vuex单向数据流" align=center />

----

### webpack的入门

----

#### 横向对比

- ~~gulp~~
- browserify
- rollup
- <font color="red">prepack</font>

----

#### 基本概念

- entry
- output
- loader
- plugin

----

#### loader

- less-loader
- sass-loader
- url-loader, file-loader
- babel-loader
- vue-loader, vux-loader

----

#### 举个栗子

```html
<template>
  <div>{{msg}}</div>
</template>

<script>
export default{
  data(){
    return {
      msg:'hello world'
    }
  }
}
</script>

<style></style>
```

[另一种写法](https://github.com/vuejs/vue/blob/dev/test/unit/features/component/component-scoped-slot.spec.js)

----

#### plugin

- UglifyJsPlugin
- CommonsChunkPlugin
- HtmlWebpackPlugin
- OccurrenceOrderPlugin

...

----

#### 多页面打包

```javascript
exports.getEntries = function (globPath) {
  let entries = {},
    basename,
    tmp,
    pathname;
  glob.sync(globPath).forEach((entry) => {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.slice(0, 2).join('/'); // 正确输出js路径
    entries[pathname] = entry;
  });

  return entries;
};
```

```javascript
utils.getEntries('./src/module/**/*.js')
```

----

#### 多页面打包

- 多个js入口（将entries改为数组）
- 多个html入口（基于HtmlWebpackPlugin）
- 单元测试调整

----

#### 多页面打包脚手架

[PaicFE/vue-multi](https://github.com/PaicFE/vue-multi)

```bash
vue init PaicFE/vue-multi my-project
```

----

### 项目构建优化

##### **动态路由 (vue-router)**

旧

```
/productDetail.html?agentNo=1120103025&productNo=BCBCBCB
&interFace=dmz
```

新

```
/productdetail/1120103025/BCBCBCBC?interFace=dmz
```

知乎

```
https://www.zhihu.com/question/32189846/answer/178741713
```

----

##### 性能优化

- code splitting
- 异步请求(promise，async/await)
- SSR(server side rendering)
- 压缩静态文件
- Cache(pwa)
- 预加载／延后加载

----

### 团队GITHUB

[PaicFE](https://github.com/PaicFE)

----

### Q&A



