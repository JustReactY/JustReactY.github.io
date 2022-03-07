# dom diff

1. 只有同层比较 通过patch函数比较新老节点 并打好补丁
3. 从两侧向中间比较
4. 如果新节点没有、老节点有 删除老节点
5. 如果老节点没有、新老节点有 新增节点
6. 如果新老节点都存在，且完全一样 通过patchVnode 比较孩子节点
7. 如果新节点孩子不是文本节点 且新老孩子同时存在 且不相等 通过updatechildren更新当前节点孩子
    没有老孩子 有新孩子 通过add新增
    没有新孩子 有老孩子 通过remove移除
    没有新孩子、没有老孩子、老的还是文本节点 直接移除
8. 如果新节点孩子是文本节点 且和老节点孩子不同 直接替换


**updatechildren** 
1. 通过 双指针比较
2. oldStartIndex、oldEndIndex、newStartIndex、newEndIndex 四个抓手
3. 通过while循环递归调用patch，唯一出口为 oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex
4. 循环跳出后 如果 oldStartIndex > oldEndIndex 说明老的先汇合 说明新的多 剩下的直接add
5. 循环跳出后 如果 newStartIndex > newEndIndex 说明新的先汇合 说明老的多 剩下的直接remove
6. 循环内 如果初始oldStartIndex老节点不存在 则oldStartIndex += 1 
7. 循环内 如果初始oldEndIndex老节点不存在 则oldEndIndex -= 1 
8. 循环内 如果初始oldStartIndex老节点 === 如果初始newStartIndex新节点 递归调用updatechildren 再分别 ++
9. 循环内 如果初始oldEndIndex老节点 === 如果初始newEndIndex新节点 递归调用updatechildren 再分别--
10. 循环内 如果初始oldStartIndex老节点 === 如果初始newEndIndex新节点 递归调用updatechildren 并将oldStartIndex老节点 移动到newEndIndex对应老节点位置
11. 循环内 如果初始oldEndIndex老节点 === 如果初始newStartIndex新节点 递归调用updatechildren 并将oldEndIndex老节点 移动到newStartIndex对应老节点位置
12. 循环内 如果都对不上 则将剩余节点做n^2复杂度对比 即 拿出第一个 依次对比至最后一个
