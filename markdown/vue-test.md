## Vue单元测试


项伟平

2017年10月12日

----

**为什么我们需要测试？**

----

**什么是持续集成？它和持续部署有什么区别？**

----

#### Vue官方单元测试
<small>
- 单元测试（Karma）
- e2e测试（NightWatch）

</small>

![vue单元测试](./img/vue-test.png)

----

karma是一个专门的测试运行器（runner），它不是一个测试框架框架，也不是以一个断言库，是一个平台。

- [karma-webpack](https://github.com/webpack-contrib/karma-webpack) 用webpack预处理文件
- [karma-coverage](https://github.com/karma-runner/karma-coverage) 测试覆盖率
- [karma-mocha](https://github.com/karma-runner/karma-mocha) 接入mocha测试框架
- [karma-spec-reporter](https://github.com/mlex/karma-spec-reporter) 输出报告
- [karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher) 控制PhantomJS
- [karma-phantomjs-shim](https://github.com/tschaub/karma-phantomjs-shim) 给PhantomJS兼容的控制

----

```javascript
var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // 测试服务浏览器
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'], // 测试框架
    reporters: ['spec', 'coverage'], // 报告输出
    files: ['./index.js'], // 文件入口，过滤掉index.html
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'] // 预处理器
    },
    webpack: webpackConfig, // 专门测试webpack配置
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage', // 覆盖率配置
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ]
    },
  });
};
```

----

#### Mocha

<small>mocha本身只是一个单元测试框架，可以兼容第三方断言库</small>

   - [should.js](https://github.com/shouldjs/should.js)
   - [expect.js](https://github.com/LearnBoost/expect.js)
   - [chai](http://chaijs.com/)
   - [better-assert](https://github.com/visionmedia/better-assert)
   - [unexpected](http://unexpected.js.org/)

----



