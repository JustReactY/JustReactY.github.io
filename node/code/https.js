'use strict'

const https = require('https');
const fs = require('fs');

const host = 'localhost'
const port = 443
const options = {
    key: fs.readFileSync('./ca/nodes.com-key.pem'),
    cert: fs.readFileSync('./ca/nodes.com.pem'),
}

const app = https.createServer(options, (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('hello world')
}).listen(port, host, () => {
    console.log(`http://${host}/${port}`)
})
