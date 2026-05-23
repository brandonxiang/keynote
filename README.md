<p align="center">
  <img src="./public/img/keynote.jpeg" alt="Keynote logo" width="160">
</p>

# Keynote

<a href="https://github.com/brandonxiang/keynote/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/brandonxiang/keynote" alt="license">
</a>

Brandon Xiang 的技术分享归档站，主要覆盖前端工程、架构设计、构建工具、测试、PWA、微前端和研发效率等主题。

在线访问：[keynote.brandonxiang.top](https://keynote.brandonxiang.top)

## 项目结构

- `md/`：每份分享的 Markdown 源文件，顶层 `md/*.md` 会生成同名 HTML 页面。
- `public/img/`：演示文稿引用的图片资源。
- `components/`：站点外层用到的 Svelte 自定义元素。
- `templates/`：`reveal-md` 的页面模板，包括演示页和首页列表页。
- `styles/`：全局演示样式。
- `scripts/`：运行时脚本和 Svelte 构建产物入口。
- `dist/`：静态构建产物，由构建命令生成，不手动编辑。

## 技术栈

- `reveal-md` 将 `md/` 下的 Markdown 渲染为 reveal.js 演示页面。
- `svelteup` 打包 Svelte custom element，入口是 `components/index.js`。
- `Workbox` 生成 Service Worker，为页面和图片提供离线缓存能力。

## 本地开发

```sh
pnpm install
pnpm run dev
```

`pnpm run dev` 会同时启动 Svelte 组件监听和 `reveal-md` 预览。只调试其中一部分时可以单独运行：

```sh
pnpm run dev:svelte
pnpm run dev:reveal
```

## 构建

```sh
pnpm run build
```

完整构建会依次执行：

1. `pnpm run build:svelte`：打包 Svelte 自定义元素到 `scripts/dist/`。
2. `pnpm run build:reveal`：把 `md/` 生成到 `dist/`。
3. `pnpm run sw`：根据 `workbox-config.js` 写入 `dist/sw.js`。

提交前请至少运行 `pnpm run build`。

## 分享目录

| 日期 | 主题 | 链接 |
| --- | --- | --- |
| 2026-05-23 | Vite+：前端工具链的一次收口 | [查看演示](https://keynote.brandonxiang.top/vite-plus) |
| 2023-02-10 | 微服务实战之BFF云端一体开发 | [查看演示](https://keynote.brandonxiang.top/bff) |
| 2023-02-10 | nodejs服务的技术运维实践 | [查看演示](https://keynote.brandonxiang.top/devops) |
| 2023-01-31 | nodejs包管理器的前世今生 | [查看演示](https://keynote.brandonxiang.top/package-manager) |
| 2023-01-06 | 如何清除项目中没用代码 | [查看演示](https://keynote.brandonxiang.top/remove-unused-files) |
| 2022-08-03 | 前端测试左移 | [查看演示](https://keynote.brandonxiang.top/shift-left-testing) |
| 2022-01-07 | 如何做好一个技术分享、技术方案、答辩 | [查看演示](https://keynote.brandonxiang.top/speech) |
| 2021-11-12 | 前端项目架构设计 | [查看演示](https://keynote.brandonxiang.top/aroom) |
| 2021-08-06 | 学习前端的方法 | [查看演示](https://keynote.brandonxiang.top/how-to-learn-fe) |
| 2021-06-12 | 使用Next.js实现优雅降级 | [查看演示](https://keynote.brandonxiang.top/nextjs-fallback) |
| 2021-02-19 | 如何参与开源项目 | [查看演示](https://keynote.brandonxiang.top/github) |
| 2020-11-13 | Incremental Static Regeneration | [查看演示](https://keynote.brandonxiang.top/isr) |
| 2020-10-17 | monorepo研发流程 | [查看演示](https://keynote.brandonxiang.top/monorepo) |
| 2020-08-14 | ESM Import & Bundle Free | [查看演示](https://keynote.brandonxiang.top/bundle-free) |
| 2019-08-12 | svelte 入门 | [查看演示](https://keynote.brandonxiang.top/svelte) |
| 2019-05-28 | react-navigation和expo的应用 | [查看演示](https://keynote.brandonxiang.top/expo) |
| 2018-11-01 | 微前端与Web Components | [查看演示](https://keynote.brandonxiang.top/microfrontend) |
| 2018-10-06 | PWA 开发实战 | [查看演示](https://keynote.brandonxiang.top/pwa) |
| 2018-09-15 | Vue-Cli3.0 | [查看演示](https://keynote.brandonxiang.top/vue-cli) |
| 2018-09-05 | 小程序开发实战 | [查看演示](https://keynote.brandonxiang.top/weapp) |
| 2017-11-07 | Vue单元测试 | [查看演示](https://keynote.brandonxiang.top/vue-test) |
| 2017-10-10 | Vue开发规范 | [查看演示](https://keynote.brandonxiang.top/vue-specification) |
| 2017-05-02 | Vue技术选型与Webpack入门 | [查看演示](https://keynote.brandonxiang.top/vue-startup) |

## 新增分享

1. 在 `md/` 新增 Markdown 文件，文件名会决定生成后的页面地址。
2. 在 frontmatter 中写入 `title`、`talkDate: YYYY-MM-DD`、`description` 和无 `.html` 的 `absoluteUrl`。
3. 图片放到 `public/img/`，优先复用已有资源。
4. 在 README 的分享目录补充日期、标题和 clean URL 链接。
5. 运行 `pnpm run build`，确认 `dist/index.html` 首页列表包含新增分享，并检查 `dist/robots.txt` 与 `dist/sitemap.xml` 已更新。

## SEO

SEO 规则和 Search Console 后续检查记录在 [docs/seo-plan.md](./docs/seo-plan.md)。

## License

[MIT](./LICENSE)
