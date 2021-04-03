import { useState } from "react"

import UIButton from "src/components/UI/UIButton"
import UIList from "src/components/UI/UIList"
import UIMenu from "src/components/UI/UIMenu"

export default function Basic() {
    const [menu1, showMenu1] = useState(false)
    const menu1Itens = [
        {
            label: 'New tab'
        },
        {
            label: 'New incognito tab',
            separator: 'full'
        },
        {
            label: 'Recent tabs'
        },
        {
            label: 'History'
        },
        {
            label: 'Downloads'
        },
    ]

    return (
        <div>
            <UIButton caption="Basic Menu" onClick={()=>{showMenu1(true)}}>
                <UIMenu show={menu1} onClose={()=>{showMenu1(false)}}>
                    <UIList link="2" list={menu1Itens} />
                </UIMenu>
            </UIButton>
        </div>
    )
}