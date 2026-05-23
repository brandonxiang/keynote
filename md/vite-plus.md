---
title: Vite+：前端工具链的一次收口
talkDate: "2026-05-23"
description: Vite+ 工具链构想，讨论 vp dev、vp pack、vp test、vp lint、vp fmt、vp env、vp install 以及 Oxc 对 React Fast Refresh 的支持。
absoluteUrl: https://keynote.brandonxiang.top/vite-plus
revealOptions:
   transition: slide
---

## Vite+：前端工具链的一次收口

brandonxiang

2026/5/23

---

### Vite+ 的野心很大

它不是想再做一个 Vite 插件。

它想把前端项目里分散的工具入口，收口成一个 `vp`。

---

### 过去一个前端项目需要多少工具？

- `vite`：开发服务器和应用构建
- `rollup` / `tsup` / `tsdown`：库打包
- `vitest` / `jest`：测试
- `eslint`：代码检查
- `prettier`：代码格式化
- `nvm` / `fnm` / `volta`：Node 版本
- `npm` / `pnpm` / `yarn` / `bun` / `ni`：依赖安装

---

### Vite+ 想把这些变成一个入口

```bash
vp install
vp dev
vp lint
vp fmt
vp test
vp pack
vp env
```

一个命令前缀，覆盖大部分本地开发生命周期。

---

### `vp dev` 就是 Vite

- 启动开发服务器
- 继承 Vite 的插件生态
- 面向 Vite 项目和 Vite 框架
- 让开发入口变成统一的 `vp dev`

---

### 开发阶段的变化

以前团队会写：

```bash
pnpm dev
npm run dev
yarn dev
bun run dev
```

Vite+ 的主张是：

```bash
vp dev
```

---

### 对 React 项目的支持也很关键

React 项目过去绕不开一个问题：

- JSX transform
- React Fast Refresh
- React Compiler

这些能力经常会把 Babel 留在工具链里。

---

### React Fast Refresh 过去依赖 Babel

很多 Vite React 项目里，Fast Refresh 不是纯粹的 Vite 能力。

它背后还有 Babel transform。

```text
React source -> Babel transform -> Fast Refresh -> browser
```

这让开发链路多了一层编译成本。

---

### Oxc 可以接管 Fast Refresh

Vite+ 如果沿着 Oxc / Rolldown 路线推进，React Refresh transform 可以交给 Oxc。

```text
React source -> Oxc transform -> Fast Refresh -> browser
```

这意味着 React 项目不再必须为了 Fast Refresh 保留 Babel。

---

### 去掉 Babel 的收益

如果项目没有使用 React 19 Compiler：

- Fast Refresh 可以走 Oxc
- JSX transform 可以走 Oxc
- Babel 依赖可以从默认链路里移除
- 冷启动和热更新都少一层 transform

对大型 React 项目来说，速度有机会再快一倍以上。

---

### 但 React Compiler 是边界

如果你要用 React 19 Compiler，当前仍然需要 Babel 相关桥接。

这时不能简单说“完全去掉 Babel”。

更准确的判断是：

```text
不用 React Compiler -> 可以移除 Babel
使用 React Compiler -> 仍需要 Babel bridge
```

---

### `vp pack` 替代手写库打包入口

过去做 npm 包，经常要单独配置：

- Rollup
- tsup
- tsdown
- unbuild
- 自定义 build script

`vp pack` 想把库打包和独立产物打包统一进 Vite+ 配置。

---

### 这里的重点不是“换一个 bundler”

更关键的是：

- 入口统一
- 配置统一
- 输出约定统一
- monorepo 里的包构建方式统一

工具本身可以演进，命令入口尽量稳定。

---

### `vp test` 是 Vitest 的进一步收口

过去测试迁移路径大概是：

```bash
jest -> vitest -> vp test
```

Vite+ 把测试入口也收进 `vp`，并围绕 Vite 生态提供默认约定。

---

### 为什么会替代 Jest？

不是因为 Jest 不能用。

而是现代前端项目已经越来越依赖：

- ESM
- TypeScript
- Vite 插件
- 浏览器环境测试
- 与 dev/build 一致的解析链路

Vitest 比 Jest 更贴近这条链路。

---

