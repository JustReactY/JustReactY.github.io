const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'

module.exports = {
  isMac,
  isWin
}