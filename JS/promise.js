function Promise1(fn) {
    this.cbs = []

    const resolve = value => {
        // console.log(this, value, '===this==')
        setTimeout(() => {
            console.log(this, this.cbs.length,value, '===this==')
            this.data = value
            this.cbs.forEach(cb => cb(value))
        })
    }

    fn(resolve)
}

Promise1.prototype.then = function (onResolved) {
    return new Promise1(resolve => {
        this.cbs.push(() => {
            const res = onResolved(this.data)
            if (res instanceof Promise1) {
                res.then(resolve)
            } else {
                resolve(res)
            }
        })
    })
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