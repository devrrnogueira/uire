import { useState } from 'react'

import UIHeader from 'src/components/UI/UIHeader'
import UIDrawer from 'src/components/UI/UIDrawer'
import UISVGIcon from 'src/components/UI/UISvgIcon'
import UIButton from 'src/components/UI/UIButton'
import UIPage from 'src/components/UI/UIPage'

import { ReactComponent as  YoutubeIcon} from 'src/assets/youtube.svg'

function ClassicLayout() {
    const [open, setOpen] = useState(true)

    function openDrawer() {
        setOpen(!open)
    }

    return (
        <div className="client hbox">
            <UIPage
                header={(
                    <UIHeader
                        shadow={true}
                        className="bg-white"
                        style={{color:'rgb(97, 97, 97)'}}
                    >
                        <UIButton onClick={openDrawer}>
                            <UISVGIcon href="menu" />
                        </UIButton>
                        <YoutubeIcon style={{height:28, fill:'red'}} />
                        <div className="ui-header-title text-weight-bold">YouTube Layout</div>
                    </UIHeader>
                )}
            >    
                <div className="client hbox">
                    <UIDrawer
                        behavior="desktop"
                        open={open}
                        onClose={()=>{setOpen(false)}}
                    >
                        <h1>left drawer</h1>
                    </UIDrawer>
                    <div className="scroll client">
                        <div style={{height:1200}}>
                            <h1>content</h1>
                        </div>
                    </div>
                </div>
                
            </UIPage>        
        </div>
    );
}

export default ClassicLayout;
