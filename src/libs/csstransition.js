
let style
let rules = {}
let custom = {}

export default function CSSTransition() {
    return {
        sequence() {
            return transition('sequence')
        },
        paralell() {
            return transition('paralell')
        },
        create(name, def) {
            /*
                create('scale-to-top-show', {
                    duration: 2000,
                    props: {
                        opacity: {
                            from: 0,
                            to: 1
                        },
                        transform: {
                            from: 'scale(0.4) translateY({height}px)',
                            to: null
                        }
                    }
                })

                runCustom('scale-to-top-show', {el, height:180}, ()=>{})
            */
           custom[name] = def 
           return this
        }
    }
}

function transition (type) {
    let transitions = []

    return {
        enter(el, name) {
            if (el) {
                transitions.push({
                    el,
                    state0: `${name}-enter`,
                    state1: `${name}-enter-active`,
                    state2: `${name}-enter-done`
                })
            }

            return this
        },
        exit(el, name) {
            if (el) {
                transitions.push({
                    el,
                    state0: `${name}-exit`,
                    state1: `${name}-exit-active`,
                    state2: `${name}-exit-done`
                })
            }
            
            return this
        },
        rule(el, name, sufix) {
            return sufix == 'exit' ? this.exit(el, name) : this.enter(el, name)
        },
        property(el, prop, from, to, duration) {
            if (el) {
                transitions.push({
                    el,
                    prop,
                    from,
                    to,
                    duration
                })
            }
            
            return this
        },
        run(callback) {
            return type == 'sequence' ? sequence(callback) : paralell(callback)
        },
        runCustom(nameOrDef, optionsOrElement, callback) {
            let def
            
            if (typeof(nameOrDef) == 'string') {
                def = custom[nameOrDef]
            } else {
                def = nameOrDef
            }
            
            if (!def) {
                throw new Error(`custom animations "${nameOrDef}" not found.`)
            }

            optionsOrElement = optionsOrElement.el ? optionsOrElement : {el:optionsOrElement}

            Object.keys(def.props).forEach(key => {
                let prop = def.props[key]
                let from = String(prop.from)
                let to = String(prop.to)

                Object.keys(optionsOrElement).forEach(k => {
                    from = from.replaceAll(`{${k}}`, optionsOrElement[k])
                    to = to.replaceAll(`{${k}}`, optionsOrElement[k])
                })

                this.property(optionsOrElement.el, key, from, to, def.duration)
            })

            return type == 'sequence' ? sequence(callback) : paralell(callback)
        }
    }

    async function paralell(callback) {
        let i, t
        let promisses = []

        for (i=0; i<transitions.length; i++) {
            t = transitions[i]
            promisses.push(start(t))
        }

        return Promise.all(promisses).then(()=>{
            
            setTimeout(() => {
                transitions.forEach(t=>{
                    if (t.prop) {
                        t.el.style[t.prop] = t.initial
                    }
                    
                    remove(t.el, t.state0)
                    remove(t.el, t.state1)
                    remove(t.el, t.state2)
                })
            }, 10)
            
            add(t.el, t.state2)
            callback && callback()
        })
    }

    async function sequence(callback) {
        let i, t
        
        for (i=0; i<transitions.length; i++) {
            t = transitions[i]
            await start(t)
        }

        setTimeout(() => {
            transitions.forEach(t=>{
                if (t.prop) {
                    t.el.style[t.prop] = t.initial
                }

                remove(t.el, t.state0)
                remove(t.el, t.state1)
                remove(t.el, t.state2)
            })
            
            add(t.el, t.state2)
            callback && callback()
        }, 10)
    }
}

function remove(el, cls) {
    if (cls) el.classList.remove(cls)
}
function add(el, cls) {
    if (cls) el.classList.add(cls)
}

function start(def) {
    let { el, state0, state1, state2 } = def
    
    remove(el, state0)
    remove(el, state1)
    remove(el, state2)
    
    def.before && def.before(el)

    if (def.prop) {
        def.initial = el.style[def.prop]
        el.style[def.prop] = def.from
        def.state1 = state1 = getRule(def.prop, def.duration)
    } else {
        add(el, state0)
    }

    return new Promise((resolve) => {
        let tm
        let resolved = false
        
        
        setTimeout(()=>{
            add(el, state1)

            if (def.prop) {
                el.style[def.prop] = def.to
            }

            try {
                tm = parseFloat(getComputedStyle(el)['transitionDuration']) || 0.6
            } catch (error) {
                tm = 0.6
            }
            
            el.addEventListener('transitionend', onTransitionend)
            setTimeout(onTransitionend, tm * 1000)
        }, 10)

        function onTransitionend () {
            el.removeEventListener('transitionend', onTransitionend)
            
            if (!resolved) {
                resolved = true

                resolve()
            }
        }
    })
}

function getRule(prop, duration) {
    let key = prop + '-' + duration
    let name = `td-${prop}-${duration}`

    if (!style) {
        style = document.createElement('style')
        style.setAttribute('id', 'custom-transition')
        document.getElementsByTagName('head')[0].appendChild(style)
    }
    
    if (!rules[key]) {
        rules[key] = true        
        style.innerHTML += `.${name} {transition: all; transition-duration: ${duration/10000}s;}\n`
    }

    return name
}
