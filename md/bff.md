---
title: 微服务实战之BFF云端一体开发
revealOptions: 
   transition: slide
---

### 微服务实战之BFF云端一体开发

项伟平（2023.02.10）

---

[Nest.js 微服务实战之搭建系统框架（基于 GraphQL 和 RPC）](https://mp.weixin.qq.com/s/UfaED72Dg-xCwhKsRyNX7Q)

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/origin-architecture.png" data-background-size="contain" -->


---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/origin-architecture2.png" data-background-size="contain" -->

---

bff的诉求在于合并请求、字段裁剪

---

旧版bff的问题在于：

- 运维成本
- 服务逻辑成本

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/BFF-architecture.png" data-background-size="contain" -->

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/origin-throught.png" data-background-size="contain" -->

---

以前的 BFF，重心在 BFF 层

把脏活累活都放在 BFF 侧，吃力不讨好，复杂难维护

---


<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/BFF-throught.png" data-background-size="contain" -->

---

新型的 BFF，由于 graphql 逻辑转移到前端侧，重心在两侧

所有的裁剪权利都交给前端，BFF 逻辑释放

---

[Demo](https://github.com/brandonxiang/taolj)

---

技术选型

- graphql server: apollo-server（成熟的选择）

- graphql client:
  - apollo-client(端侧包体积大，不考虑)
  - urql (端侧包体积小，可以考虑)
  - react-query + graphql-request (端侧包体积适中，兼容http/graphql，建议)


---

总结

- 中间层通过pb自动生成graphql（自动化）
- 中间层通过apollo-server来提供字段信息的查看（自动化）
- 前端层选取自己需要的字段，编写graphql，形成自己的类型定义

---

### 加餐: react query

支持 graphql 和 http

---
```jsx
function Example() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const init = useCallback(async () => {
    const res = await fetch('https://api.github.com/repos/tannerlinsley/react-query');
    setLoading(true);
    const jsonRes = await res.json().catch((e) => {
      setError(e);
    }).finally(() => {
      setLoading(false);
    });
    if(jsonRes) {
      setData(jsonRes);
    }
  }, [])

  useEffect(() => {
    init()
  }, [init]);

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}

```


---

```jsx
function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
```

---

https://tanstack.com/query/latest/docs/react/overview