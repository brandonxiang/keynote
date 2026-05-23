# Repository Guidelines

## Project Overview

This repository builds a static keynote archive with `reveal-md`, `reveal.js`, Svelte custom elements, and Workbox.

The public site is <https://keynote.brandonxiang.top/>.

## Directory Map

- `md/`: Markdown sources for each presentation. Each top-level `md/*.md` file becomes a generated HTML page.
- `public/img/`: Images referenced by presentations. Prefer existing assets before adding new ones.
- `components/`: Svelte custom elements used by the site shell.
- `templates/`: `reveal-md` HTML templates for slides and the listing page.
- `styles/`: Global slide styles loaded by `reveal-md`.
- `scripts/`: Runtime scripts, including service worker registration.
- `dist/`: Generated static output. Do not edit this directory by hand.

## Commands

Use `pnpm`.

```sh
pnpm install
pnpm run dev
pnpm run build
pnpm run build:svelte
pnpm run build:reveal
pnpm run sw
```

`pnpm run build` is the required verification command before shipping changes. It bundles Svelte components, generates the static reveal pages, and writes the service worker.

## Lighthouse Verification

For performance/accessibility/SEO work, build first, serve `dist/`, then run Lighthouse against the local server.

```sh
pnpm run build
python3 -m http.server 4173 --directory dist
npx lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --preset=desktop --chrome-flags="--headless=new --no-sandbox"
npx lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox"
```

Target score for both desktop and mobile is:

```text
Performance / Accessibility / Best Practices / SEO = 100 / 100 / 100 / 100
```

## Content Guidelines

- Add a new talk by creating a Markdown file in `md/`.
- Every talk Markdown file must include a `talkDate: YYYY-MM-DD` frontmatter field. Use the visible talk date when available; otherwise use the publish date.
- Store presentation images in `public/img/`.
- Add the new talk to the README share table so readers can find it.
- Confirm the new talk appears on the generated listing homepage (`dist/index.html`) after `pnpm run build`; the homepage cards must show each talk's date and sort newest first.
- Keep Markdown slide content focused; avoid unrelated formatting churn in existing talks.
- Do not edit generated files in `dist/`; regenerate them with the build script.

## Template And Runtime Guidelines

- Keep `templates/listing.html` lightweight. The listing page should not load reveal slide CSS unless it is needed.
- Keep analytics production-only so local Lighthouse runs are stable and not affected by third-party scripts.
- Do not reintroduce `user-scalable=no` or restrictive `maximum-scale` viewport settings.
- If changing links with visible text, make the accessible name match the visible label unless there is a clear reason not to.
- If changing service worker behavior, run a fresh build and inspect the generated Workbox summary.

## Git Safety

- Check `git status --short --branch` before editing.
- Do not overwrite or revert unrelated local changes. In particular, existing presentation edits in `md/` may be user work in progress.
- Stage only files related to the task.
- Run `git diff --check` before committing.
- Commit messages should be concise and conventional, for example `perf: optimize lighthouse baseline` or `docs: add agent guidelines`.
