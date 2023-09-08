const child_process = require("child_process");
const path = require('path')
const { isMac } = require('./platform.ts')

const sleep = (deep = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, deep)
  })
}

const installApp = async ({ fileName, appName, appFile }) => {
  try {
    console.log('执行环境', { isMac, install: isMac ? `"${path.join(process.cwd(), fileName)}" /S` : `"${path.join(process.cwd(), fileName)}" /S` })
    // mac直接打开
    if (isMac) {
      const filePath = path.join(process.cwd(), fileName)
      await child_process.execSync(`hdiutil attach ${filePath}`)
      await child_process.execSync(`cp -R "/Volumes/${appName}/${appFile}" /Applications`)
      return child_process.execSync(`hdiutil detach "/Volumes/${appName}/"`)
    }
    // windows 静默安装
    return child_process.execSync(`"${path.join(process.cwd(), fileName)}" /S`)
  } catch (error) {
    console.log('installApp==', { error })
  }
}

module.exports = installApp
