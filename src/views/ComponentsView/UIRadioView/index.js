import { useState } from "react"
import UIRadio from "src/components/UI/UIRadio"

export default function UIRadioView() {
    const [value1, setValue1] = useState(1)
    const [value2, setValue2] = useState(2)

    return (
        <>
            <h1>UIRadio</h1>

            <h2>Group 1 = { value1 }</h2>
            <UIRadio checked={value1=='1'} value="1" onChecked={()=>{setValue1('1')}} />
            <UIRadio checked={value1=='2'} value="2" onChecked={()=>{setValue1('2')}}/>

            <h2>Group 2 = { value2 }</h2>
            <UIRadio checked={value2=='1'} value="1" onChecked={()=>{setValue2('1')}} />
            <UIRadio checked={value2=='2'} value="2" onChecked={()=>{setValue2('2')}}/>
        </>
    )
}
