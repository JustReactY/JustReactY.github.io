const vm = require('vm')
const path = require('path')
const fs = require('fs')

const pathToFile = path.resolve(__dirname, './index1.js');
const content = fs.readFileSync(pathToFile, 'utf-8')


const script = new vm.Script(content, {
    filename: 'index1.js'
})


const result = script.runInThisContext()
