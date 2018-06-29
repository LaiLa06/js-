import React from 'react';    // 每个组件必须引入，因为需要基于它的create-element把JSX进行解析渲染
// 函数式声明组件
// 1、函数返回结果是一个新的JSX（也就是当前组件的JSX结构）
// 2、props变量存储的值是一个对象，包含了调取组件时候传递的属性值,不传递的话是个空对象
// 知识点：createElement遇到一个组件，返回的对象中：type就不是字符串标签名了，而是一个函数（类），但是属性还是存在props中
// render渲染的时候，我们需要做处理，首先判断type的类型，如果是字符串，就创建一个元素标签，如果函数或者类，就把函数执行，把props中的每一项（包含children）传递给函数
// 在执行的时候，把函数中return的JSX转换为新的对象（通过createElement），把这个对象返回：紧接着rener按照以往的渲染方式，创建DOM元素，插入到指定的容器中即可
//
// 单闭合和双闭合组件的区别，双闭合组件中可以放子孙元素

// let obj = {
//     type: Dialog,
//     props: {
//         lx:1,
//         con:'xxx',
//         children:一个值或者一个数组
//     }
// }

export default function Dialog(props) {
    let {con, lx = 0, children,style={}} = props,
        title = lx === 0 ? '系统提示' : '系统警告';
    //children 可能有，可能没有，可能是个值，也可能是个数组，每一项可能是字符串也可能是个对象等，都代表双闭合组件的子孙元素
    return <section style={style}>
        <h2>{title}</h2>
        <div>{con}</div>
        {/*1、把属性中的子元素，放到组件中的指定位置*/}
        {/*{children}*/}
        {/*2、也可以使用react中专门遍历children的方法*/}
            {children.map(item => item)}
            {/*// {React.Children.map(children,item=>item)}*/}
        </section>
}