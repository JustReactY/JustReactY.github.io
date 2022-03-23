const { urls, loadImg } = require('./mock.js');

class PromiseQueue {
    constructor(options = {}) {
        this.max = options.max || 1
        this.paddingList = []
        this.count = 0
    }
    add(task) {
        this.paddingList.push(task)
        this.run()
    }
    run() {
        if(!this.paddingList.length || this.count >= this.max) return
        this.count++
        let fn = this.paddingList.shift()
        let promise = fn()
        promise.then(this.hasDoneOne.bind(this)).catch(this.hasDoneOne.bind(this))
    }
    hasDoneOne() {
        this.count--
        this.run()
    }
}

const queue = new PromiseQueue({
    max: 3
})

urls.forEach(url => {
    queue.add(() => loadImg(url))
})
