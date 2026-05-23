# SEO Plan

This site is a static keynote archive built from Markdown into reveal.js pages.
The SEO goal is discovery of Brandon Xiang's technical talks, especially front-end engineering, architecture, PWA, microfrontend, testing, build tooling, and developer productivity topics.

## Current Decisions

- Use clean canonical URLs such as `https://keynote.brandonxiang.top/vite-plus`.
- Keep Vercel `cleanUrls` enabled so canonical URLs resolve without `.html`.
- Generate `robots.txt` and `sitemap.xml` from Markdown frontmatter during the build.
- Treat every top-level `md/*.md` file as an indexable talk page.
- Require each talk to define `title`, `talkDate`, `description`, and `absoluteUrl` in frontmatter.
- Use each talk's `description` for meta description, Open Graph, Twitter card, listing excerpts, and structured data.
- Add JSON-LD to the listing page and every talk page.

## Search Console Checklist

After deployment:

1. Submit `https://keynote.brandonxiang.top/sitemap.xml`.
2. Inspect `https://keynote.brandonxiang.top/`.
3. Inspect the latest talk URL, currently `https://keynote.brandonxiang.top/vite-plus`.
4. Watch the Page Indexing report for canonical or duplicate URL warnings.
5. Watch Performance queries and add richer body copy to talks that start receiving impressions.

## Ongoing Rules

- New talk links should use the clean URL form without `.html`.
- Do not point canonical URLs at paths that are not live.
- Do not edit generated files in `dist/`; update Markdown, templates, or scripts and rebuild.
- If a talk is intentionally private or obsolete, remove it from `md/` or explicitly set indexing policy before publishing.
