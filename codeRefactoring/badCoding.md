
## 类内味道
### 可度量的味道

1. 过长方法

> 我们遵循这样一条原则：每当感觉须要写注释来说明代码的时候。我们就把须要说明的东西写进一个独立的方法中，并以其意图(而非实现手法)命名。

- 抽取方法 (解释能力、共享能力、选择能力)
``` js
class Api {
    constructor() {
        this.name = 'yyy'
        this.age = 18
    }
    sayHello() {
        login()
        console.log(`name: ${this.name}`)
        console.log(`name: ${this.age}`)
    }
    login() {
        console.log('login')
    }
}

to 

class Api {
    constructor() {
        this.name = 'yyy'
        this.age = 18
    }
    sayHello() {
        login()
        speak()
    }
    login() {
        console.log('login')
    }
    speak() {
        console.log(`name: ${this.name}`)
        console.log(`name: ${this.age}`)
    }
}
```

- 将临时变量替换为查询 
> 我们常做的是临时变量作为参数传递给提炼出来的对象，但这样对提升代码可读性并没有帮助

正确的做法是
``` js
function sum() {
    const basePrice = _quantity * _itemPrice
    return basePrice > 1000 ? basePrice * 0.8 : basePrice * 0.9
}

to

function sum() {
    return basePrice() > 1000 ? basePrice() * 0.8 : basePrice() *0.9
}
function basePrice() {
    return _quantity * _itemPrice
}
```

- 将方法替换为方法对象 

``` js
function gamma(inputVal, quantity, yearToDate) {
    const importantValue1 = (inputVal * quantity) + delta();
    const importantValue2 = (inputVal * yearToDate) + 100;
    if ((yearToDate - importantValue1) > 100) {
        importantValue2 -= 20;
    }
    return importantValue2 - 2 * importantValue1;
}

to 

function gamma(inputVal, quantity, yearToDate) {
    return new Gamma(inputVal, quantity, yearToDate).compute()
}

class Gamma{
    constructor(inputVal, quantity, yearToDate) {
        this.inputVal = inputVal
        this.quantity = quantity
        this.yearToDate = yearToDate
        this.importantValue1 = (inputVal * quantity) + delta()
        this.importantValue2 = (inputVal * quantity) + 100
    }
    compute() {
        if ((this.yearToDate - this.importantValue1) > 100) {
            this.importantValue2 -= 20;
        }
        return this.importantValue2 - 2 * this.importantValue1
    }
}
```

> 现在我可以轻松地对compute()函数采取 Extract Method，不必担心引数（argument）传递

- 分解条件式
``` js
class Api {
    constructor() {
        this.name = 'yyy'
        this.age = 18
    }
    ask(msg) {
        if(msg === 'name' || msg === 'age') {
            console.log(`${msg}: ${this[msg]}`)
        } else {
            console.log('error-nodata')
        }
    }
}

to

class Api {
    constructor() {
        this.name = 'yyy'
        this.age = 18
    }
    ask(msg) {
        if(this.isValidQuestion(msg)) {
            this.speak(speak)
        } else {
            this.nodata()
        }
    }
    isValidQuestion(msg) {
        return msg === 'name' || msg === 'age'
    }
    speak(msg) {
        console.log(`${msg}: ${this[msg]}`)
    }
    nodata() {
        console.log('error-nodata')
    }
}
```


2. 过大的类

> 说明这个类做太多事情。其内往往就会出现太多instance变量。一旦如此。Duplicated Code也就接踵而至了。

- 抽取类

将「与电话号码相关」的行为分离到一个独立class中
``` js
class Person{
    constructor() {
        this._name = ''
        this._officeAreaCode = ''
        this._officeNumber = ''
    }
    getName() {
        return this._name;
    }
    getTelephoneNumber() {
        return ("(" + this._officeAreaCode + ") " + this._officeNumber);
    }
    getOfficeAreaCode() {
        return this._officeAreaCode;
    }
    setOfficeAreaCode(arg) {
        this._officeAreaCode = arg;
    }
    getOfficeNumber() {
        return this._officeNumber;
    }
    setOfficeNumber(arg) {
        this._officeNumber = arg;
    }
}
   
to

class Person{
    constructor() {
        this._name = ''

        this._officeTelephone = new TelephoneNumber()
    }
    getName() {
        return this._name;
    }
    getTelephoneNumber() {
        return this._officeTelephone.getTelephoneNumber()
    }
    getOfficeTelephone() {
        return this._officeTelephone
    }
}
   
class TelephoneNumber {
    constructor() {
        this._areaCode = ''
        this._number = ''
    }
    getTelephoneNumber() {
        return ("(" + this._areaCode + ") " + this._number);
    }

    getAreaCode() {
        return this._areaCode
    }
    setAreaCode(arg) {
        this._areaCode = arg
    }

    getNumber() {
        return this._number
    }
    setNumber(arg) {
        this._number= arg
    }
}
```

