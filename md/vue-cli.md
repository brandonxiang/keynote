## Vue-Cli3.0[官方文档](https://cli.vuejs.org/zh/)

项伟平

2018年10月13日

----

##1 回顾Vue-cli2.9.6

#### Vue和Webpack的框架

```shell
npm install -g vue-cli
vue init webpack .
```

----

### 问题一

- webpack.base.config.js
- webpack.dev.config.js
- webpack.prod.config.js
- <font color=#FF0000>webpack.test.config.js</font>

----

### 问题二

webpack的*loader*和*plugin*的区别

----

##2 Vue-cli3.0的入门

## 2.1 安装

要求使用node8.0以上

```shell
npm install -g @vue/cli
vue create .
```
----
##2.1 兼容2.0模版

```shell
npm install -g @vue/cli-init
vue init webpack .
```

----

## 2.2 插件

Vue CLI 使用了一套基于插件的架构。如果你查阅一个新创建项目的 package.json，就会发现依赖都是以 `@vue/cli-plugin-` 开头的。

- 便于扩展
- 解耦
- 易安装

----

## 2.3 配置

以前框架
- webpack.config.js
- babel.config.js
- postcssrc.js
- eslintrc.js

新框架
- vue.config.js

----

## 2.4 vue-ui

----

## 3 case study

----

## 4 总结

- 对比vue-cli3和2
- Vue-cli3.0入门
  - 安装
  - 兼容2.0模版
  - 插件
  - 配置
  - vue-ui
- case study


