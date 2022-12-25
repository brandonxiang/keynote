---
title: Vue开发规范
revealOptions: 
   transition: slide
   transitionSpeed: slow
---

## Vue开发规范

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2017年10月12日

---

#### 目录

- 历史问题
- 整体介绍
- Vue规范
- Html规范
- Javascript规范
- Css规范
- 自动化测试

---

### 历史问题

1. 双层路由的问题
2. vuex结构的问题
3. 单页面的内存问题

---

#### 双层路由的问题

> <small>vue-router的路由管理存在双层路由的情况，在懒加载打包的时候可能会出现多余打包</small>

![旧新路由module内项目结构](https://keynote.brandon.top/public/img/router.jpg)

---

<img alt="双层路由" src="https://keynote.brandon.top/public/img/double-router.png" width="60%">

---

#### vuex结构的问题

> <small>vuex的结构更多是一对一的情况，并且是以名字关联，写法相对死板</small>

![vue与vuex之间的关系](https://keynote.brandon.top/public/img/vue-architecture.png)

---

### 整体介绍

- 多页面
- DLL分包
- 按需打包
- EJS模版
- 模拟数据
- 服务端渲染SSR

---

### 多页面

> <small>多页面的打包主要是js入口变成多个以及html入口变成多个，在新框架中国使用的是 [mutualofomaha/multipage-webpack-plugin](https://github.com/mutualofomaha/multipage-webpack-plugin)，它是最近推出的, 这帮助你实现多页面打包的工具，对 [CommonsChunkPlugin](https://github.com/webpack/webpack) 和 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 的再一次封装，可以方便你完成对manifest，公共包和html-webpack-plugin的配置，免去很多配置上的麻烦</small>

> [PaicFE/vue-multi](https://github.com/PaicFE/vue-multi)

```javscript
$ npm install -g vue-cli
$ vue init PaicFE/vue-multi my-project
$ cd my-project
$ npm install
$ npm run build:dll
$ npm run dev
$ npm run build
```


---

### DLL打包

<small>只需要修改一下`webpack.dll.config.js`的entry，添加你要打包的库名</small>

```javascript
entry: {
  libs: [
    'vue/dist/vue.esm.js',
    'vue-router/dist/vue-router.esm.js',
    'vuex/dist/vuex.esm.js',
    'axios',
  ]
},
```

---

#### 按需打包

> <small>一个问题会出现--你发布到生产环境的只是其中几个项目，而不是所有项目”</small>


**打包黑名单**

```javascript
blackList: ['project1', 'project2', 'project3']
```

**指定项目打包**

```shell
npm run build project1 project2
```

---

#### Vue组件规范

<font color="red">[强制] Vue对象包括很多属性和方法，按一定书写顺序保证代码可维护性</font>

<small>
- name 名字
- props 组件属性
- data 数据
- components 组件
- directives 指令
- mixins 混合写法
- computed 实时计算
- watch 监听
- 生命周期函数
- methods 方法

</small>

---

<font color="red">[强制] 组件props属性需要进行类型强校验（适当default，required）</font>

```javascript
  props: {
    buyInfo: {
      type: Array,
      default: [],
    },
    storeLink: {
      type: String,
      default: '#',
    },
  },
```

#### <font color="red">[强制] 公共组件应该排除掉vuex的内容</font>

#### <font color="red">[强制] GET请求尽量写在页面级别的组件内</font>

---

#### [建议] vuex的目录结构按照分开的目录

<img alt="Vuex单向数据流" src="https://keynote.brandon.top/public/img/vuex.png" width="40%">

#### <font color="red">[强制] xhr请求放在vuex的actions中</font>

#### [建议] 复杂的请求可以梳理在api文件中，通过promise串联在一起

---

#### <font color="red">[强制] 指令中的事件在销毁的时候把事件回收</font>

```javascript
export default {
  bind(el, { value }) {
    el.addEventListener('click', () => collectClick(value), false);
  },
  unbind(el, { value }) {
    el.removeEventListener('click', () => collectClick(value), false);
  },
};
```

#### [建议] 如果Webapp经常互相切换页面，使用keep-alive组件

---

#### 公共组件库

<small>
第三方组件的样式都是用px为单位，如果直接大范围使用，在适配各种手机上会出现问题。即使是采用转换，对第三方组件样式控制比较弱。我们项目用的是rem样式，如果过分使用vux或者mint-ui会产生隐患。

- Alert 警告
- Button 按钮（大中小）
- Cell 行
- Checker 多选器
- Dialog 弹出框
- Picker 选择器
- Srcoller 滚动器
- Toast 提示

</small>

---

#### [推荐] 为了保证开发效率，可以在`webpack.base.config.js`关闭eslint的强制检验，所需的步骤如下

```javascript
  // {
  //   test: /\.(js|vue)$/,
  //   loader: 'eslint-loader',
  //   enforce: 'pre',
  //   include: [resolve('src'), resolve('test')],
  //   options: {
  //      formatter: require('eslint-friendly-formatter')
  //   }
  // },
```
#### [推荐] 打开编辑器的检查提示功能

---

#### HTML(TEMPLATE)编码规范

#### <font color="red">[强制] Vue组件标签和属性使用小写</font>

```html
<!-- good -->
<template>
  <x-dialog v-model="showValue" hide-on-blur dialog-class="mask-content">
  </x-dialog>
</template>
<script>
  import { XDialog } from 'vux';
  export default {
    components: { XDialog },
  }
</script>

<!-- bad -->
<template>
  <XDialog v-model="showValue" hide-on-blur dialog-class="mask-content">
  </XDialog>
</template>
```

<small>[官方camelCase vs. kebab-case](https://cn.vuejs.org/v2/guide/components.html#camelCase-vs-kebab-case)</small>

---



#### <font color="red">[强制] 属性值必须用双引号包围</font>

```html
<!-- good -->
<script src="esl.js"></script>

<!-- bad -->
<script src='esl.js'></script>
<script src=esl.js></script>
```

#### [建议] 布尔类型的属性，建议不添加属性值

```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
```
#### [建议] 移动端尽量使用HTML5语意化标签，如`acticle`，`header`等，PC端尽量不用

---

#### JavaScript（script）编码规范

<small>尽量使用es6编码</small>

#### <font color="red">[强制] 使用let／const不使用var，保证代码质量</font>

```javascript
const a = 1;
// 报错
a = 2; 

var b = 1；
b = 2；
```

<small>这里还有一点，var会造成变量提升或者全局污染等“危险行为”</small>

---

#### <font color="red">[强制] 字符串拼接</font>



```javascript
// good
const word = `你的得分是${score}`;

// bad
const word = '你的得分是' + score;
```

#### <font color="red">[强制] 字符串开头和结束使用单引号 `'`</font>

---

#### <font color="red">[强制] 解构</font>

```javascript
// good
const {
    productName,
    productSummary,
    imgUrl,
} = productData;

// bad
const productName = productData.productName;
const productSummary = productData.productSummary;
const imgUrl = productData.imgUrl;

//good 
function demo({productName, imgUrl}) {
  .....
}

// bad
function demo(productData) {
  const productName = productData.productName;
  const imgUrl = productData.imgUrl;
}
```

---

#### <font color="red">[强制] 方法默认函数</font>

```javascript
// good
function demo(productName = '') {
  ......
}

// bad
function demo(productName){
  productName = productName || '';
}
```

---

#### <font color="red">[强制] 采用数组，对象的扩展写法</font>

```javascript
var a = [1,2,3,4,5];

a.forEach()
a.map()
a.reduce()
a.some()
a.every()
```

---

#### <font color="red">[强制] promise异步编程，采用链式写法</font>

```javascript
// 尽量使用链式写法
// good
promise.then(function(value) {
  // step1
}).then(function(value){
  // step2
}).catch(function(value){
  // failure
})

//bad
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

---

#### CSS（STYLE）编码规范

#### <font color="red">[强制] 项目样式预编译器使用scss，拒绝CSS</font>
#### <font color="red">[强制] 组件内的样式为了不造成全局污染，必需采用scoped去限制样式的作用域</font>


```html
<style lang="scss" scoped>
</style>
```

---

#### <font color="red">[强制] 引入SCSS时，不要在JS端`import "reset.scss"`，要在组件内`@import "reset.scss"`</font>

#### [建议] 重置样式或者全局样式放在外层App.vue，不建议在main.js直接引入

---

#### [建议] postcss的autoprefixer配置根据项目而定，PC端采用默认的配置

```json
// 默认的配置在package.json中
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

> <small>移动端兼容安卓4.4的配置，需要额外的兼容写在`postcssrc.js`里面，对默认配置进行覆盖</small>

```json
"autoprefixer": {
  browsers: ['iOS >= 7', 'Android >= 4.1']
}
```

---

#### [强制] 减少使用嵌套选择器和组合选择器，嵌套不能超过三层

示例：

```css

/* bad */
.post, .page, .comment {
    line-height: 1.5;
}
```

---

#### BEM

BEM是**Block，Element，Modifier**的缩写

* .block{}
* .block__element{}
* .block--modifier{}
* .block__element--modifier{}

---

![BEM](https://keynote.brandon.top/public/img/Definitions-BEM-5.jpg)

---

#### 使用scss写BEM

```scss
.header {
  &__text {
    text-decoration: underline; 
  }
  &__image {
    background-color: steelblue;
  }
}

.nav {
  background-color: steelblue;
  &__container {
    display: flex;
    justify-content: space-between;
  }
  &__item {
    color: white;
    &--active {
      @extend .nav__item;
      border-bottom: 1px solid red;
    }
  }
}
```

---

#### 自动化测试

- 浏览器测试(e2e)
  - Nightware
- 单元测试
  - Karma
  - Mocha
  - Chai

---

## Q&A

---

## One More Thing

---

## [RubyLouvre/anu](https://github.com/RubyLouvre/anu)

兼容ie6+，react语法
