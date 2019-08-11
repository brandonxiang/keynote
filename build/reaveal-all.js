var process = require('child_process');

const globby = require('globby');
const shell = require('shelljs');

const buildReveal = async () => {
  const paths = await globby('md/*.md')

  paths.forEach((path) => {
      const name = path.match(/md\/(\w*).md/)

      if(name[1]) {
          shell.execSync(`reveal-md ./md/${page}.md --static web`)
          shell.execSync(`mv ./web/index.html ./web/${page}.html`)
          shell.echo(`${path} has been done`)
      }
  })

  shell.execSync(`mkdir -p ./web/copy-img`);
  shell.execSync(`cp ./md/copy-img/* ./web/copy-img`);
}

buildReveal()

