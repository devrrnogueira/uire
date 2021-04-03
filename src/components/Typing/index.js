import typingImg from 'src/data/typing.svg'
import './Typing.css'

export default function Typing() {

    return (
        <div className="typing-component">
            <img src={typingImg} alt="typing" />
            <div className="typing-component-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}