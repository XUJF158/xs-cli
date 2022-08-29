const chalk = require('chalk')
const connect = require('connect')
const serveStatic = require('serve-static')
const fs = require('fs')

const port = 9999
const publicPath = '/'
const fileName = 'dist'

const isExist = fs.existsSync(`.${publicPath}${fileName}`)
if (!isExist) {
  console.log(chalk.red(`>'${fileName}' File does not exist`))
  return
}

const app = connect()
app.use(publicPath, serveStatic(`./${fileName}`, { index: ['index.html', '/'] }))

app.listen(port, () => {
  console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
})
