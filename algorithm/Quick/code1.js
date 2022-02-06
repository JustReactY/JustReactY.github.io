function mysort(arr) {
    if (arr.length <= 1) return arr
    let index = Math.floor(arr.length / 2)
    let pre = arr.splice(index, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i) {
        arr[i] < pre ? left.push(arr[i]) : right.push(arr[i])
    }
    return mysort(left).concat([pre], mysort(right))
}
console.log(mysort([1, 3, 4, 6, 7, 2]))