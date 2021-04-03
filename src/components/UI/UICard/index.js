import './UICard.css'

export default function UICard({
    children,
    header=null,
    footer=null,
    outline=false,
    className="",
    ...rest
}) {

    let cls = `card${outline?' card-outline':''} ${className}`

    return (
        <div className={cls} {...rest}>
            { header && <div className="card-header">{header}</div> }
            <div className="card-content card-content-padding">
                { children }
            </div>
            { footer && <div className="card-footer">{footer}</div> }
        </div>
    )
}
