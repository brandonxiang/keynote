---
title: 如何清除项目中没用代码
revealOptions: 
   transition: slide
---

### 如何清除项目中没用代码

项伟平（2022.08.03）

---

#### 业务仓库代码臃肿是一个普遍的现象

- 需求是分批提过来
- 小改动居多
- 前人的历史债务
- 代码所有者离职

---

清除代码 VS treeshaking？

----

- **treeshaking** 打包的时候通过语法树剔除没用的代码（原代码还在）
- **清除代码** 删除没用的代码让项目变得清爽，提高研发效率

---

- byteforce codes handed over from supplier:
  - over 40w+ lines of code
  - many files are unused
  - many export functions and definitions are unused
- these lead to:
  - hard for new comer to familiar with projects
  - hard to locate bugs
  - time killer to ignore useless code every time

---

MSS admin项目

- partner目录（旧）
- merchant-refactor（新）
- store-refactor（新）
- merchant-host-refactor（新）

![mss](https://keynote.brandonxiang.top/public/img/mss-refactor.png)

---

没人敢删除代码因为不清楚历史背景

- 注释代码
- 新增变量、方法
- 新增文件、组件

---

没用的**类型定义**、**exports**和**文件**

---

方案选型

1. webpack（影响打包效率）
2. ts语法树（轻量，完整语法树，类型清除）
3. eslint（协助，提示作用）

---

### 手段一 eslint unused 提示

- no-unused-vars 红线报错
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)

---

### 手段二 语法分析工具直接删除文件

ts-unused-exports 通过ts语法分析知道代码中没有用的export

----

ts-unused-exports的不足是它的粒度细到exports。

我的诉求是希望能把所有export都没使用的文件直接删除。

https://github.com/pzavolinsky/ts-unused-exports/pull/256

----

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/pr-ts-unused.png" data-background-size="contain" -->

----

[source code](https://github.com/pzavolinsky/ts-unused-exports/pull/256/files#diff-cb8f615ef552da084bbd9c8e4006ba57e4aa39f49d91d51ace2c65b92c922667L208)

---
### 步骤三 分析部分export没用的文件

调整文件的文件，将依赖尽量合理化（需要人工）

----

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/rearrange.png" data-background-size="contain" -->
