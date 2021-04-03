import { useState } from "react"

import UICard from "src/components/UI/UICard"
import { UITab, UITabPanel, UITabPanels, UITabs } from "src/components/UI/UITabs"

export default function WithPanel() {
    const [tab, setTab] = useState(1)

    return (<>
        <UICard>
            <UITabs
                tab={tab}
                iconAlign="left"
                className="shadow-2"
                onChange={(tabIndex)=>{setTab(tabIndex)}}
            >
                <UITab caption="photo" icon="camera" />
                <UITab caption="help" icon="help" />
                <UITab caption="history" icon="history" />
            </UITabs>
            <UITabPanels tab={tab}>
                <UITabPanel>
                    <div className="block-title">Photo</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
                <UITabPanel>
                    <div className="block-title">Help</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
                <UITabPanel>
                    <div className="block-title">History</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
            </UITabPanels>
        </UICard>

        <hr />

        <UICard>
            <UITabPanels tab={tab}>
                <UITabPanel>
                    <div className="block-title">Photo</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
                <UITabPanel>
                    <div className="block-title">Help</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
                <UITabPanel>
                    <div className="block-title">History</div>
                    <div className="block">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </UITabPanel>
            </UITabPanels>
            <UITabs
                tab={tab}
                iconAlign="left"
                className="bg-transparent"
                onChange={(tabIndex)=>{setTab(tabIndex)}}
            >
                <UITab caption="photo" icon="camera" />
                <UITab caption="help" icon="help" />
                <UITab caption="history" icon="history" />
            </UITabs>
        </UICard>
    </>)
}
