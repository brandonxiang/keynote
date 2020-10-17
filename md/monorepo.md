
## monorepo研发流程


----

### 前端框架越来越多，复用代码麻烦?

----


- REPO 风格之争：MONO VS MULTI
- 什么是monorepo


----

### 我们的git repo属于哪一种模式？

----

#### 我们的现状属于multi repo，每个repo有着独立的仓库。项目仓库很多，不利于管理，需要文档来管理多个repo

----

#### multirepo

- 每个子项目拥有自己repo
- 能促使各个团队尽可能的提升自己的效率
- 但是每个repo需要的独立的git分支机制
- 冗余代码难以管理

----

#### monorepo

- 每个子项目拥有统一规范
- 集体构建，集体单测，集体发布，统一版本
- 合并多个git的repo，统一的分支机制
- 在保证解耦的同时，复用代码

----

### monorepo的几种实现

- lerna（用于写依赖性极强的库）
- yarn workspace（用于monorepo依赖安装）


----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/img/lerna-multiwebpack.png" data-background-size="contain" -->

----

### 技术项目的monorepo

- packages # 依赖代码
- server # 服务端代码
- web # admin portal代码

----

```
zeb-utils／
  - __test__/ 单元测试
  - dist/ 编译代码包括commonjs，esm
  - lib/ 项目代码
  - src/ 原代码
  - .eslintrc
  - index.js 入口文件
  - package.json 
  - readme.md 介绍文件
```

----

#### lerna 命令


```
lerna clean # 清除依赖
lerna bootstrap # 安装依赖
lerna publish # 统一发布
lerna create <name> [loc] # 创建一个repo
lerna run test --scope project2 # 执行project2的test命令
# 其他参考文档 https://github.com/lerna/lerna
```

----

#### yarn workspace命令

```
yarn # 安装依赖
yarn workspaces info # 查看包信息
yarn workspace project2 run test # 执行project2的test命令
arn workspace project1 add lodash.debounce 
# 给projec1安装lodash.debbounce
```

----

### 前端依赖的构建打包

- [bili]()
- [microbundle]()
- [rollup]()

----

#### bili

```
# bili是零配置的Rollup打包框架。
bili index.js --format cjs,esm
```

----

### 以有仓库迁移到monorepo

```
git subtree add --prefix=server http://...
git subtree pull --prefix=server http://...
```

----

## Q&A

----

