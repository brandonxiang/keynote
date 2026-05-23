---
title: 前端项目架构设计
talkDate: "2021-11-12"
absoluteUrl: https://keynote.brandonxiang.top/aroom
revealOptions: 
   transition: slide
---

## 前端项目架构设计

brandonxiang（2021.11.12）

---

### 这次想讲清楚什么

- 项目变大以后，前端架构到底在解决什么问题
- 文件目录、模块边界、状态管理、接口层如何配合
- 多仓库、多团队、多应用同时存在时，怎么降低协作成本
- 为什么最后会需要 aroom 这样的工具

---

### 前端架构不是目录命名

很多项目一开始只关心 `components`、`pages`、`utils` 怎么放。

目录当然重要，但它只是结果。真正需要先想清楚的是：

- 业务能力如何拆分
- 依赖关系能不能被约束住
- 改一个需求会影响哪些地方
- 新人能不能快速找到入口
- 构建、测试、发布能不能稳定跑起来

---

### 架构设计的目标

- 降低理解成本：一个模块做什么，不需要翻十几个文件才能猜出来
- 降低修改成本：改 A 不应该顺手把 B、C、D 都带崩
- 降低协作成本：多人并行开发时，冲突和等待要少
- 降低发布成本：能独立验证、独立回滚、独立发布
- 降低长期维护成本：半年后还能看懂当时为什么这么拆

---

### 项目复杂度从哪里来

- 页面越来越多
- 接口越来越多
- 业务状态越来越多
- 组件复用越来越多
- 多端复用越来越多
- 多团队同时改一个项目
- 发布链路和权限控制越来越复杂

---

### 架构设计先看约束

- 团队规模：一个人维护和几十个人维护不是同一种设计
- 业务变化速度：频繁试错的项目，不适合过早抽象
- 发布方式：整体发布、按应用发布、按模块发布，设计会不一样
- 技术栈边界：React、Vue、RN、Web Components 是否要共存
- 历史包袱：老项目迁移通常比新项目设计更难

---

### 文件架构

- MVC
- MVVM
- MVP

---

### 文件架构要表达依赖方向

一个比较稳的前端项目，通常会把这些层次分开：

- page：路由页面，负责组装业务能力
- feature：一组完整业务能力，比如订单、账户、营销
- component：可复用 UI，不直接知道业务流程
- service：接口请求、协议转换、缓存策略
- store：跨页面状态和业务状态
- utils：纯函数工具，不依赖业务上下文

---

### 依赖方向要尽量单向

```text
page -> feature -> component
page -> feature -> service
feature -> store
service -> request client
utils -> no business dependency
```

反过来的依赖越多，项目越难维护。

---

### 不建议这样放

```text
common/
  api/
  components/
  hooks/
  utils/
  constants/
```

所有东西都叫 common，最后 common 会变成第二个业务系统。

---

### 更推荐按业务能力收口

```text
features/
  order/
    pages/
    components/
    services/
    store/
    types.ts
  account/
    pages/
    components/
    services/
    store/
    types.ts
shared/
  components/
  request/
  utils/
```

业务内聚以后，删除、迁移、拆包都会容易很多。

---

### 模块边界怎么判断

- 这个模块有没有明确的业务对象
- 是否能独立开发和测试
- 是否有稳定的输入输出
- 是否经常和其他模块一起改
- 是否有独立发布或复用的可能

如果一个模块永远和另一个模块一起变化，拆开不一定有收益。

---

### 状态管理也要分层

- 服务端状态：接口返回的数据，优先交给 query/cache 工具
- 页面状态：筛选项、弹窗、表单临时状态，放在页面内
- 业务状态：购物车、登录态、权限、流程状态，才需要全局管理
- UI 状态：主题、侧边栏展开、布局偏好，可以单独收口

所有状态都塞进一个全局 store，调试会越来越痛苦。

---

### API 层要做什么

- 统一处理鉴权、错误码、trace id
- 把后端字段转换成前端需要的模型
- 屏蔽接口协议差异，比如 REST、GraphQL、RPC
- 保持接口类型稳定，减少页面直接感知后端变化
- 为 mock、测试、灰度留入口

---

### 组件分层

- 基础组件：Button、Input、Modal，关注交互和视觉一致性
- 业务组件：OrderCard、UserPicker，关注业务对象
- 页面组件：把路由、权限、数据请求、业务组件串起来

基础组件不要直接请求接口，业务组件不要偷偷改全局状态。

---

### 路由设计

