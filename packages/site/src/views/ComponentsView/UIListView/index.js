import Demo from "src/components/Demo"

import Simple from './Simple'
import SimpleCode from "!!raw-loader!./Simple.js"

import WithIcon from './WithIcon'
import WithIconCode from "!!raw-loader!./WithIcon.js"

import HeaderFooter from './HeaderFooter'
import HeaderFooterCode from "!!raw-loader!./HeaderFooter.js"


export default function UIListView() {
    let style = {
        background: 'transparent',
        boxShadow: 'none'
    }

    return (
        <>
            <div className="block-title">UIList</div>
        
            <div className="block-title">Instalation</div>
            
            <div className="block-title">Usage</div>
            <Demo style={style} title="Simple" code={SimpleCode} Component={Simple} />
            <Demo style={style} title="With icon" code={WithIconCode} Component={WithIcon} />
            <Demo style={style} title="Header, Footer" code={HeaderFooterCode} Component={HeaderFooter} />

            <div className="block-title">UIList API</div>
        </>
    )
}