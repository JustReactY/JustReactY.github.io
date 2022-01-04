// // 父类 Animal
// class Animal {
//     public name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// 	// 定义一个方法，具体不做实现，子类自己实现
//     eat() {
//         console.log('function: eat');
//     }
// }

// // 子类 Dog
// class Dog  extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
//     // 自行实现父类定义的 eat 方法
//     eat() {
//         console.log(`${this.name}吃肉。`);
//     }
// }

// // 子类 Cat
// class Cat extends Animal {
//     constructor(name: string) {
//         super(name);
//     }
//     // 自行实现父类定义的 eat 方法
//     eat() {
//         console.log(`${this.name}吃鱼。`);
//     }
// }

// var d = new Dog('小狗');
// d.eat();  // 小狗吃肉。
// var c = new Cat('小猫');
// c.eat();  // 小猫吃鱼。
