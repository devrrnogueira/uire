import { useState } from 'react'

import UIHeader from 'lib/src/components/UIHeader'
import UIDrawer from 'lib/src/components/UIDrawer'
import UISVGIcon from 'lib/src/components/UISvgIcon'
import UIButton from 'lib/src/components/UIButton'
import UIPage from 'lib/src/components/UIPage'

function ClassicLayout() {
    const [open, setOpen] = useState(true)

    function openDrawer() {
        setOpen(!open)
    }

    return (
        <div className="client hbox">
            <UIDrawer
                behavior="desktop"
                open={open}
                onClose={()=>{setOpen(false)}}
            >
                <h1>left drawer</h1>
            </UIDrawer>

            <UIPage
                header={(
                    <UIHeader
                        className="bg-primary text-color-white"
                    >
                        <UIButton onClick={openDrawer}>
                            <UISVGIcon href="menu" />
                        </UIButton>
                        <div className="ui-header-title">Classic Layout</div>
                    </UIHeader>
                )}
            >    
                <div style={{height:1200}}>
                    <h1>content</h1>
                </div>
            </UIPage>        
        </div>
    );
}

export default ClassicLayout;
