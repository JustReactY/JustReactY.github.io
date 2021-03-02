const path = require('path')
const resolvePath = dir => path.join(__dirname, dir)
module.exports = {
  // webpack 打包配置项
  options: {
    entry: {
      app: ['./src/main.js']
    },
    output: {
      path: resolvePath('deploy'),
      publicPath: '/'
    }
  },
  codeRules: {
    // 用来配置必须有的代码，test: 检测的范围；val: 代码
    mustHave: [{
      test: /index\.html$/,
      val: ['abcdefg']
    }],
    // 用来配置必须禁止的代码，test: 检测的范围；val: 代码
    mustForbidden: [{
      test: /\.(js|html)$/,
      val: ['beta-api.m.jd.com']
    }]
  }

}
