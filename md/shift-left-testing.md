---
title: 前端测试左移
revealOptions: 
   transition: slide
---

### 前端测试左移

项伟平（2022.08.03）

---

什么是测试左移？

---

测试左移并不是全新的测试方法，而且已经出现了很久了

早在 2001 年，Larry Smith 就在他文章《Shift-Left Testing》中就提出了测试左移的概念和相应的实践

---

测试左移最主要的方法就是将所有测试相关的工作左移到研发过程中的某些阶段里面去，比如将单元测试左移到编写代码的过程中，将用户验收功能测试相关的一些工作左移到用户需求分析和设计的阶段去做等

---

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/public/img/shift-left-testing.webp" data-background-size="contain" -->

---

避免rework（返工），浪费在人力沟通

---

能力模型：
- 测试分析与测试设计（有测试概念）
- 代码可测试性（纯函数，输入/输出明显）
- TDD（Test-Driven Development）

---

UTDD：在代码层次，在编码之前写测试脚本，可以称为单元测试驱动开发（Unit Test Driven Development）
ATDD：在业务层次，在需求分析时就确定需求（如用户故事）的验收标准，即验收测试驱动开发（Acceptance Test DrivenDevelopment）

---

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/public/img/atdd-utdd.png" data-background-size="contain" -->

---

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/public/img/utdd.png" data-background-size="contain" -->

---

免测不代表不测试(没有涉及资损)（UI/埋点）需要leader评估

---

- 普通需求 自测 + show case
- 免测 自测 + 交叉测试 + show case
- 大需求 自测 + 交叉测试 + show case
- 核心库/核心代码 单元测试 + 集成测试
- P0用例 UI自动化测试

---

### 程序员能力

- 需求合理敏感度
- 测试case意识
- 代码抽象能力
- 代码可维护性能力（接手别人代码）
- 排查问题的能力

---

- 第一阶段把自测做好，dev要有测试case意识能力
- 第二阶段参与UI自动化测试和单元测试
- 第三阶段追求覆盖率（插桩）

---

如何学习编写单元测试？（input/expect/fixture）

https://github.com/rollup/rollup/tree/master/test
https://github.com/sveltejs/svelte/tree/master/test

---

## Q&A
