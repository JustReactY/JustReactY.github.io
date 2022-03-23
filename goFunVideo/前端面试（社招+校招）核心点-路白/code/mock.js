const urls = [
    {
        info: 'link1',
        time: 3000
    },
    {
        info: 'link2',
        time: 1000
    },
    {
        info: 'link3',
        time: 5000
    },
    {
        info: 'link4',
        time: 2000
    },
]


const loadImg = ({info, time} = {}) => {
    return new Promise((resolve, reject) => {
        if(!info) reject()
        console.log(`${info} start`)
        setTimeout(() => {
            resolve()
            console.log(`${info} end`)
        }, time)
    })
}


module.exports = {
    urls,
    loadImg
}
