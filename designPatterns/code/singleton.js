(function () {
    let singleton = (function () {
        let obj = null

        class Singleton {
            constructor() {
                this.name = 'yyy'
            }
            speak() {
                console.log(`my name is ${this.name}`)
            }
            setdata(name) {
                this.name = name
            }
        }

        return {
            interface() {
                if (!obj) obj = new Singleton()
                return obj
            }
        }
    })()

    let jack = singleton.interface()
    let joy = singleton.interface()

    console.log(jack === joy, jack)
})()