- URL 要能表达业务位置
- 路由参数要稳定，避免把临时 UI 状态放进主路径
- 权限校验放在路由边界，不要散落在每个按钮里
- 大页面按路由拆 chunk，减少首屏包体积
- 详情页、编辑页、列表页保持一致的参数设计

---

### 权限设计

权限不要只做页面级控制。

- 路由级：没有权限不能进入页面
- 数据级：接口返回的数据要符合权限范围
- 操作级：按钮、菜单、批量操作需要单独判断
- 审计级：关键操作要能追踪是谁做的

前端权限不能替代后端权限，但前端要负责把体验做清楚。

---

### 质量门禁

- lint 保证基础代码风格
- type check 保证类型契约
- unit test 覆盖纯函数、复杂组件、状态逻辑
- e2e test 覆盖关键业务路径
- build preview 保证每个 MR 都能被访问和验收

架构不是画图，跑不起来的流程没有意义。

---

### 架构演进不要一步到位

老项目很少适合一次性重构。

更稳的方式是：

- 先给新增模块定规则
- 再把高频修改模块迁进去
- 最后处理低频历史模块
- 每一步都保持可构建、可发布、可回滚

---

### 为什么我们需要npm？

---

- 版本回溯
- 多仓库复用
- 单元测试（CICD）
- Merge Request限制Approver

---

### npm 包解决的是复用问题

当组件库、工具函数、请求 SDK、埋点 SDK 被多个项目用到时，复制代码很快会失控。

npm 包至少解决几件事：

- 版本明确
- 变更可追踪
- 发布可回滚
- 依赖关系可被工具识别
- CI 可以验证包是否能被正确安装和构建

---

### npm 包也会带来成本

- 本地联调麻烦
- 发包流程慢
- 版本依赖容易冲突
- 多个项目同时改一个包，等待时间长
- 包边界设计不好，会把业务耦合扩散到所有项目

所以 npm 适合沉淀稳定能力，不适合承载频繁变化的业务细节。

---

### Monorepo vs Multirepo

---

monorepo是大公司不可逃避的问题

https://keynote.brandonxiang.top/monorepo.html

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

#### 什么时候选 Monorepo

- 多个项目共用大量基础包
- 团队能接受统一的工程规范
- 有能力维护统一 CI、缓存、变更检测
- 需要跨项目原子修改
- 包和应用之间依赖关系很强

---

#### 什么时候保留 Multirepo

- 项目之间业务边界很清楚
- 发布节奏完全不同
- 权限隔离要求高
- 团队之间协作较少
- 仓库体积、构建时间已经是明显问题

---

#### 真正的问题不是 mono 还是 multi

真正的问题是本地开发、依赖联调、版本发布和权限控制能不能顺。

如果这些流程没有工具承接，monorepo 会变重，multirepo 会变散。

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

### 我们想要的不是再造一个 monorepo

目标是把多个仓库装进同一个开发空间。

- 代码仍然可以分仓维护
- 本地可以像 monorepo 一样联调
- 发布仍然按原来的仓库和应用分开
- 依赖通过 symlink 指向本地源码
- postInstall 负责补齐构建产物

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

### aroom 的工作方式

- 根据配置拉取多个仓库
- 按 name 或 dir 放到指定目录
- 安装各仓库依赖
- 执行必要的 postInstall
- 在项目之间创建 symlink
- 本地开发时直接使用源码联调

---

#### aroom优点

- 节省了每个人wml时间
- 节省了部署时间
- 节省了调试时间

---

#### aroom 适合解决的问题

- 设计系统和业务项目一起改
- admin、H5、RN 共用一套工具包
- 多个业务项目依赖同一个 SDK
- 微前端项目需要本地联合调试
- 不想把所有仓库强行合并成 monorepo

---

#### aroom 不适合解决的问题

- 包边界本身不清楚
- 项目之间循环依赖严重
- 每个仓库的构建脚本都不稳定
- 团队没有统一 Node/npm/pnpm 版本
- CI 和发布流程完全没有约束

工具只能降低流程成本，不能替代模块设计。

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
- 依赖拓扑分析
- 本地 dev 命令编排
- 仓库健康检查
  
---

#### 未来展望

- aroom替代lerna
- 满足大团队的应用
- 满足去中心RN发布
- 满足微前端web项目发布

---

### 最后回到架构设计

前端项目架构设计可以拆成三层：

- 代码层：目录、模块、状态、接口、组件
- 工程层：构建、测试、发布、质量门禁
- 协作层：仓库组织、依赖联调、权限和流程

aroom 解决的是协作层的一部分。代码层和工程层没有设计好，工具只能让问题暴露得更快。
