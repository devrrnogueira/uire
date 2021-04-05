// @ts-check

import csstransition from 'lib/src/util/csstransition'

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

        return csstransition(div)
            .run([null, {props:{duration:400, opacity:0}}], ()=>{
                div.style.display = 'none'
            })
    }
}

export default splash
