---
title: Incremental Static Regeneration
revealOptions: 
   transition: slide
---

## Incremental Static Regeneration

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2020 年 11 月 13 日

---

## 增量式页面重渲染

[BLOG](https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration)

---

[next.js](https://nextjs.org/)是[vercel](http://vercel.com/)(前身zeit)的开源项目，其他项目有：[vercel](https://github.com/vercel/vercel)、 [swr](https://github.com/vercel/swr)、[hyper](https://github.com/vercel/hyper)

---

### nextjs支持的渲染模式
- csr(Client Side Rendering)
- ssg(Static Site Generaction)
- ssr(Server Side Rendering)
- isr(Incremental Static Regeneration)

---

### 直出渲染
- 动态直出(ssr)
- 静态指出(ssg)
- Prerender(puppeteer)

---

### SSG

![isr-ssg](https://keynote.brandon.top/public/img/isr-ssg.png)

---

### SSG(improved)

![isr-ssg-improved](https://keynote.brandon.top/public/img/isr-ssg-improved.png)

---

```javascript
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

---

### JAMSTACK

- JAMStack = 现代 SSG 框架 + DevOps + Serverless
- [jamstack组织官网](https://jamstack.org/)
- [前端架构之 JAMStack](https://zhuanlan.zhihu.com/p/137809668)

---

### SSR

![ssr](https://keynote.brandon.top/public/img/isr-ssr.png)

---

```javascript
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

---

### ISR

![isr](https://keynote.brandon.top/public/img/isr-isr.png)

---

```javascript
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}
```

---

![isr-comparison](https://keynote.brandon.top/public/img/isr-comparison.png)

---

省CDN空间 + 数据变化快 + 无服务器压力 = ISR

---

- No spikes in latency. Pages are served consistently fast.
- Pages never go offline. If the background page re-generation fails, the old page remains unaltered.
- Low database and backend load. Pages are re-computed at most once concurrently.