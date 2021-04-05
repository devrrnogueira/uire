import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import ResizeCapture from '../util/resizecapture'

import './UIScrollbar.css'

export default function UIScrollbar({
    targetRole,
    largeStep=17,
    autoShow=false
}) {
    const ref = useRef()
    const [slideSize, setSlideSize] = useState(0)
    const [slidePosition, setSlidePosition] = useState(0)

    useLayoutEffect(()=>{
        let target = getTarget()

        if (target) {
            ref.current.firstChild.ondragmove = onDragMove
            
            target.onscroll = (e) => {
                render(e.target.scrollTop)
            }

            render(target.scrollTop)
        }
    
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        function onresize() {
            render(null)
        }

        ResizeCapture.observe(onresize)

        return () => {
            ResizeCapture.unobserve(onresize)
        }
    // eslint-disable-next-line
    }, [])

    function onDragMove(event) {
        let pos = event.y
        
        event.cancel = true
        
        render(pos)
    }

    function render(pos) {
        let f, h, trackSize
        let target = getTarget()

        if (target) {
            trackSize = ref.current
            f = target.scrollHeight - target.offsetHeight
            h = target.offsetHeight - f
            
            //height do slide
            // size = Math.max(parseInt(this._trackSize * (this._canvasSize / this._scrollSize), 10), 15);
            
            // posição y do slide
            // i = (this._value * 100) / max;
            // pos = parseInt(((i * (this._trackSize - size)) / 100), 10);

            if (pos === null) pos = target.scrollTop
            if (pos < 0) pos = 0
            if (pos > target.offsetHeight - h) pos = target.offsetHeight - h

            setSlidePosition(-pos)
            setSlideSize(h)

            ref.current.style.display = (h >= target.offsetHeight) ? 'none' : ''
            target.scrollTop = pos
        }
    }

    function renderByValue(value) {
        let f, h, trackSize, canvasSize, scrollSize
        let target = getTarget()

        if (target) {
            trackSize = ref.current
            
            f = target.scrollHeight - target.offsetHeight
            h = target.offsetHeight - f
            
            //height do slide
            // size = Math.max(parseInt(this._trackSize * (this._canvasSize / this._scrollSize), 10), 15);
            
            // posição y do slide
            // i = (this._value * 100) / max;
            // pos = parseInt(((i * (this._trackSize - size)) / 100), 10);

            if (pos === null) pos = target.scrollTop
            if (pos < 0) pos = 0
            if (pos > target.offsetHeight - h) pos = target.offsetHeight - h

            setSlidePosition(-pos)
            setSlideSize(h)

            ref.current.style.display = (h >= target.offsetHeight) ? 'none' : ''
            target.scrollTop = pos
        }
    }

    function getTarget() {
        let target
        let el = ref.current

        if (el && targetRole) {
            target = el.parentNode.querySelector(targetRole)
        }

        return target
    }

    if (typeof window.orientation !== 'undefined') {
        return null    
    }

    return (
        <div ref={ref} className="ui-scrollbar">
            <div className="ui-scrollbar-slider"
                drag-enabled=""
                drag-container="self"
                style={{
                    top: -slidePosition,
                    height:slideSize
                }}
            ></div>
        </div>
    )
}
