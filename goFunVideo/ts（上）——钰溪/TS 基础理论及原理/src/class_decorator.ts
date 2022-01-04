// 定义装饰器工厂
function logClass(target: any) {
    console.log(target);
  
  　// 把类的构造函数作为参数传入，并修改构造函数
    return class extends target {
      // 修改当前类的构造函数
      apiUrl: any = "我是在装饰器里面修改后的apiUrl"
      // 修改方法
      getData() {
        this.apiUrl = this.apiUrl + '=====';
        console.log(this.apiUrl);
      }
    }
  }
  
  @logClass
  class HttpClient {
  
    public apiUrl: string | undefined;
    constructor() {
      this.apiUrl = "我是构造函数里面的apiUrl"
    }
    getData() {
      console.log(this.apiUrl);
    }
  }
  
  let http = new HttpClient();
  http.getData();