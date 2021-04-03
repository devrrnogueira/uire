let textMetricsElement

// let body
// function adjustTop(t, e, r) {
//     if (!body) {
//         body = dom.create('div', 'position:absolute;top:0;bottom:0;width:2px;left:-3px')
//     }

//     if ((t + e.offsetHeight) > body.offsetHeight) {
//         t -= (e.offsetHeight + r.height)
//     }

//     if (t < 0) {
//         t = 0
//     }

//     return t
// }

//bottom|top left|right
//bottom left
function strPositionsToArray(pos) {
    let arr = [], a, b, i;

    a = pos.split(' ');

    for (i = 0; i < a.length; i++) {
        b = a[i].split('|');
        arr.push(b);
    }

    return arr;
}

function calculateTop(el, rect, margin) {
    let t = rect.top - el.offsetHeight - margin;

    if (t < 0) {
        t += margin;
    }

    return {
        value: t,
        validate: Boolean(t >= 0),
        position: 'top'
    };
}

function calculateLeft(el, rect, margin) {
    let l = rect.left - margin
    let v = true

    if (l < 0) {
        v = false
    }

    return {
        value: l,
        validate: v,
        position: 'left'
    }
}

function calculateBottom(el, rect, margin) {
    let t = rect.top + rect.height + margin,
        h = t + el.offsetHeight,
        hh = el.parentNode.offsetHeight,
        v = true;

    if (h > hh) {
        t -= margin;
        h -= margin;
        if (h > hh) {
            v = false;
        }
    }

    return {
        value: t,
        validate: v,
        position: 'bottom'
    };
}

function calculateRight(el, rect, margin) {
    let l = rect.left + rect.width - el.offsetWidth - margin
    let v = true
    
    if (l + el.offsetWidth > document.body.offsetWidth) {
        v = false
    }

    return {
        value: l,
        validate: v,
        position: 'right'
    }
}

function calculateHorizontalCenter(el, rect) {
    let w = el.parentNode.offsetWidth,
        l = (rect.left + (rect.width/2)) - (el.offsetWidth / 2),
        v = true;

    if (l < 0) {
        v = 0;
    } else if (l + el.offsetWidth > w) {
        v = false;
    }

    return {
        value: l,
        validate: v,
        position: 'left'
    };
}

const dom = {
    create(tagName, cssText, className) {
        let htmlElement, i, a, attrs;

        a = tagName.split("[");
        tagName = a[0];
        attrs = a[1];

        htmlElement = document.createElement(tagName);

        if (attrs) {
            a = attrs.replace("]", "").split(",");
            for (i = 0; i < a.length; i++) {
                attrs = a[i].split("=");
                htmlElement.setAttribute(attrs[0], attrs[1]);
            }
        }

        if (cssText) {
            htmlElement.style.cssText = cssText;
        }

        if (className) {
            htmlElement.className = className;
        }

        return htmlElement;
    },
    remove(htmlElement) {
        try {
            htmlElement.parentNode.removeChild(htmlElement);
        } catch (_e) {
        }
    },
    getStyle(o, property, camelProperty) {
        let val = null;

        if (o == null) {
            return null;
        }

        camelProperty = property;// this._hyphen2camel(property); //ex: line-width para lineWidth

        // Handle "float" property as a special case
        /*
            * if (property=="float") { val = jsf.Dom.getStyle(o,"cssFloat"); if
            * (val==null) { val = jsf.Dom.getStyle(o,"styleFloat"); } } else
            */
        if (o.currentStyle && o.currentStyle[camelProperty]) {
            val = o.currentStyle[camelProperty];
        } else if (window.getComputedStyle) {
            val = window.getComputedStyle(o, null).getPropertyValue(property);
        } else if (o.style && o.style[camelProperty]) {
            val = o.style[camelProperty];
        }
        // For color values, make the value consistent across browsers
        // Convert rgb() colors back to hex for consistency
        /*
            * if (/^\s*rgb\s*\(/.test(val)) { val = css.rgb2hex(val); } //
            * Lowercase all #hex values if (/^#/.test(val)) { val =
            * val.toLowerCase(); }
            */
        return val;
    },
    style(e, s) {
        let i = null;

        e = e._canvas || e;

        for (i in s) {
            e.style[i] = s[i];
        }
    },

    /**
     * options:{
     *     rect       : Object,
     *     target     : HTMLElement,
     *     position   : left|bottom top|right,
     *     paddingLeft: 0,
     *     paddingTop : 0,
     *     adjust: {
     *         top:true|false,
     *         autoHeight
     *     }
     * }
    */
    positionByRect(options = {}) {
        let rect = options.rect,
            target = options.target,
            paddingLeft = options.paddingLeft || 0,
            paddingTop = options.paddingTop || 0,
            paddingRight = options.paddingRight || 0,
            paddingBottom = options.paddingBottom || 0,
            p = 0, ot = {}, ol = {},
            i, v = null, arr;

        arr = strPositionsToArray(options.position);

        for (p = 0; p < arr.length; p++) {
            for (i = 0; i < arr[p].length; i++) {
                v = arr[p][i]
                
                switch (v) {
                case 'top':   // acima de r
                    if (!ot.validate) {
                        ot = calculateTop(target, rect, paddingTop);
                    }
                    break;

                case 'bottom': // abaixo de r
                    if (!ot.validate) {
                        ot = calculateBottom(target, rect, paddingBottom);
                    }
                    break;

                case 'left':   // à esquerda de r
                    if (!ol.validate) {
                        ol = calculateLeft(target, rect, paddingLeft);
                    }
                    break;

                case 'right':  // à direita de r - width de e
                    if (!ol.validate) {
                        ol = calculateRight(target, rect, paddingRight);
                    }
                    break;

                case 'center':
                    if (arr[p].includes('top') || arr[p].includes('bottom')){
                        if (!ol.validate) {
                            ol = calculateHorizontalCenter(target, rect, paddingRight);
                        }
                    }
                    break
                default:

                }
            }
        }

        if (ot.value < 0) ot.value = 0
        if (ol.value < 0) ol.value = 0

        this.style(target, {
            top: ot.value + 'px',
            left: ol.value + 'px'
        })

        return {
            leftValue: ol.value,
            topValue: ot.value,
            leftPos: ol.position,
            topPos: ot.position
        };
    },
    isChild(parent, child) {
        let i, p

        if (child.parentNode == parent) {
            return true
        }

        p = parent.childNodes;

        for (i = 0; i < p.length; i++) {
            if (this.isChild(p[i], child)) {
                return true
            }
        }

        return false
    },
    textMetrics(text, cssText, className) {
        if (!textMetricsElement) {
            textMetricsElement = document.body.appendChild(this.create('span', 'position:absolute; top:10000px; left:0;'));
        }

        textMetricsElement.style.cssText = cssText || "";
        textMetricsElement.className = className || "";
        textMetricsElement.innerHTML = text;

        return {
            width: textMetricsElement.offsetWidth,
            height: textMetricsElement.offsetHeight
        }
    }
}

export default dom
