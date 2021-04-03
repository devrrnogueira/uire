import './UIHeader.css'

export default function UIHeader({
    children,
    visibleonscroll=false,
    shadowOnScroll=false,
    shadow=false,
    className='',
    ...rest
}) {
    let cls = `hbox ui-header${shadow ? ' ui-header-shadow' : ''} ${className}` + 
        (shadowOnScroll ? ' ui-header-shadow-scroll' : '')

    return (
        <header
            visibleonscroll={visibleonscroll ? '' : null}
            className={cls}
            {...rest}
        >
            {children}
        </header>
    )
}