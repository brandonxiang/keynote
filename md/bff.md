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

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/BFF-throught.png" data-background-size="contain" -->

---

技术选型

- graphql server: apollo-server
- graphql client: urql
- graphql client: react-query + graphql-request 
- graphql client: apollo-client

---

总结

- 中间层通过pb形成graphql（自动化）
- 中间层通过apollo-server来提供字段信息的查看（自动化）
- 前端层选取自己需要的字段，编写graphql，形成自己的类型定义

---

# 加餐

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