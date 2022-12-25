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

MSS admin项目

- partner目录（旧）
- merchant-refactor（新）
- store-refactor（新）
- merchant-host-refactor（新）

---

没人敢删除代码，不清楚历史背景

- 注释代码
- 新增变量、方法
- 新增文件、组件

---

#### 手段一 eslint unused 提示

no-unused-vars 红线报错

---

### 手段二 语法分析工具直接删除文件

ts-unused-exports 通过ts语法分析知道代码中没有用的export

----

ts-unused-exports的不足是它的粒度细到exports。

我的诉求是希望能把所有export都没使用的文件直接删除

----

<!-- .slide: data-background="white" data-background-image="https://keynote.brandon.top/public/img/pr-ts-unused.png" data-background-size="contain" -->

---

### 步骤三 分析部分export没用的文件

调整文件的文件，将依赖尽量合理化

---