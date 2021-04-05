//@ts-check
let targetElement
let difX, difY, initialX, initialY
let initialUserSelect
let activeTargetDrop
let dragData
let grid = [1,1]
let mouseX
let mouseY
let deslocX
let deslocY

function round(p, n) {
    return p % n < n / 2 ? p - (p % n) : p + n - (p % n)
}

function createEvent(){
    return {
        data  : dragData,
        difX  : difX,
        difY  : difY,
        mouseX: mouseX,
        mouseY: mouseY,
        deslocX: deslocX,
        deslocY: deslocY,
        cancel: false,
        targetElement: targetElement,
        targetDrop: activeTargetDrop
    }
}

function dispatch(target, name, event = null) {
    let i, fn, attr, attrs

    if (!target){
        return
    }

    name = `on${name.toLowerCase()}`
    attrs = target.attributes
    
    for (i = 0; i < attrs.length; i++){
        attr = attrs[i]
        fn = window[attr.value]

        if (attr.name == name && typeof(fn) == 'function') {
            // @ts-ignore
            fn(event)
        }
    }

    fn = target[name]
    if (typeof(fn) == 'function') {
        fn(event)
    }
}

function isDraggable(element){
    return element.hasAttribute('drag-enabled')
}

function disableSelection(){
    if (initialUserSelect === undefined){
        initialUserSelect = document.body.style['user-select']
    }
    document.body.style['user-select'] = 'none'
}

function enableSelection(){
    document.body.style['user-select'] = initialUserSelect
}

function onMouseDown(event) {
    let t = event.target
    let r, evt

    if (targetElement){
        onMouseUp()
        targetElement = null
    }

    while (t.parentNode && t != document.body) {
        if (t.getAttribute('drag-enabled') == 'false'){
            return
        }

        if (isDraggable(t)) {
            targetElement = t

            r = targetElement.getBoundingClientRect()

            difX = event.pageX - r.left
            difY = event.pageY - r.top
            initialX = event.pageX
            initialY = event.pageY
            targetElement.initialOffsetLeft = targetElement.offsetLeft
            targetElement.initialOffsetTop = targetElement.offsetTop

            if (targetElement.getAttribute('drag-enabled') == 'clone'){
                targetElement = targetElement.cloneNode(true)
                targetElement.__isClone = true
            }

            evt = {target:targetElement}
            dispatch(targetElement, 'dragBeforeStart', evt)
            evt.target.__isClone = targetElement.__isClone
            targetElement = evt.target

            // targetElement.ondragstart = function() {
            //     return false
            // }
            
            document.addEventListener('mouseup', onMouseUp)
            document.addEventListener('mousemove', onMouseMove)
            
            return
        }
    

        t = t.parentNode
    }
}

function onMouseUp() {
    let evt = createEvent()

    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mousemove', onMouseMove)

    enableSelection()

    if (targetElement.__drag_started){
        dispatch(targetElement, 'dragEnd', evt)
    }

    if (activeTargetDrop){
        activeTargetDrop.removeAttribute('drop-over')
        dispatch(targetElement, 'drop', evt)
        dispatch(activeTargetDrop, 'drop', evt)
        activeTargetDrop = null
    }

    targetElement.removeAttribute('drag-moving')
    targetElement.removeAttribute('droppable')
    targetElement.__drag_started = false

    if (targetElement.__isClone && targetElement.parentNode){
        targetElement.parentNode.removeChild(targetElement)
    }

    dragData = null
    targetElement = null
}

function onMouseMove(event) {
    let rect, targetDrop, targetMouseOver, gd, x, y, dropName, evt
    
    deslocX = event.pageX - initialX
    deslocY = event.pageY - initialY
    mouseX = event.pageX
    mouseY = event.pageY
    
    evt = createEvent()
    
    // encontra o target drop
    if (!targetElement.__display){
        targetElement.__display = targetElement.style.display
    }
    targetElement.style.display = 'none'
    targetDrop = targetMouseOver = document.elementFromPoint(event.pageX, event.pageY)
    targetElement.style.display = targetElement.__display
    evt.target = targetDrop // element que o mouse está dentro
    
    if (targetDrop){
        targetDrop = targetDrop.closest('[drop-enabled]')
        if (targetDrop){ 
            evt.targetDrop = targetDrop
            dropName = targetDrop.getAttribute('drop-enabled')
            
            if (targetElement.getAttribute('drop-target') && targetElement.getAttribute('drop-target') != dropName){
                evt.targetDrop = targetDrop = null
            } else {
                // posição do mouse dentro target drop
                rect = targetDrop.getBoundingClientRect()
                evt.dropX = mouseX - rect.left
                evt.dropY = mouseY - rect.top
                
                // posição do mouse dentro do elemento mouseover
                rect = targetMouseOver.getBoundingClientRect()
                evt.dropChildX = mouseX - rect.left
                evt.dropChildY = mouseY - rect.top
            }
        }
    }

    if (!targetElement.__drag_started) {
        disableSelection()

        if (targetElement.getAttribute('drag-container') != 'self'){
            document.body.appendChild(targetElement)
        }
        
        targetElement.setAttribute('drag-moving', '')
        targetElement.__drag_started = true
        dragData = {}
        gd = targetElement.parentNode.getAttribute('drag-grid')
        if (gd){
            grid = gd.split(',')
            grid.forEach((n, i, a) => {
                a[i] = Number(n)
            })
        } else {
            grid = [1, 1]
        }
        
        dispatch(targetElement, 'dragStart', {
            targetElement,
            data: dragData,
            target: targetElement,
            targetOrigin: event.target
        })
    }

    x = targetElement.parentNode == document.body ? mouseX - difX : targetElement.initialOffsetLeft + deslocX 
    y = targetElement.parentNode == document.body ? mouseY - difY : targetElement.initialOffsetTop + deslocY
    
    x = round(x, grid[0])
    y = round(y, grid[1])

    evt.x = x
    evt.y = y

    dispatch(targetElement, 'dragMove', evt)
    
    if (evt.cancel !== true) {

        // posiciona o elemento
        targetElement.style.zIndex = 9999999
        targetElement.style.position = 'absolute'
        targetElement.style.margin = 0
        targetElement.style.top = `${evt.y}px`
        targetElement.style.left = `${evt.x}px`
    }

    dispatch(targetElement, 'dragAfterMove', evt)

    if (activeTargetDrop && activeTargetDrop != targetDrop){
        // saiu da drop zone
        evt.targetDrop = activeTargetDrop
        activeTargetDrop.removeAttribute('drop-over')
        targetElement.removeAttribute('droppable')

        dispatch(activeTargetDrop, 'dropExit', evt)
        dispatch(targetElement, 'dropExit', evt)
        activeTargetDrop = null
    }

    if (targetDrop && targetDrop != activeTargetDrop){
        // entrou na drop zone
        targetDrop.setAttribute('drop-over', '')
        targetElement.setAttribute('droppable', '')
        activeTargetDrop = targetDrop
        dispatch(activeTargetDrop, 'dropEnter', evt)
        dispatch(targetElement, 'dropEnter', evt)
    }

    event.preventDefault()
}

document.addEventListener('mousedown', onMouseDown)
