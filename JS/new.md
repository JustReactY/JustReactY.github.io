# new

**new都做了什么**
不用创建临时对象，因为 new 会帮你做（你使用「this」就可以访问到临时对象）；
不用绑定原型，因为 new 会帮你做（new 为了知道原型在哪，所以指定原型的名字为 prototype）；
不用 return 临时对象，因为 new 会帮你做；
不要给原型想名字了，因为 new 指定名字为 prototype。