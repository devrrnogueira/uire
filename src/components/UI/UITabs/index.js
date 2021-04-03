import { useLayoutEffect, useRef, useState } from 'react'

import ResizeObserver from "src/libs/resizecapture"
import csstransition from "src/libs/csstransition2"
import UISVGIcon from '../UISvgIcon'

import './UITabs.css'

export function UITabs({
    children,
    className='',
    tab,
    iconAlign='top',
    align='center', // {center|justify} se as abas ficarão justificadas ou centralizadas
    position="top", // {top|bottom}
    onChange,
    ...rest
}) {
    let ref = useRef()
    let indicatorEl = useRef()
    let cls = `hbox ui-tabs ui-tabs-align-${align} ${className}`
    
    const [previousTab, setPreviousTab] = useState(tab)
    const arr = Array.isArray(children) ? children : [children]
    
    useLayoutEffect(()=>{
        // let enter = previousTab < tab ? 'toright' : 'toleft'
        // let exit = previousTab > tab ? 'toleft' : 'toright'
        // let indicator = indicatorEl.current

        function onResize() {
            indicatorRender()
        }

        ResizeObserver.observe(onResize)

        setPreviousTab(tab)

        indicatorRender()

        return ()=>{
            ResizeObserver.unobserve(onResize)
        }

    // eslint-disable-next-line
    }, [tab])

    function onTabClick(index, props) {
        //console.log(index, props)
        onChange && onChange(index, props)
    }

    function indicatorRender() {
        let indicator = indicatorEl.current
        let active = ref.current.childNodes[tab]
        
        indicator.style.left = active.offsetLeft + 'px'
        indicator.style.width = active.offsetWidth + 'px'
    }

    return (
        <div ref={ref} className={cls} {...rest}>
            
            {arr.map(({props}, index) => {
                let cls = "ui-tab" + 
                    (index==tab?' ui-tab-active':'') + 
                    (props.icon?` ui-tab-icon-align-${iconAlign}`:'')

                return (
                    <div
                        key={index}
                        style={props.style} 
                        className={`${cls} ${props.className||''}`}
                        onClick={()=>{onTabClick(index, props)}}
                    >
                        {props.icon && <i className="ui-tab-icon"><UISVGIcon href={props.icon} /></i>}
                        {props.caption && <div className="ui-tab-text">{ props.caption }</div>}
                    </div>
                )
            })}

            <div ref={indicatorEl} className="ui-tab-indicator" />
        </div>
    )
}

export function UITab({caption="", icon=null, iconAlign='left'}) {
    return null
}

export function UITabPanels({
    children,
    tab
}){
    const ref = useRef()
    const [previousTab, setPreviousTab] = useState(tab)
    const arr = Array.isArray(children) ? children : [children]
    
    useLayoutEffect(()=>{
        let direction = previousTab > tab ? 'right' : 'left'
        let active = ref.current.children[tab]
        let previous = ref.current.children[previousTab]
        let slidecls = `slide-${direction}`
        let previousTransition = [{props:{display:'inline-block'}}, slidecls]

        setPreviousTab(tab)

        if (direction=='right') {
            slidecls = [{props:{'margin-left':'-100%'}}, slidecls]
        }

        csstransition()
            .add(active, slidecls)
            .add(previous, previousTransition)
            .paralell()
        
    // eslint-disable-next-line
    }, [tab])

    return (
        <div
            ref={ref} 
            className="ui-tab-panels"
        >
            
            {arr.map(({props}, index) => {
                return (
                    <div 
                        key={index}
                        className={`ui-tab-panel${tab==index?' ui-tab-panel-active ':''} ${props.className||''}`}
                        style={props.style}
                    >
                        {props.children}
                    </div>
                )
            })}

        </div>
    )
}

export function UITabPanel({
    children
}){

    return (
        <div className="ui-tab-panel">
            {children}
        </div>
    )
}