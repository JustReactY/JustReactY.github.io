const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

function downloadFile(uri, fileName) {
    console.log('====', { uri, protocol: new URL(uri).protocol })
    console.log('下载中...')
    const client = (new URL(uri).protocol === "https:") ? https : http;
    return new Promise((resolve, reject) => {

        // 确保fileName路径存在
        const file = fs.createWriteStream(fileName);

        client.get(uri, (res) => {
            if (res.statusCode !== 200) {
                console.error("==出错啦==")
                reject({ statusCode: res.statusCode });
                return;
            }

            res.on('end', () => {
                console.log('download end');
            });


            // 进度、超时等

            file.on('finish', () => {
                console.log('finish write file')
                file.close(resolve);
            }).on('error', (err) => {
                fs.unlink(fileName);
                reject(err.message);
            })

            res.pipe(file);
        });
    });
}


module.exports = downloadFile