## 最佳实践

### 安装 Rust
首先让我们来安装搭建好 Rust 开发环境。

Rust 官方有提供一个叫做 rustup 的工具，专门用于 rust 版本的管理，网址是：https://rustup.rs/，提供了很多实用的功能，推荐大家一定要使用这个工具来管理自己的 Rust 版本。

而由于一些众所周知的特殊原因，rustup 官方源在中国大陆境内访问速度并不理想，因此我们推出了 https://rsproxy.cn/ 这个面向中国大陆的镜像源，通过该源为中国大陆的 Rust 用户提供快速稳定的服务。（如果网络没有问题，可以直接跳过到 https://www.rustwiki.org.cn/zh-CN/book/ch01-01-installation.html）
接下来，我们先把这两行加入到你的 shell 配置文件（~/.zshrc 或者 ~/.bashrc）的末尾：
``` sh
export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
```
然后，记得一定要 reload 或者 source 一下你的配置文件，让这两行配置生效（当然，最简单粗暴的方法就是关了这个终端再打开）。
然后，mkdir -p ~/.cargo创建一下文件夹，将以下几行放到你的~/.cargo/config文件中：
``` sh
[source.crates-io]
replace-with = 'rsproxy'

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"

[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"

[net]
git-fetch-with-cli = true
```

然后，执行以下命令：
``` sh
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh
```

到这一步的时候，直接回车（默认）就好，然后执行一下：
``` sh
source "$HOME/.cargo/env"
```
接下来，我们来安装一下 VSCode 和 rust-analyzer，这两个是 Rust 社区中免费的主流 IDE。
VSCode 的安装方法大家直接参照官方说明进行：https://code.visualstudio.com/
打开 VSCode 后，我们按照 https://rust-analyzer.github.io/ 这里的 QuickStart 说明，在 MarketPlace 中下载并安装一下 rust-analyzer。


## Rust 入门
Rust 是一门十分有趣的语言，这里提供了一些入门的学习资料，大家可以按需取用。
放在开头的，自然是最经典的 The Book：
https://doc.rust-lang.org/book/
这里也有中文版的翻译：
https://rust.purewhite.io/zh-CN/book/
完成了 The Book 后，由于现在我们普遍使用 Async Rust 进行开发，所以需要学习一下 Async Rust 相关的知识：
https://rust-lang.github.io/async-book/
中文版：
https://huangjj27.github.io/async-book/index.html
如果喜欢以例子练手学习的同学，可以参考：
https://github.com/rust-lang/rustlings

https://doc.rust-lang.org/rust-by-example/

## 编译
rustc main.rc


## 使用cargo

### 创建项目
cargo new hello_cargo

### 包命令

cargo build // 编译
cargo build --release // 编译正式包
cargo run   // 编译并执行
cargo check // 检查是否可以编译

可以使用 cargo build 构建项目。
可以使用 cargo run 一步构建并运行项目。
可以使用 cargo check 构建项目而无需生成二进制文件来检查错误。
有别于将构建结果放在与源码相同的目录，Cargo 会将其放到 target/debug 目录。

### 添加及更新依赖

#### 添加
guessing_game/Cargo.toml 下 [dependencies] 下 添加 rand = "0.8.3"
执行 cargo build 安装依赖

#### 更新
cargo update


### 查看包使用
cargo doc --open

### 变量与常量
const 声明常量 需要大写 一直不可变 可以全局作用域
let 声明常量 可以被遮蔽 即可以改变值也可以改变类型 只在当前作用域
let 配合 mut 可以声明变量 但是变量只能改变值不可以改变类型