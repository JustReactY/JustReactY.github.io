// 数字枚举的声明可以分为两大类，带有初始化器和不带初始化器
// 01-不带初始化器，枚举成员默认从 0 开始，依次递增；
enum NumEnum1 { one, two }
console.log(NumEnum1.one) // => 0
console.log(NumEnum1.two) // => 1
// 02-带有初始化器，这种又可以分为两种：
// 02-01-使用初始化器并指定初始化的常数，
// 未使用初始化器的成员取值是在上一个成员的基础上 +1；
enum NumEnum2 {
  one = 10,
  two,
  three = 20,
  four
}
console.log(NumEnum2.two)  // => 11
console.log(NumEnum2.four) // => 21
// 02-02-使用初始化器并且初始化值是对已经声明的枚举的枚举成员的引用
enum NumEnum3 {
  one = NumEnum2.four,
  two
}
console.log(NumEnum3.one) // => 21
console.log(NumEnum3.two) // => 22


enum NumEnum {
    one = 'the one',
    two = 'the one',
    // three,
}



// enum NumEnum2 {
//   one = 10,
//   two,
//   three = 20,
//   four
// }