- 抽取子类
> class 中的某些行为只被一部分实体用到，其他实体不需要它们。

``` js
class JobItem {
    constructor(unitPrice, quantity, isLabor, employee) {
        this._unitPrice = unitPrice;
        this._quantity = quantity;
        this._isLabor = isLabor;
        this._employee = employee || new Employee();
    }
    getTotalPrice() {
        return this.getUnitPrice() * this._quantity
    }
    getUnitPrice() {
        return this._isLabor ? this._employee.getRate() : this._unitPrice
    }
    getQuantity() {
        return this._quantity
    }
    getEmployee() {
        return this._employee
    }
}

class Employee {
    constructor(rate) {
        this._rate = rate
    }
    getRate() {
        return this._rate
    }
}

const kent = new Employee('rate')
const j1 = new JobItem (0, 5, true, kent)

to

class JobItem {
    constructor(unitPrice, quantity) {
        this._unitPrice = unitPrice;
        this._quantity = quantity;
    }
    getTotalPrice() {
        return this.getUnitPrice() * this._quantity
    }
    getUnitPrice() {
        return this._unitPrice
    }
    getQuantity() {
        return this._quantity
    }
    getEmployee() {
        return this._employee
    }
}

class Employee {
    constructor(rate) {
        this._rate = rate
    }
    getRate() {
        return this._rate
    }
}

class LaborItem extends JobItem {
    constructor(quantity, employee) {
        super(0, quantity)
        this._employee = employee
    }
    getUnitPrice() {
        return this._employee.getRate()
    }
}

const kent = new Employee('rate')
const j1 = new LaborItem (5, kent)

console.log(j1.getQuantity())
```

- 抽取接口
> implements关键字 js中没有

- 将数据值替换为对象
> 一开始你可能会用一个字符串来表示「电话号码」概念，但是随后你就会发现，电话号码需要「格式化」、「抽取区号」之类的特殊行为。如果这样的数据项只有一二个

``` js
class Order {
    constructor(customer) {
        this._customer = customer
    }
    getCustomer() {
        return this._customer
    }
    setCustomer(arg) {
        this._customer = arg
    }
}

to

class Order {
    constructor(customer) {
        this._customer = new Customer(customer)
    }
    getCustomer() {
        return this._customer.getName()
    }
    setCustomer(arg) {
        this._customer = new Customer(arg)
    }
}

class Customer{
    constructor(name) {
        this._name = name
    }
    getName() {
        return this._name
    }
}
```

3. 过长的参数表

- 将参数替换为方法
- 引入参数对象
- 保持对象完整

4. 过多的注释
> 经常会有这种情况：你看到一段代码有着长长的注释。然后发现，这些注释之所以存在乃是由于代码非常糟糕。这种情况的发生次数之多。实在令人惊讶。
- 抽取方法
- 引入断言

### 不必要的复杂性

**过分一般性**
- 折叠继承体系
> 继承体系很容易变得过分复杂。如果继承并不能带来该有的价值，尝试将两个类合并起来。

- 内联类
> 你的某个class没有做太多事情（没有承担足够责任）。将class的所有特性搬移到另一个class中，然后移除原class。

``` js
class Person {
    constructor() {
        this._officeTelephone = new TelephoneNumber()
        this.name = 'yyy'
    }
    getName() {
        return this._name;
    }
    getTelephoneNumber() {
        return this._officeTelephone.getTelephoneNumber();
    }
    getOfficeTelephone() {
        return this._officeTelephone;
    }
}
class TelephoneNumber {
    constructor(number, areaCode) {
        this._number = number
        this._areaCode = areaCode
    }
    getTelephoneNumber() {
        return ("(" + this._areaCode + ") " + this._number);
    }
    getAreaCode() {
        return this._areaCode;
    }
    setAreaCode(arg) {
        this._areaCode = arg;
    }
    getNumber() {
        return this._number;
    }
    setNumber(arg) {
        this._number = arg;
    }
}
```

- 移除参数
- 重命名方法


### 重复
1. 重复性代码
> 坏味道的首当其冲是重复的代码Duplicated Code。假设你在一个以上的地点看到同样的程序结构，那么当可肯定：设法将它们合而为一，程序会变得更好。

