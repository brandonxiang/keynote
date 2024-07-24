---
title: 使用Next.js实现优雅降级
absoluteUrl: https://keynote.brandonxiang.top/nextjs-fallback
revealOptions: 
   transition: slide
   transitionSpeed: slow
---

### 使用Next.js实现优雅降级

项伟平

2021/06/12

---

#### Next.js

- 📝 **SSR** - Server Side Rendering
- 🎨 **SSG** - Static Site Generation
- 🧑‍💻 **CSR** - Client Side Rendering
- 🤹 **ISR** - Incremental Static Regeneration

<br>
<br>

Read more about [Next.js](https://nextjs.org/)

Note: test note


---

<section style="text-align: left">

#### 从服务端获取数据

getInitialProps 服务端获取数据



**被拆分为：**



- getServerSideProps（服务端渲染）
- getStaticProps（静态直出）

</section>

---

#### 如何实现一套逻辑同时满足两种渲染机制？

---

<section style="text-align: left">

#### 自定义一个getPrerenderProps

```javascript
export const getPrerenderProps =  async (ctx) => {
  const _limits =  (ctx && ctx.query && ctx.query._limits) 
                   || process.env.limits 
                   ||0;
  const res = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=' + _limits)
  return { props:{ photos: res.data } }
}
```

分别把它渲染到三个页面文件当中

- index.js SSR模式
- index_ssg.js SSG模式
- index_csr.js CSR模式

</section>

---

#### 页面逻辑

```javascript
function Home({ photos }) {
  let _photos =  photos || []
  return (
    <div className="photos">
      {
        _photos.map((photo, index) => (
          <figure key={index}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <figcaption>{photo.title}</figcaption>
          </figure>
        ))
      }
    </div>
  )
}
export const Page = Home;
```

---

#### SSR模式

```javascript
export { 
  Page as default, 
  getPrerenderProps as getServerSideProps
} from '../modules/Home';
```

---

#### SSG模式

```javascript
export { 
  Page as default, 
  getPrerenderProps as getStaticProps 
} from '../modules/Home';
```
---

#### CSR模式

```javascript
import {Page, getPrerenderProps} from '../modules/Home';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const CSR = () => {
    const router = useRouter();
    const [extraProps, setExtraProps] = useState({});

    useEffect(() => {
        getPrerenderProps(router).then(({props}) => {
            setExtraProps(props);
        }) 
    }, [router]);

    return <Page {...extraProps}/>
}

export default CSR;
```

---

#### 参数注入

```javascript
const _limits =  (ctx?.query?._limits) || process.env.limits || 0;
```

csr和ssr可以动态注入参数，ssg只能环境变量注入

---
<section style="text-align:left">

#### 如何将SSR降级成为CSR

SSR服务端渲染由于是依赖服务器资源，在流量过大的情况下，有可能会出现服务不可用的情况，返回特殊的错误码例如500等。

利用 nginx 做对应的流量分发，当SSR页面返回异常错误的时候，nginx会将流量导入到CSR页面当中。

<img class="r-stretch" src='https://keynote.brandonxiang.top/public/img/ssr-fallback.png'>

</section>

---

#### 优点

- 保证页面高效渲染的同时，不用担心服务可用性问题
- 有效保证页面逻辑的一致性，一份代码两端复用
- 有效降低QA回归工作量，SSR能运行的逻辑，CSR能够实现


---

#### 未来规划

- 怎么实现多路由的多种渲染方式
- 部署流程的落地
- 具体监控的落地

---

#### Q&A

Thanks for Listening

