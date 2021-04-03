import { useLayoutEffect, useRef } from 'react'
import UISVGIcon from '../UISvgIcon'
import './UIButton.css'

export default function UIButton({
    innerRef={},
    children,
    shadow=false,
    fill=false,
    outline=false,
    raised=false,
    rounded=false,
    color="",
    caption="",
    icon=null,
    iconAlign="left",
    type='button',
    style,
    className='',
    ...rest
}) {

    let cls
    let ref = useRef()
    
    useLayoutEffect(()=>{
        innerRef.current = ref.current
    }, [innerRef])

    if (type == 'fab') {
        cls = `button button-fab` + (color ? ` color-${color}` : '')
            
        return (
            <button
                ref={ref}
                type="button"
                className={`${cls} ${className}`}
                style={style}
                {...rest}
            >
                <i className="button-icon"><UISVGIcon href={icon} /></i>
            </button>
        )
    }

    cls = `button col` + 
        (icon ? ` button-icon-align-${iconAlign}` : '') +
        (raised ? ' button-raised' : '') +
        (outline ? ' button-outline' : '') +
        (rounded ? ' button-round' : '') +
        (fill ? ' button-fill' : '') +
        (color ? ` color-${color}` : '') +
        (iconAlign == 'top' ? ' button-icon-align-top' : '')
        
    return (
        <button
            ref={ref}
            type={type}
            className={`${cls} ${className}`}
            style={style}
            // shadow={rounded || shadow ? '' : null}
            {...rest}
        >
            {icon && <i className="button-icon"><UISVGIcon href={icon} /></i>}
            {caption && <div className="button-text">{ caption }</div>}        
            { children }
        </button>
    )
}
