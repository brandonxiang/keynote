## Incremental Static Regeneration

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2020 年 11 月 26 日

----

## 增量式页面重渲染

[BLOG](https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration)

----

[next.js](https://nextjs.org/)是[vercel](http://vercel.com/)的开源项目，其他项目有：[vercel](https://github.com/vercel/vercel)、 [swr](https://github.com/vercel/)、[hyper](https://github.com/vercel/hyper)

----

- csr
- ssg
- ssr
- igr


----

- 动态直出(ssr)
- 静态指出(ssg)
- Prerender(puppeteer)

----

### SSG

![igr-ssg](https://keynote.vercel.app/img/igr-ssg.png)

----

### SSG(improved)

![igr-ssg-improved](https://keynote.vercel.app/img/igr-ssg-improved.png)

----

### SSR

![ssr](https://keynote.vercel.app/img/igr-ssr.png)

----

### IGR

![ssr](https://keynote.vercel.app/img/igr-igr.png)

----

![igr-comparison](https://keynote.vercel.app/img/igr-comparison.png)

----

省CDN空间 + 数据变化快 + 无服务器压力 = IGR