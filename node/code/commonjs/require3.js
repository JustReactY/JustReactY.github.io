const vm = require('vm')
const path = require('path')
const fs = require('fs')

function r(filename) {
    const pathToFile = path.resolve(__dirname, filename);
    const content = fs.readFileSync(pathToFile, 'utf-8')
    const name = 'yyy'
    const wrapper = [
        '(function(require, module, exports, name){',
        '})'
    ]
    const wrapperContent = wrapper[0] + content + wrapper[1]
    const script = new vm.Script(wrapperContent, {
        filename: 'index1.js'
    })
    const result = script.runInThisContext()
    const module = {
        exports: {
        }
    }
    result(r, module, module.exports, name)
    return module.exports
}

global.r = r