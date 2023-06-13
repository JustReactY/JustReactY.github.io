# 疑难杂症汇总

### 背景
换电脑后重新clone的项目，推送后发现文档不更新了，打开commit找到ci报错

#### 报错信息
fatal: No url found for submodule path 'xxx' in .gitmodule

主要是由于缓存导致
#### 解决方法
> git rm --cached xxx