'use strict'

const http = require('http');
const https = require('https');

const fs = require('fs');

const express = require('express');
const serveIndex = require('serve-index');

const app = express()
app.use(serveIndex('./public')) // 浏览目录
app.use(express.static('./public')) // 指定发布路径

const options = {
    key: fs.readFileSync('./ca/local.shanyue.tech-key.pem'),
    cert: fs.readFileSync('./ca/local.shanyue.tech.pem'),
}
const httpServe = http.createServer(app);
const httpsServe = https.createServer(options, app);

httpServe.listen(80, '0.0.0.0', () => {
    console.log('http://0.0.0.0')
})
httpsServe.listen(8080, '0.0.0.0', () => {
    console.log('https://0.0.0.0:8080')
})