
export default function ColorsView() {
    let bg = [
        'k', 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 'w',
        'grey-100', 'grey-90', 'grey-80', 'grey-70', 'grey-60', 'grey-50', 'grey-40', 'grey-30', 'grey-20', 'grey-10', 'grey-w', 
        'alert-red', 'alert-orange', 'alert-yellow', 'alert-green']

    return (
        <div style={{padding: 20, width:'100%'}}>
            <h2>Colors Schema</h2>
            
            <div className="hbox bg-grey-20-border" style={{padding: 10, border:'solid 1px'}}>
                <div style={{flex:1}}>
                    {bg.map(i=>(
                        <div
                            key={i}
                            className={`bg-${i}`}
                            style={{
                                padding:'8px 20px',
                                margin: 2,
                                border:'solid 1px transparent'
                            }}
                        >
                            bg-{i}
                        </div>
                    ))}
                </div>
                <div style={{flex:1}}>
                    {bg.map(i=>(
                        <div
                            key={i}
                            className={`bg-${i}-border`}
                            style={{
                                padding:'8px 20px',
                                margin: 2,
                                border:'solid 1px'
                            }}
                        >
                            bg-{i}-border
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}