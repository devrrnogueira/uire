import UISVGIcon from '../UISvgIcon'
import './UIList.css'

// TODO: Média list
// https://framework7.io/kitchen-sink/core/index.html?theme=ios

export default function UIList({
    children,
    className="",
    style=null,
    list=[],
    link=false,
    caption=null,
    bordered=false,
    separator=false,
    onItemClick=null
}){
    let cls = `list ${className}` // + (link ? 'links-list' : '')
    
    function onClick(e) {
        let li = e.target.closest('li')
        let id = li ? li.getAttribute('item-id') : null

        e.preventDefault()
        
        if (li && onItemClick) {
            onItemClick(id)
        }
    }

    return (
        <div 
            style={style}
            className={cls}
            onClick={onClick}
        >
            <ul>
                { list.map((item, i) => <UIListItem key={i} link={link} {...item} />) }
                { children }
            </ul>
        </div>
    )
}

export function UIListItem({
    children,
    label="",
    id="",
    after=null,
    active=false,
    icon=null,
    image=null,
    link=0, //0=not link, 1=arrow, 2=without arrow
    header=null,
    footer=null,
    divider=null,
    onItemClick=null
}) {
    
    function onClick() {
        onItemClick && onItemClick(id)
    }

    if (!label && divider) {
        return <li className="item-divider">{divider}</li>
    }

    return (
        <>  
            <li item-id={id}>
                {link
                    ?  (
                        // eslint-disable-next-line
                        <a clickable="" href="#" className={`item-link item-content${active?' item-active':''}`}
                            onClick={onClick}>
                            { inner() }
                        </a>
                    ) : (
                        <div className={`item-content${active?' item-active':''}`}>
                            { inner() }
                        </div>
                    )
                }
            </li>            
            {divider && <li className="item-divider">{divider}</li>}
        </>
    )

    function inner() {
        if (children) {
            return children
        }
        
        return (<>
            {icon && (
                <div className="item-media">
                    <i className="icon icon-f7">
                        <UISVGIcon href={icon} />
                    </i>
                </div>
            )}

            {image
                ?
                    <div className="item-media">
                        <i className="icon icon-f7">
                            <img src={image} alt="avatar" />
                        </i>
                    </div>
                :   null}
            
            <div className={`item-inner item-arrow-${link}`}>
                <div className="item-title">
                    {header && <div className="item-header">{header}</div>}
                    {label}
                    {footer && <div className="item-footer">{footer}</div>}
                </div>
                {after && <div className="item-after">{after}</div>}
            </div>
        </>)
    }
}
