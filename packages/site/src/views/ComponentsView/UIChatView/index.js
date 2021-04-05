import Demo from "src/components/Demo"

import Standard from "./Standard"
import StandardCode from "!!raw-loader!./Standard.js"
import messages from "!!raw-loader!src/assets/messages"

export default function UIChatView() {
    return (
        <div style={{padding: 20}}>
            <div>
                <div className="block-title">UIChat</div>
                
                <div className="block-title">Instalation</div>
                
                <div className="block-title">Usage</div>
                <Demo
                    title="Standard"
                    code={StandardCode}
                    codes={[
                        {file: 'Standard.js', code: StandardCode},
                        {file: 'messages.js', code: messages},
                    ]}
                    Component={Standard}
                />

                <div className="block-title">UIChat API</div>
            </div>
        </div>
    )
}