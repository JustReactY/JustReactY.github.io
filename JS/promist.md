# Promise

**简易版Promise**

案例
``` js
new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });
  })
  .then(console.log);
```

``` js
function Promise1(fn) {
    this.cbs = []

    const resolve = value => {
        setTimeout(() => {
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


```