import UICard from "lib/src/components/UICard"
import UIChat from "lib/src/components/UIChat"

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