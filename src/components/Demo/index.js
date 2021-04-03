import { useLayoutEffect, useState } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'

import 'highlight.js/styles/github.css'
import './Demo.css'
import UICard from '../UI/UICard'
import UIButton from '../UI/UIButton'

hljs.registerLanguage('javascript', javascript)

export default function Demo({
    title,
    code,
    codes,
    Component,
    style
}){
    const [viewCode, setViewCode] = useState(false)
    
    return (
        <UICard
            style={style}
            header={<>
                {title}
                <UIButton icon="code-tags" onClick={()=>{setViewCode(!viewCode)}}/>
            </>}
        >
            {viewCode 
                ? <Highlight code={code}/>
                : <Component />
            }
        </UICard>
    )
}

function Highlight({code}) {
    const [html, setHTML] = useState('')

    useLayoutEffect(()=>{
        let str = hljs.highlight('js', code).value
        setHTML(str)
    // eslint-disable-next-line
    }, [])

    return (
        <pre
            dangerouslySetInnerHTML={{
                __html: html
            }}>
        </pre>
    )
}