
import { useLayoutEffect, useRef } from 'react'
import './UIPage.css'

export default function UIPage({
    children,
    header=null,
    footer=null,
    hideOnScroll=false
}) {
    const rootEl = useRef()
    const headerEl = useRef()
    const contentEl = useRef()

    useLayoutEffect(()=>{
        contentEl.current.style.paddingTop = headerEl.current.offsetHeight + 'px'
    }, [])

    useLayoutEffect(() => {
        let el, maxScroll
        let top = 0
        let lastScrollTop = 0

        function onScroll (event) {
            let target = event.target
            let y = target.scrollTop
            let diff = Math.abs(lastScrollTop - y)
            
            if (y >= 10) {
                document.body.setAttribute('scroll-10', '')
            } else {
                document.body.removeAttribute('scroll-10')
            }

            if (!hideOnScroll) {
                return
            }

            if (y < lastScrollTop) {
                if (top != 0) {
                    top -= diff
                    if (top < 0) {
                        top = 0
                    }

                    render(top)
                }
            } else {
                if (top != maxScroll) {
                    top += diff

                    if (top > maxScroll) {
                        top = maxScroll
                    }

                    render(top)
                }
            }

            lastScrollTop = y <= 0 ? 0 : y
        }

        if (hideOnScroll) {
            maxScroll = headerEl.current.offsetHeight

            el = headerEl.current.querySelector('[visibleonscroll]')
            if (el) {
                maxScroll = maxScroll - (maxScroll - el.offsetTop)
            }
        }

        contentEl.current.addEventListener('scroll', onScroll)

        render(top)

        return () => {
            //TODO: contentEl.current.removeEventListener('scroll', onScroll)
        }

    }, [hideOnScroll])

    function render(top) {
        headerEl.current.style.top = `${-top}px`
    }

    return (
        <div ref={rootEl} className="client vbox ui-page">
            <div ref={headerEl} className="vbox ui-page-header">
                { header }
            </div>

            <div ref={contentEl} className="client overflow ui-page-content">
                { children }
            </div>

            <div className="ui-page-footer">
                { footer }
            </div>
        </div>
    )
}