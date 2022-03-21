
// ![](./assets//mvvm-code.jpeg)

const render = (key, val) => {
    console.log(`SET key=${key} val=${val}`)
}

const observeReactive = (obj, key, val) => {
    reactive(val)
    Object.defineProperty(obj, key, {
        get() {
            return val
        },
        set(newVal) {
            if (newVal === val) {
                return
            }
            val = newVal
            render(key, val)
        }
    })
}

const reactive = (obj) => {
    if (typeof obj === 'object') {
        for (const key in obj) {
            observeReactive(obj, key, obj[key])
        }
    }
}


const data = {
    a: 1,
    b: 2,
    c: {
        c1: {
            af: 999
        },
        c2: 4
    }
}

reactive(data)

data.a = 5 // SET key=a val=5
data.c.c2 = 4 //
data.c.c1.af = 121 // SET key=af val=121