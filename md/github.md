### 如何开展一个开源项目
项伟平 [BLOG](https://brandonxiang.vercel.app/)

2021年4月17日

----

To A Dreamer

----

https://github.com/brandonxiang

----

- [@yyx990803](https://github.com/yyx990803) vue/vite
- [@Rich-Harris](https://github.com/Rich-Harris) svelte/rollup
- [@developit](https://github.com/developit) preact/htm
- [@lukeed](https://github.com/lukeed) polka/pwa
- [@antfu](https://github.com/antfu) vueuse/vitesse/wenyan
- [@octref](https://github.com/octref) vetur/vscode
- [@egoist](https://github.com/egoist) saber/poi/rollup-plugin-esbuild
- [@shuding](https://github.com/shuding) swr/nextra


----

### 1 关于开源项目
- github
- gitee


----
#### 1.1 界定开源项目还是内部项目

----

<font size="6">

| 开源项目       | 内部项目（或内部开源）  |
| ------------- | -------------     |
| 与公司业务无关 | 与公司业务有关 |
| 原子化，容易复用 | 通用项目，方便接入 |
| 注意敏感信息 | 配置相关变量，区分业务线，可介入 |
| 代码抽象要求高 | 通用性和兼容性要求高 |
| 单测要求高 | 单测视具体情况定，集成测试要求高 |

</font>

----

- 开源代码要有很强的代码抽象能力
- 开源代码要注意脱敏信息

----

#### 黑客技巧（git commit 搜索）

- 每一个提交都会被github记录
- 可能被人用api暴力查询
- 敏感信息gitignore

----

#### 1.2 界定有价值的开源项目（以下不是）
- 博客
- cheatlist（awesomelist）
- 热度demo
- 仿写demo

----

#### 1.2 界定有价值的开源项目（以下是）

- 能被引用的npm库
- 工具或者cli
- 框架的插件
- 框架

----

### 2 开始自己的开源项目

----

#### 2.1 一个开源项目是如何诞生
- 开源项目解决什么已有问题
- 受到其他开源项目的inspire
- 开源项目的应用场景
- 名字要考虑到SEO以及推广

----

#### 2.2 写好项目 Readme

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [开源证书](https://choosealicense.com/licenses/mit/#suggest-this-license)
- [Github 徽章](https://shields.io/)

----

#### 2.3 License

![](https://keynote.vercel.app/assets/license.png)

----

#### 2.4 Roadmap

- 让别人知道你计划做什么
- 让别人知道你什么已经完成

----

#### 2.5 github action

- github pages（demo页或者官网）
- lint（语法检查）
- ci（自动化测试）
- create release（创建一个发布）

----

```yml
# https://github.com/brandonxiang/online-bundler/blob/master/.github/workflows/main.yml
name: github-pages

on: push

jobs:
  pages:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2.1.2
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - run: npm ci
      - run: npm run build

      - name: GitHub Pages action
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

----

#### 2.6 github page

- demo
- 文档（[vuepress](vuepress)、[docusaurus](https://docusaurus.io/)）

----

### 2.7 github project

![](https://keynote.vercel.app/assets/github-project.png)

----

### 3 参与别人的开源项目

----
#### 3.1 提出问题issue

- issue模版（标签）
- issue代码复现（codesandbox）
- issue讨论跟进
- pull request关联issue

----

#### 3.2 给别人提供collaborate

- 针对某个issue提出解决方案
- 针对某个issue提出pull request
- 提出关于issue的单元测试以及用例说明

----

#### 3.3 提交一个Pull Request

1. fork一份代码
2. 修改代码（和单测用例）
3. 发起Pull Request
4. 被开源维护者Review（CI）
5. 修改代码
6. 合并PR

----

#### 3.4 sponsor和backer的区别

- backer 定期赞助（一般是个人，量级较少）
- sponsor 长期赞助的个人或组织

----

#### 开源项目的意义

----

是一种自我价值的体现。当代码能够被别人复用时候的自我满足感。
