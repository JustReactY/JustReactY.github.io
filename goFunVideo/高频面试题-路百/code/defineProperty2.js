
// ![](./assets//mvvm-proxy.jpeg)

const observeStore = new Map()

function makeObsevable(target) {
    const handlerName = Symbol('handler')
    observeStore.set(handlerName, [])

    target.observe = (handler) => {
        observeStore.get(handlerName).push(handler)
    }

    const proxyHandler = {
        get(target, property, receive) {
            if(typeof target[property] === 'object' && target[property] !== null) {
                return new Proxy(target[property], proxyHandler)
            }
            const success = Reflect.get(...arguments)
            if(success) {
                observeStore.get(handlerName).forEach(handler => handler('GET', property, target[property]))
            }
            return success
        },
        set(target, property, value, receive) {
            const success = Reflect.set(...arguments)
            if(success) {
                observeStore.get(handlerName).forEach(handler => handler('SET', property, target[property]))
            }
            return success
        },
        deleteProperty(target, property) {
            const success = Reflect.deleteProperty(...arguments)
            if(success) {
                observeStore.get(handlerName).forEach(handler => handler('DELETE', property))
            }
            return success
        }
    }

    return new Proxy(target, proxyHandler)
}

let user = {};

user = makeObsevable(user);

user.observe((action, key, value) => {
    console.log(`${action} key=${key} value=${value || ''}`);
})

user.name = 'john'; // SET key=name value=john
console.log(user.name) // GET key=name value=john // john
delete user.name; 'DELETE key=name value=' 