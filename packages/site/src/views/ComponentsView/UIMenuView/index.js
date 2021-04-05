import Demo from "src/components/Demo"

import Basic from "./Basic"
import BasicCode from "!!raw-loader!./Basic.js"

export default function UIMenuView() {
    return (
        <div style={{padding: 20}}>
            <div>
                <h2>UIMenu</h2>
                
                <h2>Instalation</h2>
                
                <h2>Usage</h2>
                <hr />
                <Demo
                    title="Basic"
                    code={BasicCode}
                    // codes={[
                    //     {file: 'Standard.js', code: StandardCode},
                    //     {file: 'messages.js', code: messages},
                    // ]}
                    Component={Basic}
                />

                <h2>UIMenu API</h2>
            </div>
        </div>
    )
}