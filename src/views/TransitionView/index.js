import { useLayoutEffect, useRef, useState } from "react"

import './TransitionView.css'
import csstransition from "src/libs/csstransition2"

const animations = [
    {
        name: 'slide-left',
        state: 'slide-left'
    },
    {
        name: 'slide-right',
        state: 'slide-right'
    },
    {
        name: 'slide-top',
        state: 'slide-top'
    },
    {
        name: 'slide-bottom',
        state: 'slide-bottom'
    },
    {
        name: 'scaleToTopShow',
        state: [
            {
                prestate(el, params) {
                    params.height = el.offsetHeight
                },
                props: {
                    opacity: 0,
                    transform: 'scale(0.4) translateY({height}px)'
                }
            },
            {
                props: {
                    duration: 300,
                    opacity: 1,
                    transform: 'scale(1) translateY(0)'
                }
            }
        ]
    },
    {
        name: 'scaleToTopHide',
        state: [
            null,
            {
                prestate(el, params) {
                    params.height = el.offsetHeight
                },
                props: {
                    duration: 300,
                    opacity: 0,
                    transform: 'scale(0.4) translateY({height}px)'
                }
            }
        ]
    }
]

export default function TransitionView() {
    const el1 = useRef()
    const [animation, setAnimation] = useState(0)
    
    useLayoutEffect(()=>{
        run()
    // eslint-disable-next-line
    }, [animation])

    function run(){
        let anim = animations[animation].state

        csstransition(el1.current)
            .run(anim,(canceled)=>{
                console.log('complete', canceled)
            })
    }

    function onChange(e) {
        setAnimation(e.target.value)
    }

    return (
        <div className="client vbox v-align--center">
            <h1>TransitionView</h1>
            
            <div className="hbox">
                <select onChange={onChange} className="select">
                    {animations.map((item,i)=>{
                        return <option value={i} key={item.name}>{item.name}</option>
                    })}
                </select>
            </div>

            <div style={{border:'solid 1px #000', padding:20}}>
                <button onClick={run}>run</button>
                <div ref={el1} className="el-anima">Element 01</div>
            </div>
        </div>
    )
}