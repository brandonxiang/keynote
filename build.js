var process = require('child_process');


var pageList = [
  'vue-cli',
  'vue-specification',
  'vue-startup',
  'vue-test',
  'weapp',
  'pwa',
  'microfrontend',
  'index',
]

pageList.forEach((page)=> {
    process.execSync(`reveal-md ./md/${page}.md --static web`);
    process.execSync(`mv ./web/index.html ./web/${page}.html`);
})


