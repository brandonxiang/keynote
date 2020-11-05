
var process = require("child_process");
const { copyFileSync } = require("fs");
var globby = require("globby");


const buildReveal = async () => {
  const paths = await globby("md/*.md");

  paths.forEach((path) => {
    console.log(path);
    const name = path.match(/md\/((\w|-)*)\.md/);

    if (name[1]) {
      var page = name[1];
      const comm = `npx reveal-md ./md/${page}.md --static web --title BrandonXIANG --scripts build/use-sw.js`;
      process.execSync(comm);
      console.log(`${page}.html is successfully converted!!!`);
    }
  });

  // copyFileSync('img', 'web/img');
  const imgPaths = await globby("img/*");
  imgPaths.forEach((imgPath) => {
    copyFileSync(imgPath, 'web/' + imgPath);
    console.log(`${imgPath} is successfully copied`);
  })
}

buildReveal()