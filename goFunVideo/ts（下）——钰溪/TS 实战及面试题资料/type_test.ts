let a = 1024;
let b = '1024';
// const c = 'apple';
const c = null;
const dd = [true, false, true];
let e =  { name: 'apple'}
const f = null;
// c = 'apple1'
let g;
// let h = [1 ,false];
// let hh:[number, boolean] = [1 ,false];
/**

 **/

let aa = 1024;
let aa1:number = 1024;
aa = aa1;   // ??
aa1 = aa;   // ??

let bb:string = 'bb';
let bb1:string | number = 'bb1';

bb = bb1;  // ??
bb1 = bb;  // ??
bb1 = 2;  // ??
bb = bb1;   // ??

let i:3 = 3;
i = 4;

let j=[1,2,3]
j.push(4)
j.push('5')


let bbbbb ; 
bbbbb = []

bbbbb.push('c')

//
const foo = 123;
if (foo !== 123) {
    const bar = foo;    // bar: never
}


// 1
type Options= {
    baseURL: string
    cacheSize?: number
    env?: 'prod' | 'dev'
}
// 2
class API {
    constructor(options: Options){}
}
// 3
new API({
    baseURL: 'http://myapi.site.com',
    env: 'prod'
})
// 4
new API({
    baseURL: 'http://myapi.site.com',
    badEnv: 'prod'
})
// 5
new API({
    baseURL: 'http://myapi.site.com',
    badEnv: 'prod'
} as Options)
// 6
let badOptions = {
    baseURL: 'http://myapi.site.com',
    badEnv: 'prod'
}
new API({
    baseURL: 'http://myapi.site.com',
    badEnv: 'prod'
})
// 7
let options: Options = {
    baseURL: 'http://myapi.site.com',
    badEnv: 'prod'
}
new API(badOptions)
