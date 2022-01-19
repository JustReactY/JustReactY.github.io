'use strict'

const http = require('http');
const url = require('url');

const host = 'localhost'
const port = 3333
const app = http.createServer((req, res) => {
    const data = url.parse(req.url)
    console.log(req.url)
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    if(req.url === '/name') {
        res.end('i am yyy')
        return
    }
    res.end('hello world')
}).listen(port, host, () => {
    console.log(`http://${host}:${port}`)
});