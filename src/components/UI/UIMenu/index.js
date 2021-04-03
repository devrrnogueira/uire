import { useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import csstransition from 'src/libs/csstransition2'
import DOM from 'src/libs/dom'

import './UIMenu.css'

const anchors = {
    'left-bottom':  'left|bottom right|top',
    'right-bottom': 'right|bottom left|bottom',
    'left-top':     'left|top right|bottom',
    'right-top':    'right|top left|bottom',
    'center-top':   'center|top left|bottom right',
}

export default function UIMenu({
    children,
    className,
    style=null,
    show=false,
    parent=null,
    transition=null,
    transparent=false,
    autoClose=true,
    transitionShow=null, 
    transitionHide=null,
    anchor="left-bottom",
    onClose
}) {
    const menuEl = useRef()
    const overlayEl = useRef()
    const domRef = useRef()

    useLayoutEffect(() => {
        show ? showComponent() : hideComponent()
    // eslint-disable-next-line
    }, [show])

    function onClick(e) {
        if (autoClose && e.target.closest('[clickable]')) {
            hideComponent()
        }
    }

    function showComponent() {
        let r
        let menu = menuEl.current
        let overlay = overlayEl.current

        if (!menuEl.current.init) {
            menuEl.current.init = true
            complete()
        } else {
            r = setPosition()

            if (transition) {
                r = transition
            }
            
            csstransition(menu)
                .run([`menu-${r}-enter`, `menu-${r}-active`], complete) 
        }

        function complete(){
            overlay.style.display = 'block'
        }
    }

    function hideComponent() {
        let menu = menuEl.current
        let overlay = overlayEl.current
        
        if (menu.style.display == 'none') {
            return
        }

        if (!menuEl.current.init) {
            menuEl.current.init = true
            complete()
        } else {
            csstransition(menu)
                .run('fade-out-active', complete)
        }

        function complete() {
            overlay.style.display = 'none'
            menu.style.display = 'none'

            onClose && onClose()
        }
    }

    function setPosition() {
        let r2, r
        let menu = menuEl.current
        let parentEl = getParent()

        menu.style.display = ''

        //r1 = menu.getBoundingClientRect()
        r2 = parentEl.getBoundingClientRect()
        
        r = DOM.positionByRect({
            target: menu,
            rect: r2,
            position: anchors[anchor]
        })

        return r.leftPos + '-' + r.topPos

        //return r1
    }

    function getParent() {
        return parent ? parent.current : domRef.current.parentNode
    }

    if (!anchors[anchor]) {
        throw new Error(`UIMenu error, prop anchor is invalid`)
    }

    return (
        <>
            <span ref={domRef} ui-menu="" />
            <MenuPortal
                className={className}
                style={style}
                overlayEl={overlayEl}
                menuEl={menuEl}
                transparent={transparent}
                onOverlayClick={hideComponent}
                onMenuClick={onClick}
            >
                {children}
            </MenuPortal>
        </>
    )
}

function MenuPortal({
    children,
    className="",
    style,
    overlayEl,
    menuEl,
    transparent,
    onOverlayClick,
    onMenuClick
}) {
    return createPortal(
        <>
            <div ref={overlayEl} className="ui-menu-overlay" onClick={onOverlayClick} />
            <div ref={menuEl}
                style={style}
                className={`ui-menu ${transparent?' ui-menu-transparent': ''} ${className}`}
                onClick={onMenuClick}
            >
                { children }
            </div>
        </>,

        document.body
    )
}