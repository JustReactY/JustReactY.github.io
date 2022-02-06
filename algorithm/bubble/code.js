function sort(arr) {
    if(!Array.isArray(arr)) return
    let len = arr.length
    for(let i = 0;i < len ; i++) {
        for(let j = 0 ; j< len - 1 - i; j++) {
            console.log(i , j)
            if(arr[j] > arr[j+1]) {
                let result = arr[j]
                arr[j] = arr[j+1]
                arr[j + 1] = result
            }
        }
    }
    return arr
}

console.log(sort([1, 3, 4, 6, 7, 2]))