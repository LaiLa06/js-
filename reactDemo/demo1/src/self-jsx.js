function createElement(type, props, ...children) {
    let key, ref;
    if ('ref' in props) {
        ref = props['ref'];
        props['ref'] = undefined;
    }
    if ('key' in props) {
        key = props['key'];
        props['key'] = undefined
    }
    return {
        type,
        props: {
            ...props,
            children: children.length <= 1 ? children[0] || '' : children
        },
        ref,
        key
    }
}

function render(jsx, container, callback) {
    let {type, props} = jsx,
        newElement = document.createElement(type);
    for (const item in props) {
        if (props.hasOwnProperty(item)) {
            let value = props[item];
            if (value === undefined) continue;
            switch (item.toUpperCase()) {
                case 'CLASSNAME':
                    newElement.setAttribute('class', value);
                    break;
                case 'STYLE':
                    for (const i in value) {
                        newElement['style'][i] = value[i];
                    }
                    break;
                case 'CHILDREN':
                    !(value instanceof Array) ? value = [value] : null;
                    value.forEach(item => {
                        if (typeof item === 'string') {
                            let text = document.createTextNode(item);
                            newElement.appendChild(text);
                        } else {
                            render(item, newElement)
                        }
                    });
                    break;
                default:
                    newElement.setAttribute(item, value);
            }
        }
    }
    container.appendChild(newElement);
    callback && callback();
}

export {
    createElement, render
}