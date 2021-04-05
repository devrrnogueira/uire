/**
 * Retorna a largura das barras de rolagem, horizontal e vertical
 */

let div = document.body.appendChild(document.createElement('div'))

div.setAttribute('style', 'position:fixed;top:-100px;left:0;width:50px;height:50px;overflow: auto;')
div.innerHTML = '<div style="width:100px;height:100px"></div>'

const Scrollbar = {
    height: () => div.offsetHeight - div.clientHeight,
    width: () => div.offsetWidth - div.clientWidth
}

export default Scrollbar
