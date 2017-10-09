## Vue开发规范

项伟平

2017年10月12日

----

#### 目录

- 历史问题
- 整体介绍
- Vue规范
- Html规范
- Javascript规范
- Css规范
- 自动化测试

----

### 历史问题

1. 双层路由的问题
2. vuex结构的问题
3. 单页面的内存问题

----

#### 双层路由的问题

> vue-router的路由管理存在双层路由的情况，在懒加载打包的时候可能会出现多余打包

![旧新路由module内项目结构](../img/router.jpg)

----

#### vuex结构的问题

> vuex的结构更多是一对一的情况，并且是以名字关联，写法相对死板

![vue与vuex之间的关系](../img/vue-architecture.png)

----

### 整体介绍

- 多个页面
- DLL分包
- 按需打包
- EJS模版
- 模拟数据
- 服务端渲染

----

### 多个页面

多页面的打包主要是js入口变成多个以及html入口变成多个

在新框架中国使用的是 [mutualofomaha/multipage-webpack-plugin](https://github.com/mutualofomaha/multipage-webpack-plugin)，它是最近推出的, 这帮助你实现多页面打包的工具，对 [CommonsChunkPlugin](https://github.com/webpack/webpack) 和 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 的再一次封装，可以方便你完成对manifest，公共包和html-webpack-plugin的配置，减少了很多配置上的麻烦

```
vue init 
```


----

### DLL打包

##### 只需要修改一下`webpack.dll.config.js`的entry，添加你要打包的库名。

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

----

#### 按需打包

> 一个问题会出现--你发布到生产环境的只是其中几个项目，而不是所有项目”。


**打包黑名单**

```javascript
blackList: ['project1', 'project2', 'project3']
```

**指定项目打包**

```shell
npm run build project1 project2
```

----

#### Vue 规范

[强制] Vue对象包括很多属性和方法，按一定书写顺序保证代码可维护性

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

----

[强制] 组件props属性需要进行类型强校验（适当default，required）

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

#### [强制] 公共组件应该排除掉vuex的内容

#### [强制] GET请求尽量写在页面级别的组件内

----

#### [建议] vuex的目录结构按照分开的目录

- actions.js
- getters.js
- index.js
- mutations-types.js
- mutations.js

![Vuex单向数据流](./img/vuex.png)

----

## One More Thing

----
