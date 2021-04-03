// @ts-check

import CSSTransition from 'src/libs/csstransition'

let div

const splash = {
    show (content) {
        let h1 = div.querySelector('h1')
        let h2 = div.querySelector('h2')

        div.style.display = 'flex'

        h1.style.display = 'none'
        h2.innerHTML = content || ''

        setImmediate(() => {
            div.removeAttribute('remove')
        })
    },

    hide () {
        div = document.querySelector('#splash')

        if (!div) {
            return Promise.resolve()
        }

        return CSSTransition()
            .paralell()
            .exit(div, 'splash')
            .run(()=>{
                div.style.display = 'none'
            })
    }
}

export default splash
