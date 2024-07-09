# 生成llm

### 三分依赖

[chatglm](https://github.com/tangshuang/chatglmjs.git)
[chatGLM 官方](https://github.com/THUDM/ChatGLM3)

基于 [cpp](https://github.com/li-plus/chatglm.cpp) 生成

> chatglm 是在 cpp基础上封装的

### 步骤
```
git clone --recursive https://github.com/li-plus/chatglm.cpp.git && cd chatglm.cpp
python3 -m pip install -U pip
python3 -m pip install torch tabulate tqdm transformers accelerate sentencepiece
python3 chatglm_cpp/convert.py -i [这里是模型名称 THUDM/chatglm3-6b] -t q4_0 -o [这里是生成的bin文件名称 建议命名[模型名称] + [终端] chatglm3-6b.q4_0.bin]
```
#### 哪里可以找到模型

[一个大家用来共享模型和数据的地方](https://huggingface.co/)
[国内源](https://modelscope.cn/my/overview)

#### 使用示例
``` javascript
// 使用
const { chat, chatSync } = require('chatglmjs');
const { resolve } = require('path');

chat({
  model_bin_path: resolve(__dirname, '../llms/chatglm3-6b.q4_0.bin'),
  prompt: '你好',
  onmessage(msg) {
    process.stdout.write(msg);
  },
});
```




