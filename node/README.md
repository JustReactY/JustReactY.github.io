# node

> nodejs就是基于js语法增加与操作系统之间的交互

node版本管理
- n、nvm安装 node

最简单的http服务

1. require 引入 http模块
2. 创建http服务
3. 侦听端口

启动方式

- node app.js
- nohub node app.js &
- forever start app.js

> forever stop app.js

> 接口能力,返回值

创建https服务

- 生成Https证书

> mkcert localhost 127.0.0.1 ::1

- 引入Https模块
- 指定证书位置，并创建Https服务

真正的Web服务
- 引入 express 模块
- 引入serve-index模块
- 指定发布目录

> 控制台输入 sendCommand(SecurityInterstitialCommandId.CMD_PROCEED)

switch host | /etx/hosts
> 127.0.0.1 nodes.com

