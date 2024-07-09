# 本地https部署静态资源 for chrome

使用 ssl.sh 生成ssl证书
> ./gen.cert.sh yyy.dev

信任根证书
root.crt

使用 http-server 启动
> http-server -S -C ssl/out/yyy.dev/yyy.dev.crt -K ssl/out/yyy.dev/yyy.dev.key.pem

使用 whistle代理
> yyy.dev 10.95.115.177:8080

访问
https://yyy.dev/