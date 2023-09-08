# python

Python引入模块

安装
```
pip install [name]
```
引入
```
import [name]
```

面向对象

``` py
class NameOfClass:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print(f"我的名字是 {self.name}")


cat1 = NameOfClass("小黑")

print(cat1.name)
```