import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import csstransition from '../../util/csstransition'
import ResizeCapture from "../../util/resizecapture"

import './UIDrawer.css'

const positions = {
    mobile: 'fixed',
    desktop: 'relative'
}

const zIndexs = {
    mobile: 1000,
    desktop: null
}

const contentTransition = {
    left: {
        show: [
            {
                prestate(el, params) {
                    el.style.display = ''
                    params.width = el.offsetWidth
                },
                props: {
                    'margin-left': '-{width}px'
                }
            },
            {
                props: {
                    'duration': 200,
                    'margin-left': '0'
                }
            }
        ],
        hide: [
            null,
            {
                prestate(el, params) {
                    params.width = el.offsetWidth
                },
                props: {
                    'duration': 200,
                    'margin-left': '-{width}px'
                }
            }
        ]
    }
}

const overlayTransition = {
    show: [
        {
            prestate(el) {
                el.style.display = ''
            },
            props: {
                opacity: 0
            }
        },
        {
            props: {
                duration: 200,
                opacity: 1       
            }
        }
    ],
    hide: [
        null,
        {
            props: {
                duration: 200,
                opacity: 0      
            }
        }
    ]    
}

export default function UIDrawer({
    children,
    autoClose=true,
    open=false,
    side='left',
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
        let trans = open?'show':'hide'

        csstransition()
            .add(overlayEl, overlayTransition[trans])
            .add(drawerEl, contentTransition[side][trans])
            .paralell(()=>{
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
                className={`ui-drawer ui-drawer-${side}${className}`}
                onClick={onClick}
            >
                { children }
            </aside>
        </>
    )
}
