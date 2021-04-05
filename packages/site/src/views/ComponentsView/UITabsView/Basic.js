import { useState } from "react"
import { UITab, UITabs } from "lib/src/components/UITabs"

export default function Basic() {
    const [tab, setTab] = useState(1)

    return (
        <div style={{width:'100%'}}>
            <UITabs
                tab={tab}
                className="bg-transparent"
                onChange={(value)=>{setTab(value)}}
            >
                <UITab caption="Photo" icon="camera" />
                <UITab caption="Help" icon="help"/>
                <UITab caption="History" icon="history"/>
            </UITabs>

            <hr />

            <UITabs
                tab={tab}
                onChange={(value)=>{setTab(value)}}
            >
                <UITab icon="camera" />
                <UITab icon="help"/>
                <UITab icon="history"/>
            </UITabs>

            <hr />

            <UITabs
                tab={tab}
                align="justify"
                iconAlign="left"
                onChange={(value)=>{setTab(value)}}
            >
                <UITab caption="photo" icon="camera" />
                <UITab caption="help" icon="help"/>
                <UITab caption="history" icon="history"/>
            </UITabs>

            <hr />

            <UITabs
                tab={tab}
                onChange={(value)=>{setTab(value)}}
            >
                <UITab caption="photo" />
                <UITab caption="help" />
                <UITab caption="history" />
            </UITabs>
        </div>
    )
}
