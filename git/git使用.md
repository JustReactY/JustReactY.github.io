## 保命的fix-bug技巧

![](./切换fix-bug分支.png)


## git 别名配置

**私有项目配置**
```
git config alias.st status
git config alias.mg merge
git config alias.ad 'add .'
git config alias.co checkout
git config alias.cb 'checkout -b'
```

**全局配置**
```
git config --global alias.st status
git config --global alias.mg merge
git config --global alias.ad 'add .'
git config --global alias.co checkout
git config --global alias.cb 'checkout -b'
```

**Github进行fork后如何与原仓库同步**

1. git remote -v 检查是否有upstream （上游分支）
2. git remote add upstream https://github.com/xxx.git 添加上游分支
3. git status 检查本地是否有未提交更改
4. git fetch upstream 拉取上游分支更改
5. git checkout master 切换到要合并的分支
6. git merge upstream/master 合并代码
7. git push 推送代码

## git 同时推送多个分支

```
git remote set-url --add origin https://xxx.git
```

## git 为分支添加描述
```
git config.branch.xxx.description '描述'
```

## gitlab.ci 相关问题
### 报错 operation not permitted

修改用户权限：
> 主要出现在Windows上
- net user // 列出用户
- cd ..
- icacls 项目路径/ /grant 用户名:F /T /C /Q
- cd 项目路径/