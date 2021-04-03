
let theme = localStorage.getItem('theme') || 'ios'
let dark = Boolean(localStorage.getItem('dark'))

const Theme = {
    setTheme(name) {
        update(name, dark)
        return this
    },
    getTheme() {
        return theme
    },
    setDark(value) {
        update(theme, value)
        return this
    },
    getDark() {
        return dark
    }
}

function update(newTheme, newDark) {
    let html = document.querySelector('html')

    html.classList.remove(theme)
    html.classList.remove('theme-dark')

    html.classList.add(newTheme)
    if (newDark)
        html.classList.add('theme-dark')

    theme = newTheme
    dark = newDark

    localStorage.setItem('theme', newTheme)
    localStorage.setItem('dark', dark ? 'yes' : '')
}

export default Theme