- 抽取方法
同上
- 抽取类
同上
- 上移方法
> 有些函数，在各个subclass 中产生完全相同的结果。将该函数移至superclass。

- 构建模板方法
> 继承是「避免重复行为」的一个强大工具。无论何时，只要你看见两个subclasses 之中有类似的函数，就可以把它们提升到superclass 。但是如果这些函数并不完全相同呢？此时的你应该怎么办？我们仍有必要尽量避免重复，但又必须保持这些函 数之间的实质差异。

``` js
class Customer {
    constructor(rentals) {
        this._rentals = rentals
        this._name = 'yyy'
    }
    getName() {
        return this._name
    }
    getTotalCharge() {

    }
    getTotalFrequentRenterPoints() {

    }
    statement() {
        const rentals = this._rentals.elements();
        let result = "Rental Record for " + getName() + "\n";
        while (rentals.hasMoreElements()) {
            const each = rentals.nextElement();
            //show figures for this rental
            result += "\t" + each.getMovie().getTitle() + "\t" +
                String.valueOf(each.getCharge()) + "\n";
        }
        //add footer lines
        result += "Amount owed is " + String.valueOf(getTotalCharge()) + "\n";
        result += "You earned " + String.valueOf(getTotalFrequentRenterPoints()) +
            " frequent renter points";
        return result;
    }
    htmlStatement() {
        const rentals = _rentals.elements();
        let result = "<H1>Rentals for <EM>" + getName() + "</EM></H1><P>\n";
        while (rentals.hasMoreElements()) {
            const each = rentals.nextElement();
            //show figures for each rental
            result += each.getMovie().getTitle() + ": " +
                String.valueOf(each.getCharge()) + "<BR>\n";
        }
        //add footer lines
        result += "<P>You owe <EM>" + String.valueOf(getTotalCharge()) + "</EM><P>\n";
        result += "On this rental you earned <EM>" +
            String.valueOf(getTotalFrequentRenterPoints()) +
            "</EM> frequent renter points<P>";
        return result;
    }
}

```

2. 接口不同的相似类
> 假设两个方法做同一件事，却有着不同的签名式。基本也是java的

- 重命名方法
- 搬移方法

### 条件逻辑

**Switch惊悚现身**

- 将条件式替换为多态
``` js
class Customer {
    constructor(type) {
        this._type = type
        this._numberOfCoconuts = 12
        this._isNailed = false
    }
    getBaseSpeed() {
        return 33
    }
    getLoadFactor() {
        return 44
    }
    getSpeed() {
        switch (_type) {
            case EUROPEAN:
               return getBaseSpeed();
            case AFRICAN:
               return getBaseSpeed() - getLoadFactor() * _numberOfCoconuts;
            case NORWEGIAN_BLUE:
               return (_isNailed) ? 0 : getBaseSpeed(_voltage);
        }
        throw new Error("Should be unreachable");
    }
}

```

- 将类型码替换为子类
- 将类型码替换为状态/策略
- 将参数替换为显式方法
- 引入Null对象
> 出现于条件语句 每一个条件都判断了是否为null

## 类间味道
### 数据
1. 基本类型困扰
> 大多数编程环境都有两种数据：结构类型让你将数据组织成有意义的形式；基本类型则是构成结构型别的积木块。
- 将数据值替换为对象
- 抽取类
- 引入参数对象
- 将数组替换为对象
- 将类型码替换为类
- 将类型码替换为子类
- 将类型码替换为状态/策略

2. 数据类
> 所谓Data Class是指：它们拥有一些字段，以及用于訪问这些字段的方法，除此之外一无长物。

- 搬移方法
- 封装字段
- 封装集合

3. 数据泥团
> 数据项就像小孩子：喜欢成群结队地待在一块儿。你经常能够在非常多地方看到同样的三或四个数据项：两个classes内的同样字段、很多方法签名式中的同样參数。这些[总是绑在一起出现的数据]真应该放进属于它们自己的对象中。

- 抽取类
- 引入参数对象
- 保持对象完整

4. 临时字段
> 有时你会看到这种对象：其内某个instance 变量仅为某种特定情势而设。这种代码让人不易理解，由于你通常觉得对象在全部时候都须要它的全部变量。在变量未被使用的情况下推測当初其设置目的，会让你发疯。

- 抽取类
- 引入Null对象

