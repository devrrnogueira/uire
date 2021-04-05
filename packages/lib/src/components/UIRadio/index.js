import './UIRadio.css'

export default function UIRadio({
    name,
    value="",
    checked=false,
    onChecked=null
}) {
    
    function onInputChange(){
        onChecked && onChecked()
    }

    return (
        <label className={`ui-radio${checked?' ui-radio-checked':''}`}>
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onInputChange}
            />
            <svg viewBox="0 0 24 24">
                <path d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" />
                <path check="" d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"/>
            </svg>
        </label>
    )
}