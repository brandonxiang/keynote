
var process = require("child_process");
var globby = require("globby");


const buildReveal = async () => {
  const paths = await globby("md/*.md");

  paths.forEach((path) => {
    console.log(path);
    const name = path.match(/md\/((\w|-)*)\.md/);

    if (name[1]) {
      var page = name[1];
      process.execSync(`npx reveal-md ./md/${page}.md --static web --title Brandon's Keynote`);
      console.log(`${page}.html is successfully converted!!!`);
    }
  });
}

buildReveal()