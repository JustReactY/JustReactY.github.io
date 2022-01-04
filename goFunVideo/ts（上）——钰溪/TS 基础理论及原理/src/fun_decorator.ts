function GET(url: string) {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        !target.$Meta && (target.$Meta = {});
        target.$Meta[methodName] = url;
    }
}

class HelloService {
    constructor() { }
    @GET("xx")
    getUser() { }
}