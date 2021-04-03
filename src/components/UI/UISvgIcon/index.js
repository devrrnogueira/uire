
export default function UISVGIcon({ href, size=24, className, style={} }) {
    
    style = Object.assign({width:size, height:size}, style)

    return (
        <svg className={className} style={style}>
            <use xlinkHref={'#' + href} />
        </svg>
    )
}
