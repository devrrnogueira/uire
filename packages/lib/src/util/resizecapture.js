let listeners = {}
let index = 0
let tm

const ResizeCapture = {
    observe(callback, immediate) {
        index++
        callback.__index__ = index
        listeners[index] = callback

        if (immediate) {
            setImmediate(callback)
        }
    },
    unobserve(callback) {
        delete(listeners[callback.__index__])
    },
    emit() {
        clearTimeout(tm)

        tm = setTimeout(()=>{
            for (let k in listeners) {
                listeners[k]()
            }
        }, 100)
    }
}

window.onresize = ResizeCapture.emit

export default ResizeCapture