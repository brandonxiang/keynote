---
title: nodejs包管理器的前世今生
revealOptions: 
   transition: slide
---

### nodejs包管理器的前世今生

项伟平（2023.1.31）

---

- npm
- yarn
- yarn berry 2/3
- pnpm
- bun（野心很大，js runtime）

---

早期的 yarn 比早期的 npm 快在哪？

---

- 确定性: 通过yarn.lock等机制，此时的npm v5之前,并没有package-lock.json机制
- 采用模块扁平化的安装模式：归结为单个版本，以避免创建多个版本造成工程的冗余
- 采用缓存机制,实现了离线模式 (目前的npm也有类似的实现)

---

- **pnpm的快**是建立在软连接（ln）
- 全局只有一份真实代码在.pnpm_store
- 第二次安装效率非常高
- 复杂仓库节省依赖和依赖间的安装效率

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/pnpm-history.jpeg" data-background-size="contain" -->

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/pnpm-store.jpeg" data-background-size="contain" -->

---

pnpm 和 yarn berry官方支持patch

---

pnpm的缺点：

- 每个人的pnpm_store是独立的，第一次还是慢
- 如果你想改node_modules里面的代码，这会造成污染
- 软链接造成的困扰，不是所有npm包都兼容软链接（迁移成本）
- 特别对React Native/Node Grpc（跨语言Native）不友好

---

关键点在对 React Native/Node Grpc 不友好

---

## [yarn berry 3](https://yarnpkg.com/)

- Offline Cache(Zero-Installs)
- Workspaces
- Plug'n'Play
- Plugins

---

- 节省开发者之间的时间
- 节省CI时间
- 节省CD时间
- 节省monorepo安装时间

---

yarn（npm） vs pnpm

---

yarn berry 3 更适合前端工程化诉求

---

- [nypm](https://github.com/unjs/nypm)
- [antfu/ni](https://github.com/antfu/ni)
