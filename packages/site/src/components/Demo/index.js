import { useLayoutEffect, useState } from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'

import UICard from 'lib/src/components/UICard'
import UIButton from 'lib/src/components/UIButton'

import 'highlight.js/styles/github.css'
import './Demo.css'

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