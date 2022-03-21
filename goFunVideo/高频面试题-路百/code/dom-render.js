// ![](./assets/dom-render.jpeg)

function render(vnode) {
    if(typeof vnode === 'number') {
        vnode = String(vnode);
    }
    if(typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }

    const { tag, attrs, children } = vnode || {}
    if(!tag) return false
    let element = document.createElement(tag)
    
    if(attrs) {
        Object.keys(attrs).forEach(key => {
            element.setAttribute(key, attrs[key])
        })
    }
    if(Array.isArray(children) && children.length) {
        chuildren.forEach(childre => {
            element.appendChild(render(childre))
        })
        
    }
    return element
}