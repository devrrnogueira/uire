import Demo from "src/components/Demo"

import Simple from "./Simple"
import SimpledCode from "!!raw-loader!./Simple.js"

import Outline from "./Outline"
import OutlineCode from "!!raw-loader!./Outline.js"

export default function UICardView() {
    let style = {
        background: 'transparent',
        boxShadow: 'none'
    }

    return (
        <div style={{padding: 0}}>
            <div className="block-title">UICard</div>
            
            <div className="block-title">Instalation</div>
            
            <div className="block-title">Usage</div>
            <Demo style={style} title="Simple" code={SimpledCode} Component={Simple} />
            <Demo style={style} title="Outline" code={OutlineCode} Component={Outline} />
            
            <div className="block-title">UICard API</div>
        </div>
    )
}