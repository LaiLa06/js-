// 1、创建一个对象，默认有四个属性（type、props、ref、key），最后要把这个对象范湖
// 2、根据传递的值，修改这个对象
// - type:传递的type
// - props需要做一些处理：大部分传递props中的属性都赋值给props，有一些比较特殊，如果是ref或者key，我们需要把传递的props中这个两个值，给创建的对象的
// 两个属性，而传递的props中把这两个值删除掉，把传递children作为新创建对象的props中的一个属性

let createElement = function (type, props, children) {
    props = props || {};
    // 创建一个对象，设置一些默认属性值
    let obj = {
        type: null,
        props: {
            children: ''
        },
        ref: null,
        key: null
    };
    // 用传过来的type和props覆盖原有的默认值
    // obj = {...obj,type,props}; //等价于{type:type,props:props}
    obj = {...obj, type, props: {...props, children}};
    // 把ref和key提取出来;
    'key' in obj.props ? (obj.key = obj.props.key, obj.props.key = undefined) : null;
    'ref' in obj.props ? (obj.ref = obj.props.ref, obj.props.ref = undefined) : null;

    return obj
};

let objJSX = createElement(
    'h1',
    {id: 'titleBox', className: 'title', style: {color: 'pink'}, ref: 'AA', key: '12'},
    '\u73E0\u5CF0\u57F9\u8BAD'
);

// render方法
// 把创建的对象生成DOM元素，最后插入到页面当中
let render = function (obj, container, callBack) {
    let {type, props} = obj || {},
        newElement = document.createElement(type);
    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) return;
        if (!props[attr]) continue;

        let value = props[attr];
        // className的处理
        if (attr === 'className') {
            newElement.setAttribute('class', value);
            continue
        }
        // style的处理
        if (attr === 'style') {
            if (value === '') continue;
            for (let styKey in value) {
                if (value.hasOwnProperty(styKey)) {
                    newElement['style'][styKey] = value[styKey];
                }
            }
            continue;
        }
        // 对children的处理
        if (attr === 'children') {
            if(typeof value === "string"){
              let text = document.createTextNode(value);
              newElement.appendChild(text);
            }
            continue;
        }
        newElement.setAttribute(attr, value);
    }
    container.appendChild(newElement);
    callBack && callBack();
};

render(objJSX, root, () => {
    console.log('ok');
});