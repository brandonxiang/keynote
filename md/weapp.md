## 小程序开发实战

项伟平

2018年10月1日

----




javascript的三种环境
- Node.js
- Browser
- JS Core

----


## 问题一 小程序和pwa区别

----

- PWA是纯网页技术
- 小程序是混合技术

----

## 问题二 小程序和vue的区别

- 生命周期
- 数据绑定

----

## vue生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

----

## 小程序生命周期

- onLoad 页面加载时触发
- onShow 页面显示/切入前台时触发
- onReady 页面初次渲染完成时触发
- onHide 页面隐藏/切入后台时触发
- onUnload 页面卸载时触发

<p style="color: red; font-size: 20px;">你觉得就这样吗？</p>

----

<img src="./img/mina-lifecycle.png" alt="小程序生命周期" width="43%">

----

#### 小程序的js代码

- 在 iOS 上，是运行在 JavaScriptCore 
- 在 Android 上，是通过 X5 JSCore来解析
- 在 开发工具上，是运行在 nwjs 

----

## 问题三 小程序和rn或weex区别

----

rn和weex是通过


----

## 授权

----

----



## 企业微信


企业号 | 公众号
---- | ----
企业微信小程序 | 微信小程序
userid | openid
wx.qy.login()| wx.login()

><font size=5>api不同</font>