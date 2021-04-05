import Demo from "src/components/Demo"

import Basic from "./Basic"
import BasicCode from "!!raw-loader!./Basic.js"

import WithPanels from "./WithPanels"
import WithPanelsCode from "!!raw-loader!./WithPanels.js"

import "./UITabsView.css"

export default function UITabsView() {
    return (<>
        <div className="block-title">UITabs</div>
        
        <div className="block-title">Instalation</div>
        
        <div className="block-title">Usage</div>
        <Demo title="Basic" code={BasicCode} Component={Basic} />
        <Demo title="Tabs with panels" code={WithPanelsCode} Component={WithPanels} />
        
        <div className="block-title">UITabs API</div>
    </>)
}
