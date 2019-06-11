const globby = require('globby');
const shell = require('shelljs');


const buildmdx = async () => {
    const paths = await globby('mdx/*.mdx')

    paths.forEach((path) => {
        const name = path.match(/mdx\/(\w*).mdx/)

        if(name[1]) {
            shell.exec(`mdx-deck build ${path} -d web/${name[1]} --basepath='/keynote/web/${name[1]}'`)
            shell.echo(`${path} has been done`)
        }

    })
}

buildmdx()