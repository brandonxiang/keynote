## 微前端与Web Components

项伟平

2019年4月2日

----


## 微前端

2016年[thoughtworks](https://www.thoughtworks.com/radar/techniques/micro-frontends)提出微前端的概念。

----

<img src="./copy-img/monolith.png" alt="单一前端" width="60%">
<img src="./copy-img/microfrontend.png" alt="微前端" width="60%">

----

## 什么是微服务？

微服务最早由[Martin Fowler](https://martinfowler.com/)与James Lewis于2014年共同提出，微服务架构风格是一种使用一套小服务来开发单个应用的方式途径，每个服务运行在自己的进程中，并使用轻量级机制通信，通常是HTTP API，这些服务基于业务能力构建，并能够通过自动化部署机制来独立部署，这些服务使用不同的编程语言实现，以及不同数据存储技术，并保持最低限度的集中式管理。

----

## 单体架构的缺点

1. 复杂性逐渐变高
2. 技术债务逐渐上升
3. 部署速度逐渐变慢
4. 阻碍技术创新
5. 无法按需伸缩


----

## 微前端的目标

- 独立部署
- 独立开发
- 技术无关
- 不影响用户体验

----

## 实现微前端的几种方式

- 通过组合多个独立应用组件来构建一个单体应用
- 使用 HTTP 服务器的路由来重定向多个应用
- 在不同的框架之上设计通讯、加载机制，诸如 Mooa 和 Single-SPA，iFrame
- 使用 Web Components 构建应用

[参考：（phodal）微前端的那些事儿](https://github.com/phodal/microfrontends)

----

## 什么是Web Components？

----

## 前端框架

- Angular
- React
- Vue

----

### Web Components相关前端框架

- [stencil](https://stenciljs.com/)
- [polymer](https://www.polymer-project.org/)

----

### Web Components

- Custom Elements 定义新HTML元素的一系列API
- Shadow DOM 组合对DOM和样式的封装
- HTML Templates HTML内的DOM模板
- CSS changes 样式作用域
- HTML Imports 定义在文档中导入其他HTML文档的方式(已弃用)

----

##### Shadow DOM 和Virtual DOM有什么区别？

----

### Web Components 生命周期

- connectedCallback 
   - 每当元素插入 DOM 时被触发。
- disconnectedCallback 
   - 每当元素从 DOM 中移除时被触发。
- attributeChangedCallback
   - 当元素上的属性被添加、移除、更新或取代时被触发。

----

<!-- .slide: data-background="white" data-background-image="./copy-img/wc.png" data-background-size="contain" -->

----

<!-- .slide: data-background="white" data-background-image="./copy-img/vue-wc.png" data-background-size="contain" -->

----

### 如果考虑兼容性呢？

----

<!-- .slide: data-background="white" data-background-image="./copy-img/microFrontendSample.png" data-background-size="contain" -->


----

##### 子系统分发（图片来自phodal）

<img src="./copy-img/mooa.jpg" width="60%">

----

#### portal项目

- 用户登录机制
- 菜单权限获取
- 全局异常处理
- 路由管理（懒加载）
- 目录配置

----

#### 子项目

- 单页面内跳转
- 单页面外跳转
- 非单页面的跳转

----

## 参考

- [实施微前端的六种方式](https://juejin.im/post/5b45d0ea6fb9a04fa42f9f1a)
- [用微前端的方式搭建类单页应用](https://tech.meituan.com/fe_tiny_spa.html)



