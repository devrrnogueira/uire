import { useRef, useState } from 'react'

import UIMenu from '../UIMenu'
import UIButton from '../UIButton'

import './UIChat.css'

export default function UIChat({
    dialog,
    bg="50",
    bgMessage={'received':'90', 'sender':'30'},
    bgButton="80",
    messages=[],
    receivedAvatar="https://cdn.quasar.dev/img/avatar4.jpg",
    senderAvatar="https://cdn.quasar.dev/img/avatar3.jpg",
    typing,
    className = '',
    TypingElement=null,
    ...rest
}) {
    // const [messages, setMessages] = useState([])
    // const [agent, setAgent] = useState(null)
    // const [typing, setTyping] = useState(false)
    const [text, setText] = useState('')
    const [showFloatButtons, setShowFloatButtons] = useState(false)
    const divEl = useRef()
    const buttonAttachEl = useRef()

    let owner

    // useEffect(() => {
    //     if (!agent) setAgent(new Agent(dialog))

    //     if (agent) {
    //         agent
    //             .on('message', (event, intent) => {
    //                 let {message, context} = event
    //                 let def = intent.getDef()
    
    //                 //altera o contexto atual
    //                 context.nome = 'fabio nogueira'
                    
    //                 addMessage(message.text, 'received', def.key == '@TIMEOUT@' ? 'warning' : '')
    //             })
    //             .on('typing', (event, intent) => {
    //                 setTyping(event.typing)
    //             })
    //             .on('run', (def) => {
    //                 onRun && onRun(def)
    //             })
    
    //         agent.run()
    //     }

    // // eslint-disable-next-line
    // }, [agent])

    function addMessage(text, type, warning) {
        // let item = {
        //     text,
        //     type,
        //     warning
        // }
        
        // setMessages(oldMessages => [...oldMessages, item])
        scrollToBottom()
    }

    function onSubmit(event) {
        let input = event.target[0]
        let value = input.value

        event.preventDefault()
        input.value = ''

        addMessage(value, 'sender')
        // agent.run(value)
    }

    function scrollToBottom() {
        setTimeout(() => {
            divEl.current.scrollIntoView({behavior: 'smooth'})
        }, 100);
    }

    function sanitize(text) {
        let tags = {
            '<b>': '<b>',  '</b>': '</b>',
            '<i>': '<i>',  '</i>': '</i>',
            '<u>': '<u>',  '</u>': '</u>',
            '<a>': '<a>',  '</a>': '</a>',
            '<strike>': '<strike>', '</strike>': '</strike>',
            '<script>': '<code>', '</script>': '</code>',
            '<code>': '<code>', '</code>': '</code>',
        }

        return text.replace(/<[^>]*>?/gm, 
            (s) => {
                let t = tags[s]
                let href
                
                if (t) return t
                if (s.startsWith('<a')) {
                    href = s.match(/href="([^"]*)/)

                    return href
                        ? `<a target="_blank" href="${href[1]}">`
                        : ''
                }
                 
                return ''
            });
            
    }

    function inputOnInput(e) {
        setText(e.target.value)
    }

    function openFloatButtons() {
        setShowFloatButtons(true)
    }

    function closeFloatButtons() {
        setShowFloatButtons(false)
    }

    return (
        <div className={"vbox ui-chat " + className} {...rest}>
            <div className={`client ui-chat-messages bg-${bg}`}>
                <div className="ui-chat-scrollarea" 
                    style={{
                        // paddingRight: scrollbarWidth,
                        // marginRight: -scrollbarWidth
                    }}
                >
                    {messages.map((message, index)=>{
                        let changed = message.owner !== owner
                        let bubbleCls = `ui-message-bubble bg-${bgMessage[message.type]}-border ${message.warning || ''} ${changed ? 'message-arrow' : ''}`

                        owner = message.owner

                        return (
                            <div 
                                className={`ui-message-container ui-message-${message.type}`} key={index}
                                style={{marginTop: changed ? 15 : 0}}
                            >
                                {changed && (
                                    <div className="ui-message-avatar">
                                        <img src={message.type === 'sender' ? senderAvatar : receivedAvatar} alt="avatar" />
                                    </div>
                                )}

                                <div className={bubbleCls}
                                    dangerouslySetInnerHTML={{
                                        __html: sanitize(message.text)
                                    }}>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={divEl} style={{height:20}} />
                </div>
            </div>
            
            <form className={`ui-chat-input `} onSubmit={onSubmit}>
                {typing && (
                    <div className="ui-chat-typing-container">
                        <TypingElement content={typing} />
                    </div>
                )}

                {/* Attach button */}
                <UIButton
                    innerRef={buttonAttachEl}
                    bg={bgButton}
                    className={`ui-chat-button`}
                    onClick={openFloatButtons}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        height="24" 
                        width="24"
                        viewBox="0 0 24 24" 
                    >
                        <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                    </svg>
                </UIButton>
                
                <textarea value={text} onInput={inputOnInput} />
                
                {/* Audio button or Send button */}
                {text
                    ? (
                        <UIButton
                            bg={bgButton}
                            className={`ui-chat-button`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24" 
                                width="24"
                                viewBox="0 0 24 24" 
                            >
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </UIButton>
                    )
                    : (
                        <UIButton
                            bg={bgButton}
                            className={`ui-chat-button`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24" 
                                width="24"
                                viewBox="0 0 24 24" 
                            >
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                            </svg>
                        </UIButton>
                    )}
            </form>
            
            <UIMenu
                transparent
                anchor='center-top'
                transition="center-top"
                parent={buttonAttachEl}
                show={showFloatButtons}
                className="ui-chat-menu"
                onClose={()=>setShowFloatButtons(false)}
            >
                <UIButton 
                    icon="file"
                    type="fab"
                    color="pink"
                    style={{marginBottom:20}}
                    onClick={closeFloatButtons}
                />
                <UIButton 
                    icon="camera"
                    type="fab"
                    color="deeporange"
                    style={{marginBottom:20}}
                    onClick={closeFloatButtons}
                />
                <UIButton 
                    icon="image"
                    type="fab"
                    color="purple"
                    style={{marginBottom:20}}
                    onClick={closeFloatButtons}
                />
            </UIMenu>
        </div>
    )
}
