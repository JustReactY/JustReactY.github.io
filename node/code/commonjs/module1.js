const Module = require('module')

const prevFunc = Module._extensions['.js']
Module._extensions['.js'] = function(...args) {
    console.log('load')
    prevFunc.apply(prevFunc, args)
}


const result =  require('./module')
console.log(result)
