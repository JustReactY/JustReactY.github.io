'use strict'

const https = require('https');
const fs = require('fs');

const host = 'localhost'
const port = 8080
const options = {
    key: fs.readFileSync('./ca/local.shanyue.tech-key.pem'),
    cert: fs.readFileSync('./ca/local.shanyue.tech.pem'),
}

const app = https.createServer(options, (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('hello world')
}).listen(port, host, () => {
    console.log(`https://${host}:${port}`)
})