### `vp lint` 替代 ESLint 的一部分职责

Vite+ 的 lint 方向不是继续堆 ESLint 配置。

它更像是把检查能力收口到更快的 Oxc / Oxlint 体系里。

---

### 这会改变团队的 lint 心智

过去的问题是：

- ESLint 规则太多
- 插件组合复杂
- TypeScript 项目检查慢
- 和 formatter 边界不清

`vp lint` 的目标是让默认检查更快、更少配置、更容易统一。

---

### `vp fmt` 替代 Prettier 的入口

格式化的核心价值不是“可配置”。

而是团队不再为格式争论。

```bash
vp fmt
```

Vite+ 把格式化入口放进同一套工具链，让检查和格式化一起成为项目默认能力。

---

### `vp check` 是更像团队日常用的命令

单独命令适合定位问题：

```bash
vp lint
vp fmt
vp test
```

团队日常更可能需要：

```bash
vp check
```

一次跑完格式、lint、类型检查等验证动作。

---

### `vp env` 替代 nvm 这类版本管理器

Node 版本以前经常分散在：

- `.nvmrc`
- `.node-version`
- Volta 配置
- CI 配置
- 本机 shell 初始化脚本

`vp env` 想让 Node 版本也归到前端工具链里。

---

### 版本管理的收益

- 新人拉项目后少配一层环境
- CI 和本地更容易对齐
- monorepo 不同目录可以 pin 版本
- `node`、`npm` 等命令可以通过 shim 解析到正确版本

这已经不只是构建工具，而是在接管开发环境。

---

### `vp install` 替代 ni 和包管理器切换

`ni` 解决的是一个很实际的问题：

这个项目到底该用 npm、pnpm、yarn 还是 bun？

Vite+ 直接把这个问题收进：

```bash
vp install
vp add
vp remove
vp update
```

---

### 包管理入口统一以后

开发者不再需要记：

```bash
npm install
pnpm install
yarn install
bun install
```

只需要记：

```bash
vp install
```

具体用哪个包管理器，由项目约定和 lockfile 决定。

---

### Vite+ 真正在替代什么？

不是替代某一个工具。

而是替代“每个项目重新拼一套工具链”的过程。

---

### 从工具集合到工具平台

过去是：

```text
Vite + Vitest + ESLint + Prettier + Rollup + nvm + pnpm
```

现在 Vite+ 想变成：

```text
vp
```

它把前端工程从“选择很多工具”推向“选择一套平台”。

---

### 好处很直接

- 新项目启动更快
- React 项目可以少一层 Babel transform
- 老项目迁移后命令更统一
- 团队文档更少
- CI 脚本更短
- 工具版本更容易治理
- monorepo 的任务编排更自然

---

### 代价也很明显

- 对 `vp` 的依赖会变重
- 工具链升级影响面更大
- 个别工具的深度配置能力可能受限
- 团队需要接受 Vite+ 的默认约定
- 生态成熟度还需要时间验证

统一入口不是没有成本。

---

### 什么时候适合试？

- 新 Vite 项目
- 内部工具项目
- 中小型前端应用
- 希望统一命令规范的团队
- 已经在用 Vitest / pnpm / Vite 的项目

迁移成本会相对可控。

---

### 什么时候要谨慎？

- 极复杂的 legacy 项目
- 严重依赖自定义 ESLint 插件
- Rollup 配置非常深
- CI/CD 已经高度定制
- 对工具链稳定性要求极高

这种场景适合先做试点，不适合一刀切。

---

### 我的判断

Vite+ 的方向不是“小优化”。

它是在把前端工程化里最分散、最重复、最容易吵架的部分统一掉。

如果它能跑通，前端项目的默认工具链会被重新定义。


---

### 参考

- [Vite+ 官网](https://viteplus.dev/)
- [Vite+ Getting Started](https://viteplus.dev/guide/)
- [Vite+ Environment](https://viteplus.dev/guide/env)
- [Vite+ Installing Dependencies](https://viteplus.dev/guide/install)
- [Vite+ Migration Guide](https://viteplus.dev/guide/migrate)
- [Vite React Plugin](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
- [Vite Plugin React Oxc](https://www.npmjs.com/package/@vitejs/plugin-react-oxc)