### 继承
1. 拒收的遗赠
> Subclasses应该继承superclass的方法和数据。但假设它们不想或不须要继承，又该怎么办呢？它们得到全部礼物。却仅仅从中挑选几样来玩！

- 将继承替换为委托

2. 不当的紧密性
> 有时候你会看到两个classes过于亲热，花费太多时间去探究彼此的private成分。假设这发生在两个[人]之间。我们不必做卫道之士；但对于 classes，我们希望它们严守清规。

- 搬移方法
- 搬移字段
- 将双向关联改为单向
- 将继承替换成委托

``` js
class Order {
    constructor() {
        this._customer = new Customer() //译注：这是Order-to-Customer link也是本例的移除对象
    }
    getCustomer() {
        return this._customer
    }
    setCustomer(arg) {
        if (_customer != null) {
            _customer.friendOrders().remove(this);
        }
        _customer = arg;
        if (_customer != null) {
            _customer.friendOrders().add(this);
        }
    }
}

class Customer {
    constructor() {
        this._orders = new HashSet()
    }
    addOrder(arg) {
        arg.setCustomer(this);
    }
    friendOrders() {
        return this._orders
    }
}
```

- 隐藏委托

``` js
class Person {
    constructor() {
        this._department = new Department()
    }
    getDepartment() {
        return this._department;
    }
    setDepartment(arg) {
        this._department = arg;
    }
}
class Department {
    constructor() {
        this._chargeCode = 12
        this._manager = '_manager'
    }
    Department(manager) {
        this._manager = manager;
    }
    getManager() {
        return this._manager;
    }
}
const john = new Person()

manager = john.getDepartment().getManager();

to 

getManager() {
    return this._department.getManager();
}
```
> 如果客户希望知道某人的经理是谁，他必须先取得Department对象


3. 懒惰类
> 你所创建的每个class，都得有人去理解它、维护它，这些工作都是要花钱的。

- 内联类
同上
- 折叠继承体系

### 职责
1. 依恋情结
> 我们会看到某个方法为了计算某值，从还有一个对象那儿调用差点儿半打的取值方法。最根本的原则是：将总是一起变化的东西放在一块儿。［数据］和[引用这些数据]的行为总是一起变化的。

- 搬移方法
- 搬移字段
- 抽取方法

2. 过渡耦合的消息链

> 假设你看到用户向一个对象索求还有一个对象，然后再向后者索求还有一个对象，然后再索求还有一个对象……这就是Message Chain。实际代码中你看到的可能是一长串getThis()或一长串暂时变量。採取这样的方式，意味客户将与查找过程中的航行结构紧密耦合。

- 隐藏委托

3. 中间人
> 人们可能过度运用delegation。你或许会看到某个class接口有一半的方法都托付给其他class，这样就可能是过度运用。

- 移除中间人
- 内联方法
- 将委托替换为继承


### 协调变化
1. 发散式改变
> 我们希望软件可以更easy被改动——毕竟软件再怎么说本来就该是[软]的。
一旦须要改动，我们希望可以找到系统的某一点，仅仅在该处做改动。
Divergent Change是指[一个class受多种变化的影响]
Shotgun Surgery是指[一种变化引发多个classes对应改动]。

- 抽取类

2. 霰弹式修改
> Shotgun Surgery类似Divergent Change。但恰恰相反。假设每遇到某种变化，你都必须在很多不同的class内做出很多小改动以响应之。你所面临的坏味道就是Shotgun Surgery。假设须要改动的代码散布四处。你不但非常难找到它们。也非常easy忘记某个重要的改动。


- 搬移方法
- 搬移字段
- 内联类

3. 并行继承体系
> Parallel Inheritance Hierarchies事实上是Shotgun Surgery的特殊情况。在这样的情况下。每当你为某个class添加一个subclass，必须也为其它已实现的兄弟class对应添加一个subclass。
> 假设一个class的所得不值其身份。它就应该消失。
> 继承往往造成过度亲热，由于subclass对superclass的了解总是超过superclass的主观愿望。假设你认为该让这个孩子独自生活了，请运用Replace Inheritance with Delegation让它离开继承体系。

- 搬移方法
- 搬移字段

### 库类
**不完备的库类**
1. 引入外来方法
2. 引入本地扩展




[](https://www.kancloud.cn/sstd521/refactor/194212)
- [ ] https://www.jianshu.com/p/80eec4147835
- [ ] https://my.oschina.net/jtzen9/blog/1546821
- [ ] https://blog.csdn.net/lovelion/article/details/9889095
- [ ] https://blog.csdn.net/lovelion/article/details/9301691