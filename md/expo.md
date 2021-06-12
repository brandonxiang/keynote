---
title: react-navigation和expo的应用
revealOptions: 
   transition: slide
   transitionSpeed: slow
---
### react-navigation和expo的应用

项伟平 [BLOG](https://brandonxiang.vercel.app/)

---

#### 样式问题

- 不同机型样式适配
- 1px的问题
- iphonex适配


---

<h5>宽度设置width: 360</h5>
<div
style="width: 75vw;height: 80vh;display: flex;align-items: center;justify-content: space-around;font-size: 20px;">
<span>IOS(375 dpr2)</span>
<img src='https://keynote.vercel.app/assets/ios-rn.jpeg' style="width: 300px"/>
<span>安卓(360 dpr3)</span>
<img src='https://keynote.vercel.app/assets/android-rn.png' style="width: 300px"/>
</div>

---

#### 适配不同机型

```javascript

import { Dimensions } from 'react-native';
const defaultWidth = 320;
export let screenW = Dimensions.get('window').width;
const _scaleWidth = screenW / defaultWidth;

export function scaleSize(size: number): number {
    return size * _scaleWidth;
}

```

---

#### 1px的问题

```javascript
const styles = StyleSheet.create({
    inputBox: {
        borderWidth: StyleSheet.hairlineWidth
    }
})

```

---

#### iphonex适配问题

- react-navigation设置header
- SafeAreaView组件针对ios刘海优化
- 安卓根据顶部statusBar.currentHeight位移

```javascript
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      }
    })
  },
});
```

---

## react-navigation

- stackNavigator
- switchNavigator
- drawerNavigator
- tabNavigator

---


<img src="https://keynote.vercel.app/assets/switchNavigator.png" style="width: 90vw">

---

<img src="https://keynote.vercel.app/assets/authLoading.png" style="width: 70vw">

---

## expo

- 集成开发环境
- expo SDK
- 部署workflow

---

<div
style="
    width: 70vw;
    height: 100vh;  
    display: flex;
    align-items: center;
    justify-content: center;
">
<img src='https://keynote.vercel.app/assets/android-qrcode.png' style="width: 200px; height: 200px;">
<img src='https://d30j33t1r58ioz.cloudfront.net/static/images/expo-client-iphone.png'>
</div>

---

#### 集成开发环境

| expo          | react-native-cli  |
| --------- | ----------     | 
| 没有ios和android文件夹 | 有ios和android文件夹 |
| 可以expo client调试 | 调试较为麻烦 |
| 自带native环境（可eject） |  需要自行配置  |
| 有发布工作流 | 需要自行打包和热更新的机制 |

---

#### 扫二维码进入调试

- ios利用原生相机扫码进入
- android的expo提供扫码功能

---

#### debug

- expo ios client 双指长按
- expo android client 摇晃手机
- ios模拟器 ⌘D
- Android模拟器 ⌘M
- 呼出 development mode的方法
- 打开`http://localhost:19001/debugger-ui`断点调试

---

#### 部署workflow

- `expo publish`发布到aws server
- `expo export`打包到自己服务器或cdn目录

###### [expo参考文档](https://docs.expo.io/versions/latest/distribution/hosting-your-app/#hosting-your-static-files)
###### [updates参考文档](https://docs.expo.io/versions/latest/sdk/updates/#__next)


---

#### expo-SDK

- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [lottie-react-native](https://github.com/react-native-community/lottie-react-native)
...
- AppLoading
- SplashScreen
- Assets
..
- 在非expo项目，如果需要以上库，native要额外引入

---

#### 题外话 RN动画

```javascript
onBlurUsername = () => {
  Animated.timing(                  // 随时间变化而执行动画
    this.state.fadeUsername,        // 动画中的变量值
    {
      toValue: 0,                   // 透明度最终变为1，即完全不透明
      duration: 500,                // 让动画持续一段时间
    }
  ).start();                        // 开始执行动画
}
...
let colorUsername = this.state.fadeUsername.interpolate({
  inputRange: [0, 1],
  outputRange: ['rgba(211,193,229, 0)', 'rgba(211,193,229, 0.2)']
});
```

```jsx
<Animated.View style={{backgroundColor: colorUsername}}>
```

---

## Q&A