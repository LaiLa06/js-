/*
 * CREATE-ELEMENT：创建JSX对象
 *   参数：至少两个 TYPE/PROPS，CHILDREN这个部分可能没有可能有多个
 */
function createElement(type, props, ...childrens) {
    let ref, key;
    if ('ref' in props) {
        ref = props['ref'];
        props['ref'] = undefined;
    }
    if ('key' in props) {
        key = props['key'];
        props['key'] = undefined;
    }
    return {
        type,
        props: {
            ...props,
            children: childrens.length <= 1 ? (childrens[0] || '') : childrens
        },
        ref,
        key
    };
}


function render(objJSX, container, callBack) {
    let {type, props} = objJSX,
        {children} = props;
    let newElement = document.createElement(type);
    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) break;
        let value = props[attr];
        if (value == undefined) continue;//=>NULL OR UNDEFINED

        switch (attr.toUpperCase()) {
            case 'CLASSNAME':
                newElement.setAttribute('class', value);
                break;
            case 'STYLE':
                for (let styleAttr in value) {
                    if (value.hasOwnProperty(styleAttr)) {
                        newElement['style'][styleAttr] = value[styleAttr];
                    }
                }
                break;
            case 'CHILDREN':
                /*
                 * 可能是一个值：可能是字符串也可能是一个JSX对象
                 * 可能是一个数组：数组中的每一项可能是字符串也可能是JSX对象
                 */
                //->首先把一个值也变为数组，这样后期统一操作数组即可
                !(value instanceof Array) ? value = [value] : null;
                value.forEach((item, index) => {
                    //->验证ITEM是什么类型的：如果是字符串就是创建文本节点，如果是对象，我们需要再次执行RENDER方法，把创建的元素放到最开始创建的大盒子中
                    if (typeof item === 'string') {
                        let text = document.createTextNode(item);
                        newElement.appendChild(text);
                    } else {
                        render(item,newElement)
                    }
                });
                break;
            default:
                newElement.setAttribute(attr, value);
        }
    }
    container.appendChild(newElement);
    callBack && callBack();
}

export {
    createElement,
    render
};

// index.js 中
// import {createElement, render} from './self-jsx';
//
// let objJSX = createElement(
//     'div',
//     {id: 'box', className: 'box', style: {color: 'red'}},
//     createElement(
//         'h2',
//         {className: 'title'},
//         '\u7CFB\u7EDF\u63D0\u793A'
//     ),
//     createElement(
//         'div',
//         {className: 'content'},
//         '\u6E29\u99A8\u63D0\u793A\uFF1A\u8BED\u6CD5\u9519\u8BEF\uFF01'
//     ),
//     '\u672C\u64CD\u4F5C\u5C31\u662F\u4E00\u4E2A\u6D4B\u8BD5\uFF01'
// );
// render(objJSX, root);
