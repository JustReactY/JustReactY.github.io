// interface object
interface User {
    name: string
    age?: number
    // readonly id: number
}
function printUser(user): void{
    console.log(user.name, ':', user.age);
}
const user1 = {
    // name: '小刘',
    age: 23,
};
printUser(user1);


//interface function 函数类型
interface UserFun {
    (name: string, age: number): void;
}
// 
const myFunction:UserFun = (name, age)=>{
    console.log('SetUser');
    console.log(name, ':', age);
}
// myFunction(1, 2);
myFunction('1', 2);


// 可索引的类型
// interface StringArray {

//     [index: number]: string;

// }

// let myArray: StringArray;

// myArray = ["Bob", "Fred"];

// let myStr: string = myArray[0];

/*
interface UserArr{
    //定义索引key为number类型，索引值为string类型
    [index:number]:string
}

var arr1:UserArr;
 arr1=["aa","bb","cc"];
var arr2: UserArr
 arr2={1:"hello",2:"world"};
console.log(arr1);
console.log(arr2);
*/


// function aaa(arg:string): string{
//     return arg;
// }
// function aaa(arg: number):number{
//     return arg;
// }
// ->


// interface User {
//     name: string
//     age?: number
//     // readonly id: number
// }
function aaa<T>(arg:T):T{
   
    return arg;
}
// aaa('sad')


class class1<T>{
    
}
