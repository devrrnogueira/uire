
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CSSTransition from 'src/libs/csstransition'
import ResizeCapture from "src/libs/resizecapture";

import './UIDrawer.css'

const positions = {
    mobile: 'fixed',
    desktop: 'relative'
}

const zIndexs = {
    mobile: 1000,
    desktop: null
}

export default function UIDrawer({
    children,
    autoClose=true,
    open=false,
    side='left',
    bg="grey-10",
    mode='mobile',
    breakpoint=960, //tamanho em px que o componente assume o modo mobile
    overlay=true, //exibe/oculta o fundo
    className,
    onClose,
    onChange
}) {
    const ref = useRef()
    const [sMode, setMode] = useState(mode)
    
    let position = positions[sMode]
    let zIndex = zIndexs[sMode]
    
    useLayoutEffect(() => {
        breakpointCheck()
        doTransition()
    // eslint-disable-next-line
    }, [open])

    useEffect(() => {
        if (!breakpoint) {
            return
        }

        function onResize() {
            let opened = ref.current.style.display != 'none'

            breakpointCheck()
            endTransation(opened)
        }

        ResizeCapture.observe(onResize, true)

        return () => {
            ResizeCapture.unobserve(onResize)
        }
    // eslint-disable-next-line
    }, [])

    function onClick(e) {
        if (autoClose && sMode=='mobile' && e.target.closest('[clickable]')) {
            onOverlayClick()
        }
    }

    function doTransition() {
        let drawerEl = ref.current
        let overlayEl = drawerEl.previousSibling
        let widht = getWidth()
        let start = open ? `-${widht}px` : 0
        let end = open ? 0 : `-${widht}px`
        
        drawerEl.style.display = ''
        overlayEl.style.display = ''

        CSSTransition()
            .paralell()
            .rule(overlayEl, 'fade', open ? 'enter' : 'exit')
            .property(drawerEl, 'margin-left', start, end, 2000)
            .run(()=>{
                endTransation(open)
                onChange && onChange(true)
            })
    }

    function endTransation(opened) {
        let drawerEl = ref.current
        let overlayEl = drawerEl.previousSibling
        let display = opened ? '' : 'none'
        
        overlayEl.style.display = display
        drawerEl.style.display = display
    }

    function onOverlayClick() {
        onClose && onClose(false)
    }

    function breakpointCheck() {
        let width
        
        if (!breakpoint) {
            return
        }

        width = sMode == 'desktop' 
            ? document.body.offsetWidth
            : ref.current.parentNode.offsetWidth
        
        if (mode == 'mobile') {
            setMode(width > breakpoint ? 'desktop' : 'mobile')
        } else {
            setMode(width < breakpoint ? 'desktop' : 'mobile')
        }
    }

    function getWidth() {
        let width
        let drawerEl = ref.current
        let display = drawerEl.style.display
        
        drawerEl.style.display = ''
        width = drawerEl.offsetWidth
        drawerEl.style.display = display
        
        return width
    }
    
    return (
        <>
            <div
                className="ui-drawer-overlay"
                style={{
                    display: sMode=='desktop' ? 'none' : 'block',
                    zIndex,
                    position
                }}
                onClick={onOverlayClick}
            />

            <aside ref={ref} 
                style={{
                    zIndex,
                    position
                }}
                className={`ui-drawer bg-${bg} ui-drawer-${side}${className}`}
                onClick={onClick}
            >
                { children }
            </aside>
        </>
    )
}
