
// ![](./assets//mvvm-array.jpeg)

const render = (Action, ...args) => {
    console.log(`Action = ${Action} val=${args.join(',')}`)
}

const arrProtoType = Array.prototype;
const newArrPrototype = Object.create(arrProtoType);

['push', 'splice'].forEach(methodName => {
    newArrPrototype[methodName] = function() {
        arrProtoType[methodName].call(this, ...arguments);

        render(methodName, arguments)
    }
})

const reactive = (obj) => {
    if(Array.isArray(obj)) {
        obj.__proto__ = newArrPrototype
    }
}


const data = [1, 2, 3, 4]

reactive(data)

data.push(5) // Action = push, args=5
data.splice(0, 2) // Action = splice, args=0,2