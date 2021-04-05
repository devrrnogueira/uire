import { useState } from 'react'
import { UITab, UITabPanel, UITabPanels, UITabs } from "lib/src/components/UITabs"

const defaultIntalationText = 
`/*
 * No installation step is necessary.
 * It gets installed by default in npm i uire
 */
`
export default function Doc({doc}) {
    const [tab, setTab] = useState(0)

    return (
        <div>
            <div className="block-title">{doc.name}</div>
            <div className="block">{doc.description}</div>
            
            <div className="block-title">Instalation</div>
            <div className="block"><pre>{doc.instalation || defaultIntalationText}</pre></div>

            <div className="block-title">Usage</div>
            {doc.usage}

            <div className="block-title">{doc.name} API</div>
            <UITabs
                tab={tab}
                onChange={(value)=>{setTab(value)}}
            >
                <UITab caption="props" />
                <UITab caption="events" />
            </UITabs>
            <UITabPanels tab={tab}>
                <UITabPanel>
                    {doc.api.props.map((prop, i)=>(
                        <table border="1" key={i}>
                            <tbody>
                                <tr>
                                    <td>name</td><td>{prop.name}</td>
                                </tr>
                                <tr>
                                    <td>type</td><td>{prop.type}</td>
                                </tr>
                                <tr>
                                    <td>default</td><td>{prop.default}</td>
                                </tr>
                                <tr>
                                    <td>description</td><td>{prop.description}</td>
                                </tr>
                                <tr>
                                    <td>example</td><td>{prop.example}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </UITabPanel>
                <UITabPanel>
                    events
                </UITabPanel>
            </UITabPanels>
            
        </div>
    )
}