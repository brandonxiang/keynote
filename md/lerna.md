
## lerna 多框架打包


----

### 前端框架越来越多，复用代码麻烦?

----


- REPO 风格之争：MONO VS MULTI
- 什么是monorepo


----


- multirepo的角度来看，每个子项目拥有自己repo
- 多元化能促使各个团队尽可能的提升自己的效率
- 但是每个repo需要的独立的git分支机制
- 冗余代码难以管理

----

- monorepo的角度来看，每个子项目拥有统一规范
- 集体构建，集体单测，集体发布，统一版本
- 合并多个git的repo，统一的分支机制
- 在保证解耦的同时，复用代码

----

<!-- .slide: data-background="white" data-background-image="https://brandonxiang.github.io/keynote/img/lerna-multiwebpack.png" data-background-size="contain" -->

----

```
zeb-utils／
  - __test__/ 单元测试
  - dist/ 编译代码包括commonjs，esm
  - lib/ 项目代码
  - .eslintrc 
  - index.js 入口文件
  - package.json 
  - readme.md 介绍文件
```
----

#### bili

bili是零配置的Rollup打包框架。

```
bili index.js --format cjs,esm
```

----

#### lerna 命令


```
lerna bootstrap # 安装依赖
lerna publish
lerna 
```

----

