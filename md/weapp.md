## 小程序开发实战

项伟平 [BLOG](https://brandonxiang.vercel.app/)

2018年11月26日

###### [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html)

----

javascript的三种环境
- Browser
- Node.js
- JS Core

----

#### 问题一 这句JS在小程序、weex、SSR上运行？

```javascript
document.getElementById('app').style.height= '100px'
```

----

<!-- .slide: data-background-image="https://keynote.vercel.app/assets/weapp.jpg" data-background-size="contain" -->

----


### 问题二 小程序和pwa区别

----

- PWA是纯网页技术
- 小程序是混合技术

----

##### 运行机制

- 小程序没有重启的概念，但是有冷启动和热启动
- 当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
- 当短时间内（5s）连续收到两次以上收到系统内存告警，会进行小程序的销毁

----

##### 更新机制

- 小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包
- 同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上

----

### 问题三 小程序和vue的区别

- 数据绑定（小程序单向绑定）
- 生命周期

----

#### vue生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

----

#### 小程序生命周期

- onLoad 页面加载时触发
- onShow 页面显示/切入前台时触发
- onReady 页面初次渲染完成时触发
- onHide 页面隐藏/切入后台时触发
- onUnload 页面卸载时触发

<p style="color: red; font-size: 20px;">你觉得就这样吗？</p>

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/assets/mina-lifecycle.png" data-background-size="contain" -->

----

#### 小程序的js代码

- 在 iOS 上，是运行在 JavaScriptCore 
- 在 Android 上，是通过 X5 JSCore来解析
- 在 开发工具上，是运行在 nwjs

----

### 问题四 小程序和rn或weex区别

----

- weex是基于DSL映射
- 小程序会映射到原生组件或渲染H5组件
- 小程序存在原生组件和H5组件混用
- 小程序样式布局方便，但是对原生组件无能为力

----

## 原生组件

- camera
- canvas
- input
- live-player
- live-pusher
- map
- textarea
- video
- webview

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/assets/weapp-native.png" data-background-size="contain" -->

----

## 用户功能

- 获取openid
- 获取unionid
- [获取用户信息，手机号](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
- 鉴权

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/assets/unionid.png" data-background-size="contain" -->



----

#### 问题五 小程序有cookie吗？有跨域问题吗？

----

## 云开发

腾讯云开发，serverless架构

![云开发](https://keynote.vercel.app/assets/cloud-develop.png)

----

<!-- .slide: data-background="white" data-background-image="https://keynote.vercel.app/assets/serverless.png" data-background-size="contain" -->

----

<!-- .slide:  data-background-image="https://keynote.vercel.app/assets/faas.png" data-background-size="contain" -->

----

## 企业微信

小程序账号可以绑定企业微信，但是api有所不同

企业号 | 公众号
---- | ----
企业微信小程序 | 微信小程序
userid | openid
wx.qy.login()| wx.login()