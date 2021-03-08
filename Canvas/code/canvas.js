window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    // ctx.fillRect(100, 100, 200, 200)

    // ctx.strokeStyle = 'red'
    // ctx.lineWidth = 5
    // ctx.strokeRect(100, 100, 200, 200)
    // ctx.strokeStyle = 'blue'
    // ctx.lineWidth = 2
    // ctx.strokeRect(200, 200, 200, 200)

    // ctx.beginPath()
    // ctx.moveTo(100, 100)
    // ctx.lineTo(200, 100)
    // ctx.lineTo(200, 150)
    // ctx.closePath()
    // ctx.stroke()

    let painting = false

    function startPosition(e) {
        painting = true
        draw(e)
    }

    function finishedPosition() {
        painting = false
        ctx.beginPath()
    }

    function draw(e) {
        if(!painting) return
        ctx.lineWidth = 10
        ctx.lineCap = 'round'

        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
        ctx.moveTo(e.clientX, e.clientY)
    }

    window.addEventListener('mousedown', startPosition)
    window.addEventListener('mousemove', draw)
    window.addEventListener('mouseup', finishedPosition)
})