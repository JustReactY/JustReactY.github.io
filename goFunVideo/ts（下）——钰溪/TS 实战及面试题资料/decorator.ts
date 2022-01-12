// 类装饰器
// function Log(target:any) {
//     console.log(target);
//     console.log("in log decorator");
// }

// @Log
// class A {
//     constructor(){
//         console.log("constructor")
//         // logger.log('ddd');
//     }
// }
// new A();

// 方法装饰器
function GET(url: string) {
    console.log('entry GET decorator');
    return function (target:any, methodName: string, descriptor: PropertyDescriptor) {
        console.log('entry GET decorator function');
        !target.$Meta && (target.$Meta = {});
        target.$Meta[methodName] = url;
    }
}

class HelloService {
    constructor() {
        console.log("constructor")
    }
    @GET("xx")
    getUser() {
        console.log('getUser function called');
    }
}
new HelloService().getUser();
// console.log((<any>HelloService).$Meta);
// console.log((new HelloService() as any).$Meta);

// // 方法参数装饰器
// function PathParam(paramName: string) {
//     return function (target:any, methodName: string, paramIndex: number) {
//         !target.$Meta && (target.$Meta = {});
//         target.$Meta[paramIndex] = paramName;
//     }
// }

// class HelloService {
//     constructor() { }
//     getUser( @PathParam("userId") userId: string) { }
// }

// console.log((<any>HelloService).prototype.$Meta); // {'0':'userId'}


// 定义类装饰器
// function logClass(params: string) {
//     return function (target: any) {
//       console.log(target);
//       console.log(params);
//     }
//   }
  
// 定义属性装饰器
// function logProperty(params: any) {
// // target--->类的原型对象；attr--->传入的参数url
//     return function (target: any, attr: any) {
//         console.log(target, attr);

//         target[attr] = params
//     }
// }
  
// @logClass('xxxx')
// class HttpClient {
//     @logProperty('http://www.baidu.com')
//     public url: any | undefined;
//     constructor() {

//     }
//     getUrl() {
//         console.log(this.url);
//     }
// }
  
// console.log(new HttpClient().getUrl())
