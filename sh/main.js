
const downloadFileAsync = require('./downloadFile.js')
const installApp = require('./installApp.js')
const { isMac } = require('./platform.js')

async function main() {
  const [_, __, url, appName, appFile] = process.argv;
  console.log({ url, appName, appFile })
  const fileName = isMac ? 'bim_workbench.dmg' : 'bim_workbench.exe'
  console.log('=====开始下载')
  await downloadFileAsync(url, fileName)
  console.log('=====下载完成')
  console.log('=====开始安装')
  await installApp({ fileName, appName, appFile })
  console.log('=====安装完成')
}

main()


