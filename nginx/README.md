# 做了什么

1. 配置了docker环境
2. 安装nginx、radis、mongo
3. 27018 - 生产mongo
```

```
4. 27017 - 测试mongo

> 自己shell脚本 一种docker配置 假如服务器重启

5. egg 接口后台启动 --damone or pm2

6. 通过流水线 触发一个shell 

- 判断依赖的md5 
- 依赖备份
- 根据md5是否发生改变决定是否重新下载依赖
- 构建
- 重新启动

7. 配置nginx.conf  使用include方式拆分：

8. 负载均衡

```
upstream shuoda_cms{
    server 172.18.0.1:8001 weight=1;
}

```

> 以 weight 作为比例

- 热备，备用机池