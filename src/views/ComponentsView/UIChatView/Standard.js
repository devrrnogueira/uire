import UICard from "src/components/UI/UICard"
import UIChat from "src/components/UI/UIChat"

import messages from 'src/assets/messages'

export default function Standard() {
    return(
        <UICard style={{maxWidth:400}}>
            <UIChat
                messages={messages}
                style={{height:400}}
            />
        </UICard>
    )
}