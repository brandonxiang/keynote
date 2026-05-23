# 🎤 Keynote

<a href="https://github.com/brandonxiang/keynote/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/brandonxiang/keynote" alt="license">
</a>

一个面向前端工程实践的技术分享仓库，使用 [reveal.js](https://github.com/hakimel/reveal.js) 与 [reveal-md](https://github.com/webpro/reveal-md) 构建、发布和归档演示文稿。

🌐 在线访问：[keynote.brandonxiang.top](https://keynote.brandonxiang.top)

## ✨ 特性

- 🧭 **集中归档**：将前端工程、架构、测试、构建和开源协作主题统一整理为可访问的 HTML 演示。
- 🧩 **Markdown 驱动**：每份分享都以 `md/` 下的 Markdown 文件维护，便于持续更新与版本追踪。
- 🎨 **自定义品牌层**：通过 Svelte 自定义导航与 HTML 模板扩展站点体验。
- ⚡ **静态发布友好**：构建产物可直接部署到静态站点服务。

## 📚 分享目录

| 主题 | 链接 |
| --- | --- |
| Vue 技术选型与 Webpack 入门 | [查看演示](https://keynote.brandonxiang.top/vue-startup.html) |
| Vue 开发规范 | [查看演示](https://keynote.brandonxiang.top/vue-specification.html) |
| Vue 单元测试 | [查看演示](https://keynote.brandonxiang.top/vue-test.html) |
| Vue CLI 3.0 | [查看演示](https://keynote.brandonxiang.top/vue-cli.html) |
| PWA 开发实战 | [查看演示](https://keynote.brandonxiang.top/pwa.html) |
| 小程序开发实战 | [查看演示](https://keynote.brandonxiang.top/weapp.html) |
| 微前端与 Web Components | [查看演示](https://keynote.brandonxiang.top/microfrontend.html) |
| React Navigation 和 Expo 的应用 | [查看演示](https://keynote.brandonxiang.top/expo.html) |
| Svelte 入门 | [查看演示](https://keynote.brandonxiang.top/svelte.html) |
| ESM Import & Bundle Free | [查看演示](https://keynote.brandonxiang.top/bundle-free.html) |
| Vite+：前端工具链的一次收口 | [查看演示](https://keynote.brandonxiang.top/vite-plus.html) |
| Monorepo | [查看演示](https://keynote.brandonxiang.top/monorepo.html) |
| Node.js 包管理器的前世今生 | [查看演示](https://keynote.brandonxiang.top/package-manager.html) |
| 如何参与开源项目 | [查看演示](https://keynote.brandonxiang.top/github.html) |
| 使用 Next.js 实现优雅降级 | [查看演示](https://keynote.brandonxiang.top/nextjs-fallback.html) |
| Incremental Static Regeneration | [查看演示](https://keynote.brandonxiang.top/isr.html) |
| 学习前端的方法 | [查看演示](https://keynote.brandonxiang.top/how-to-learn-fe.html) |
| 如何做好技术分享、技术方案与答辩 | [查看演示](https://keynote.brandonxiang.top/speech.html) |
| 前端测试左移 | [查看演示](https://keynote.brandonxiang.top/shift-left-testing.html) |
| BFF 架构实践 | [查看演示](https://keynote.brandonxiang.top/bff.html) |
| Node.js 服务的技术运维实践 | [查看演示](https://keynote.brandonxiang.top/devops.html) |
| 如何清除项目中没用代码 | [查看演示](https://keynote.brandonxiang.top/remove-unused-files.html) |
| Aroom | [查看演示](https://keynote.brandonxiang.top/aroom.html) |

## 🛠️ 本地开发

项目基于 `reveal-md` 渲染演示文稿，并通过 `svelteup` 打包自定义 Web Component。

```shell
pnpm install
pnpm run dev
```

开发时主要关注这些目录：

- `md/`：演示文稿 Markdown 源文件。
- `public/img/`：演示文稿使用的图片资源。
- `components/`：站点导航等自定义 Svelte 组件。
- `templates/`：`reveal-md` 使用的 HTML 模板。
- `styles/`：全局演示样式。

## 📦 构建

```shell
pnpm run build
```

构建流程会依次完成 Svelte 组件打包、`reveal-md` 静态页面生成和 Service Worker 生成。

## 🤝 贡献建议

- 📝 新增分享时，将 Markdown 文件放入 `md/`，图片资源放入 `public/img/`。
- 🔗 在 README 的分享目录中补充对应链接，方便读者快速定位。
- ✅ 提交前运行 `pnpm run build`，确保模板、脚本与静态资源可以正常生成。

## 📄 License

[MIT](./LICENSE)
