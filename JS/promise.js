const PADDING = 'padding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise1 {
    constructor(fn) {
        this.status = PADDING
        this.value = null
        this.reason = null

        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        if (this.status === PADDING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    reject(reason) {
        if (this.status === PADDING) {
            this.reason = reason
            this.status = FUREJECTEDLFILLED
        }
    }
}


new Promise1((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
})
    .then((res) => {
        console.log(res);
        return new Promise1((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 500);
        });
    })
    // .then(() => console.log(3));