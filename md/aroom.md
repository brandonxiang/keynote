---
title: 前端项目架构设计
revealOptions: 
   transition: slide
---

## 前端项目架构设计

项伟平（2021.11.12）

---

### 文件架构

- MVC
- MVVM
- MVP

---

### 为什么我们需要npm？

---

- 版本回溯
- 多仓库复用
- 单元测试（CICD）
- Merge Request限制Approver

---

### Monorepo vs Multirepo

---

monorepo是大公司不可逃避的问题

https://keynote.brandon.top/monorepo.html

---

#### Monorepo 优点

- 单个的lint，build，test和release流程
- 不用到处找项目的repo
- 方便管理版本和依赖管理
- 跨项目的操作和修改很容易
- 方便统一生成 ChangeLog

---

#### Monorepo 缺点

- repo 体积变大
- 部署的时候，仓库会有没用的文件
- git变慢，分支会很多，挑战工具的极限

---

#### Multirepo的缺点

- 仓库很多，调试不方便
- npm发包不方便

---

#### 如何提高npm的开发效率

- wml
- yalc

不太方便，每个人重复工作

---

#### 提高npm开发的主动性

- CICD自动化发包
- aroom（暂不开源）

---

aroom means "one room".

---

We want to create a tool instead of lerna. 

We like monorepo, but also we hate monorepo.

---

Someone wants to use monorepo. Somebody wants to use multi repo. 

We just want to install all the repo together, and create symlink. 

Therefore, we develop together, while deploying them seperately.

---

#### aroom优点

- 节省了每个人wml时间
- 节省了部署时间
- 节省了调试时间

---
<!-- .slide: data-auto-animate -->

<h2 data-id="code-title">Even Prettier Animations</h2>
<pre data-id="code-animation"><code class="hljs" data-trim data-line-numbers="|3-6|7-11|25-30|">
module.exports = {
    workspaces: [
      {
        name: 'apc-pc-web',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/apc-vn-pc-web.git',
      },
      {
        name: 'sg-design',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/sg-design.git',
        postInstall: 'npm run build-dist'
      },
      {
        name: 'apc-admin',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/apc-admin-website-th.git',
      },
      {
        name: 'mitra-admin',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/apc-rc-admin-website.git',
      },
      {
        name: 'apc-admin-utils',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/apc-admin-utils.git',
        postInstall: 'npm run build'
      },
      {
        name: 'mitra-rn-tool',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/react-native/mitra-rn-tool.git',
        type: 'lerna',
        postInstall: 'npm run bootstrap'
      },
      {
        name: 'rn-mitra',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/react-native/mitra.git',
      },
      {
        name: 'rn-promotion',
        git: 'gitlab@git.garena.com:shopee/loan-service/airpay_frontend/mitra/react-native/promotion.git'
      }
    ],
  };
</code></pre>

---

- npmClient means npm client, default yarn
- workspaces
  - **name** means folder name
  - **dir** means folder path
  - **git** means git repo SSH
  - **postInstall** means the script runs after installing

---

#### 未来要做的事情

- 对pnpm更好的支持
- run命令
- publish命令
  
---

#### 未来展望

- aroom替代lerna
- 满足大团队的应用
- 满足去中心RN发布
- 满足微前端web项目发布