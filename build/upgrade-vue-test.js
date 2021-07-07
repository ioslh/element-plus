/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const process = require('child_process')
const excludes = ['theme-chalk']
const targetVersion = '^2.0.0-rc.10'

let error = false
for(let dir of fs.readdirSync(path.resolve(__dirname, '../packages/'))) {
  if (dir.startsWith('__')) continue
  if (excludes.includes(dir)) continue
  const packageJson = path.resolve(__dirname, `../packages/${dir}/package.json`)
  if (fs.existsSync(packageJson)) {
    const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
    if (json.devDependencies && json.devDependencies['@vue/test-utils']) {
      json.devDependencies['@vue/test-utils'] = targetVersion
      try {
        fs.writeFileSync(packageJson, JSON.stringify(json, null, '  '), {
          encoding: 'utf8',
          flag: 'w',
        })
        console.log(chalk.green(`write success - ${dir}`))
      } catch(e) {
        error = true
        console.log(chalk.red(`write failed  - ${dir} `))
      }
    }
  }
}

if (!error) {
  console.log(chalk.green('依赖更新成功，即将执行 yarn bootstrap'))
  setTimeout(process.exec, 1000, 'yarn bootstrap', (e, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
  })
}
