// Singleton.js
console.log("initialize singletonInstance module");

let counter = 0;

export const singletonInstance = {
  increase: () => {
    counter++;
  },
  getCounter: () => {
    return counter;
  }
}

export default singletonInstance;