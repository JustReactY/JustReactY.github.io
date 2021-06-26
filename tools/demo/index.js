import SingletonUser1 from './SingletonUser1.js';
import SingletonUser2 from './SingletonUser2.js';
import SingletonUser3 from './SingletonUser3.js';

import singletonInstance from "./Singleton.js"

console.log("counter value: " + singletonInstance.getCounter());
singletonInstance.increase();
console.log("counter value: " + singletonInstance.getCounter());