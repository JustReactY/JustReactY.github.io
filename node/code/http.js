'use strict'

const http = require('http');

const host = 'localhost'
const port = 3333
const app = http.createServer((req, res) => {
    console.log(req)
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('hello world')
}).listen(port, host, () => {
    console.log(`http://${host}:${port}`)
});