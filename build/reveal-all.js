// var process = require('child_process');

// const globby = require('globby');
// const shell = require('shelljs');

// const buildReveal = async () => {
//   const paths = await globby('md/*.md')

 

//   paths.forEach((path) => {
    
//       const name = path.match(/md\/(\w*).md/)

//       if(name[1]) {
//           shell.exec(`reveal-md ./md/${name[1]}.md --static web`)
//           shell.exec(`mv ./web/index.html ./web/${name[1]}.html`)
//           shell.echo(`${name[1]} has been done`)
//       }
//   })

//   shell.exec(`mkdir -p ./web/copy-img`);
//   shell.exec(`cp ./md/copy-img/* ./web/copy-img`);
// }

// buildReveal()

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
  'svelte'
]

pageList.forEach((page)=> {
    process.execSync(`reveal-md ./md/${page}.md --static web`);
    process.execSync(`mv ./web/index.html ./web/${page}.html`);
})

// process.execSync(`mkdir -p ./web/copy-img`);
// process.execSync(`cp ./md/copy-img/* ./web/copy-img`);

