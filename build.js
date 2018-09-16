var process = require('child_process');


var pageList = [
  'vue-cli',
  'vue-specification',
  'vue-startup',
  'vue-test',
  'weapp',
  'index',
]

pageList.forEach((page)=> {
    process.execSync(`reveal-md ./md/${page}.md --static`);
    process.execSync(`mv ./_static/index.html ./_static/${page}.html`);
})


