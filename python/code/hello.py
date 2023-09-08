
# import statistics

# import math

# 我是注释
'''
print(2 ** 3, math.sin(1))


print("hello"[1])

print(type(True), type(False))

print(len("hello"))

user_name = input("请输入姓名 \n")
print("你输入了" + user_name)

print(user_name + str(13))

is_happy = True

num = input("输入 \n")

if int(num) >= 88:
    print('no no', + num)
else:
    print('yes yes')


if int(num) > 0 and int(num) <22:
  print('==========')


arr = [1, 2]
arr.append(3)
print(arr)
arr.remove(1)
print(arr)

str = 'hello'
print(str.upper())

obj = {
    "a": 1,
}

num = ("zhang", 33)
print(num)

obj["a"] = 12
print(obj)

print("a" in obj)

del obj["a"]

obj = {
    "a": 1,
    "b": 2
}

for a in obj.keys():
    print(a )
for a in obj.values():
    print(a )
for a, inx in obj.items():
    print(a, inx)

'''

'''
total = 0

while total < 20:
    total += 1
    print(total)
'''


# message = '''
# 春风{name}
# 绿水
# '''.format(name = '33')

# message2 = '''
# 川枫{0}
# 川枫{0}
# 川枫{1}
# '''.format('33', '44')

# year = '虎'
# name = '笑了'

# message3 = f'''
# {year}
# {name}
# '''

# print(message)
# print(message2)
# print(message3)


'''
def say(str):
    print(str)
    return str


say("hello")

say("hey")
'''

'''
class NameOfClass:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print(f"我的名字是 {self.name}")

class Cat(NameOfClass):
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age
    def speak(self):
        super().speak()
        print(f"我的年龄是 {self.age}")


cat1 = NameOfClass("小黑")
cat2 = Cat("小白", 12)

print(cat1.name)
print(cat2.name)
cat1.speak()
cat2.speak()
'''

'''
f = open("./data.txt", "r", encoding="utf-8")
print(f.read())
print(f.read(10)) # 打印多少字节
print(f.readline()) # 打印一行
print(f.readlines())
f.close() # 需要手动关闭

# with关键字可以自动关闭
with open("./data.txt", "r", encoding="utf-8") as f:
  print(f)
'''

'''
with open("./hello.txt", "w", encoding="utf-8") as f:
  f.write("hello \n")
  f.write("world")
'''

'''
with open("./hello.txt", "a", encoding="utf-8") as f:
  f.write("hello \n")
  f.write("world")
'''

'''
with open("./hello.txt", "r+", encoding="utf-8") as f:
  str = f.read()
  print(str)
  f.write("hello \n")
  f.write("world")
'''

'''
try:
  user_weight = float(input("请输入体重 \n"))
  user_height = float(input("请输入身高 \n"))
  user_BMI = user_weight / (user_height * user_height)
except ValueError:
  print("输入有误")
except ZeroDivisionError:
  print("除数不能为0")
except:
  print("未知错误")
else:
  print("BMI为", user_BMI)
finally:
  print("程序执行结束")

'''


def my_adder(a, b):
    return a + b

# 单独断言 只要出现问题程序就会终止
assert my_adder(1, 2) == 3, "1+2=3"