const path = require('path');

const resolvePath = path.resolve('a', 'b', 'c') // 返回绝对路径

const joinPath = path.join('a', 'b', 'c') // 返回合法路径

// console.log(`resolvePath: ${resolvePath} \n`)
// console.log(`joinPath: ${joinPath} \n`)
// console.log(`__dirname: ${__dirname} \n`) // 当前文件夹名称
// console.log(`__filename: ${__filename} \n`) // 当前文件名称
// console.log(`path.extname(__filename): ${path.extname(__filename)} \n`)
// console.log(`path.basename(__filename): ${path.basename(__filename)} \n`)
// console.log(`path.dirname(__filename): ${path.dirname(__filename)} \n`)


const fs = require('fs');

const pathToFile = path.resolve(__dirname, './route.js')
/* fs.readFile(pathToFile, 'utf-8', function(err, result) {
    if(err) {
        console.log(`err: ${err}`)
        return
    }
    console.log(`result: ${result}`)
}); */

// const content = fs.readFileSync(pathToFile, 'utf-8') // 同步
// console.log(`content: ${content}`)


// promise化
function promisify(func) {
    return function (...arge) {
        return new Promise((resolve, reject) => {
            arge.push(function (err, result) {
                if(err) return reject(err);
                return resolve(result)
            })
            return func.apply(func, arge)
        })
    }
}

const readFileAsync = promisify(fs.readFile)
// readFileAsync(pathToFile, 'utf-8').then(content => {
//     console.log(`content: ${content}`)
// }).catch(err => {
//     console.log(`err: ${err}`)
// })



