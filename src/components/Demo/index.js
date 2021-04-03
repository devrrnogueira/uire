// import { useLayoutEffect, useState } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'

import 'highlight.js/styles/github.css'
import './Demo.css'
import UICard from '../UI/UICard'

hljs.registerLanguage('javascript', javascript)

export default function Demo({
    title,
    code,
    codes,
    Component,
    style
}){
    // const [view, setView] = useState(0)
    
    return (
        <UICard header={title} style={style}>
            <Component />
        </UICard>
        // <div className="card demo-panel">
        //     <div className="demo-header">
        //         <div className="demo-title bg-k">
        //             {title}
        //         </div>
        //         <div className="client hbox h-align--right">
        //             <UIButton
        //                 icon="history"
        //                 label="view code" 
        //                 onClick={()=>{setView(view==0 ? 1 : 0)}}
        //             />
        //             <UIMenu>
        //                 <p>AAA</p>
        //                 <p>BBB</p>
        //                 <p>CCC</p>
        //             </UIMenu>
        //         </div>
        //     </div>
        //     <div className="demo-content">
        //         {view==0 && <Component /> }
        //         {view==1 && <Highlight code={code}/>}
        //     </div>
        // </div>
    )
}

// function Highlight({code}) {
//     const [html, setHTML] = useState('')

//     useLayoutEffect(()=>{
//         let str = hljs.highlight('js', code).value
//         setHTML(str)
//     // eslint-disable-next-line
//     }, [])

//     return (
//         <pre
//             dangerouslySetInnerHTML={{
//                 __html: html
//             }}>
//         </pre>
//     )
// }