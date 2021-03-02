/* eslint-disable */
const path = require('path')
const resolvePath = dir => path.join(path.resolve('./'), dir)
class TestBuildPlugin {
  constructor (args) {}
  apply (compiler) {
    const { testBuild } = process.env || {}
    if (testBuild === '1') {
      try {
        const testBuildConfig = require(resolvePath('.testBuildConfig.js')) || {}
        // 初始化插件之后
        compiler.hooks.afterPlugins.tap('TestBuildPlugin', (config) => {
          if (!this.testConfigValCorrect(config.options, testBuildConfig.options)) {
            throw new Error('options config err!')
          }
        })
        // 生成资源到output目录之前
        compiler.hooks.emit.tapPromise('TestBuildPlugin', (compilation) => {
          return new Promise((resolve, reject) => {
            const assets = compilation.getAssets()
            if (assets && assets.length) {
              const { mustHave, mustForbidden } = testBuildConfig.codeRules
              assets.forEach((item) => {
                const asset = compilation.assets[item.name]
                const source = asset.source()
                // 判断必须禁止的代码
                const mustForbiddenRes = this.testCodeCorrect({
                  codeRule: mustForbidden,
                  type: 1,  // type为1，表示必须禁止的；type为2，表示必须包括的
                  name: item.name, // 文件名
                  source
                })
                if (!mustForbiddenRes.isCorrect) {
                  reject(new Error(`${mustForbiddenRes.errItem} must be forbidden\nError detail: ${mustForbiddenRes.errItem} occurred in ${item.name} `))
                }
                // 判断必须包含的代码
                const mustHaveRes = this.testCodeCorrect({
                  codeRule: mustHave,
                  type: 2,  // type为1，表示必须禁止的；type为2，表示必须包括的
                  name: item.name, // 文件名
                  source
                })
                if (!mustHaveRes.isCorrect) {
                  reject(new Error(`${mustHaveRes.errItem} must be have\nError detail: err occurred in ${item.name} `))
                }
              })
            }
            resolve()
          })

        })
      } catch (e) {
        throw new Error(`not find file testBuildConfig.js.\nError detail: ${e}`)
      }
    }

  }
  // 判断配置是有一样
  testConfigValCorrect(buildVal, configVal) {
    if (!configVal) { return true }
    if (!buildVal) { return false }
    let correct = true
    if (this.getValType(configVal) === '[object Array]') {
      if (this.getValType(buildVal) !== '[object Array]') { return false }
      configVal.every((item, index) => {
        return  correct = this.testConfigValCorrect(buildVal[index], configVal[index])
      })
    } else if (this.getValType(configVal) === '[object Object]') {
      if (this.getValType(buildVal) !== '[object Object]') { return false }
      Object.keys(configVal).every((key) => {
        return correct = this.testConfigValCorrect(buildVal[key], configVal[key])
      })
    } else {
      return buildVal === configVal
    }
    return !!correct
  }
  // 判断代码是否正确
  testCodeCorrect({
    codeRule,
    type,  // type为1，表示必须禁止的；type为2，表示必须包括的
    name, // 文件名
    source // 文件路径
  }) {
    let errItem = null
    let result = {
      isCorrect: true
    }
    if (codeRule && codeRule.length) {
      codeRule.every((codeRuleItem) => {
        if (codeRuleItem) {
          let { test, val } = codeRuleItem
          test = test ? this.getRegExpTypeVal(test) : /\.(js|html)$/
          val = val ? this.getArrayTypeVal(val) : null
          if (test.test(name)) {
            if (val && val.length) {
              val.every(valItem => {
                const itemRegExp = this.getRegExpTypeVal(valItem)
                if (itemRegExp) {
                  if ((itemRegExp.test(source) && type === 1)
                    || (!itemRegExp.test(source) && type === 2)
                  ) {
                    errItem = valItem
                    return false
                  }
                }
              })
            }
          }
        }
        return !errItem
      })
    }
    if (errItem) {
      result = {
        isCorrect: false,
        errItem
      }
    }
    return result
  }
  // 获取类型
  getValType(val) {
    if (!val) { return null }
    return Object.prototype.toString.call(val)
  }
  // 获取RegExp类型的值
  getRegExpTypeVal(val) {
    if (this.getValType(val) !== '[object RegExp]') {
      return new RegExp(val)
    }
    return val
  }
  // 获取数组类型的值
  getArrayTypeVal(val) {
    return this.getValType(val) === '[object Array]' ? val : [val]
  }
}
module.exports = TestBuildPlugin
