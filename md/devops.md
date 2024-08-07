---
title: nodejs服务的技术运维实践
absoluteUrl: https://keynote.brandonxiang.top/devops
revealOptions: 
   transition: slide
---

### nodejs服务的技术运维实践

项伟平（2023.02.10）

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/metric-log-trace.jpeg" data-background-size="contain" -->

---

监控手段 | 相关链接
---------|----------
logs查日志 | kubernate自研和logging平台
metrics | grafana开源
traces | jaeger开源

---

- opentracing
- opentelemetry

---

- rlog (roll-log，通过@shopeepay/log，自行打)
- flog (flow-log，node-agent自动打)
---

常用打印日志的命令

```
//滚动打印日志
tail -f rlog.log

//过滤某些关键信息
tail rlog.log|grep "c1e9542743e4b57d"| head
```

---

当前存在的问题

- jaeger测试环境没有数据
- http转发的traceid缺失
- rlog没带上traceid
- 部分技术项目的logs目录不在/data/logs
- kubernate平台标签混乱
- opentracing已经被社区archived
- prom-client在mss的模版服务不知名报错

---


### 记一次pod重启的问题排查

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/find-problem-by-log.png" data-background-size="contain" -->

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/decode-error.png" data-background-size="contain" -->

---


### 记FE技术网关的traceid最佳实践

---

<!-- .slide: data-background="white" data-background-image="https://keynote.brandonxiang.top/public/img/traceid.png" data-background-size="contain" -->

---

- http
- grpc

---

#### 网关grpc的traceid源码

```javascript
const span: Span = request.req.span;
globalTracer().inject(
  span,
  FORMAT_HTTP_HEADERS,
  new Proxy(meta, {
    set(target, key1: string, value) {
      target.add(key1, value);
      return true;
    },
  })
);
return servents[packageName](functionName, params, meta);
```

---

#### 网关http的traceid是缺少的

http通过axios进行调用

---

```javascript
const headerCarrier = {};

globalTracer().inject(request.req.span.context(), FORMAT_HTTP_HEADERS, headerCarrier);

//@ts-ignore
request.log.info(headerCarrier['uber-trace-id']);
request.log.info(headerCarrier);

const { data } = await axios.post(
  `${service.httpUrl}${functionName}/${request.params['*']}`,
  {
    operator: user.name,
    email: user.email,
    token: service.token,
    ...params,
  },
  {
    headers: headerCarrier
  }
);
```
---

### 问题一 log信息中traceid的缺少

---

```typescript
export default fp((fastify: IServer, options, next) => {
  fastify.addHook('preHandler', async (request, response) => {
    const { span, originalUrl, url, method } = request.req;

    const requestUrl = typeof originalUrl === 'undefined' ? url : originalUrl;
    const { pathname } = parseUrl(requestUrl as string, true);

    request.log = new CustomLogger({
      grpcMethod: `${method} ${pathname}`,
      funcName: originalUrl,
      uid: request.req._uid,
      traceId: (span && span.context().traceIdStr) || '',
    });

    request.log.info(formatRequestLog(request));

    if (span) {
      span.log({
        query: request.query,
        reqBody: request.body,
      });
    }
  });
});
```

---

把`console.log`换成`req.log`

---

### 问题二 uid的缺失

- 目标是哪个用户的操作
- 代码顺序有问题（先处理jwt信息的获取）

---

```javascript
export default fp((fastify, options, next) => {
  fastify.addHook('preHandler', async (request, response) => {
    const config = getConfig(request.headers['a-region']);
    const tokenName = 'a-token';
    const token = _.get(request, `cookies.${tokenName}`);

    let user: UserInfo = {
      name: 'jenkins',
      email: 'jenkins@shopee.com',
    };

    if (token) {
      user = decodeToken(token, config.jwtToken) as UserInfo;
    }

    request.req._uid = user.name;
    request.req._user = user;
  });

  next();
});
```

---

### 问题三 grpc请求里面的console.log（带上traceid）

---

## Q&A