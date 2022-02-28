
**地址**

http://live.vhall.com/886126954

01:35 loader、plugin

loader 
可同步可异步 

```
module.exports = function(content, map, meta) {
    return content

    or

    setTimeout(() => {
        callback(null, content, map, meta)
    }, 1000)
}
```