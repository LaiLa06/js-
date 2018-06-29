import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOM.render([JSX],[container],[callback])：把JSX元素渲染到页面中
// JSX:虚拟元素
// container：容器，我们想把元素放到页面中的哪个容器中
// callback：当把容器放到页面中呈现触发的回调函数

// JSX：react独有的语法， JavaScript+xml（HTML），和我们之前拼接的字符串类似，都是把html结构代码和js代码或者数据混合在一起了，但是他不是字符串
// 1、不建议我们 直接把jsx直接放到body中，而是放在自己创建一个容器中，一般我们都放在一个id为root的div中
// 2、在JSX中出现的{}是存放JS的，要求JS代码执行完成需要有返回结果（JS表达式）
// - 不能直接放一个对象数据类型的值（对象(除了给style赋值)，数组（如果只有基本值或者jsx除外），函数都不行）
// - 可以是基本类型的值（布尔类型什么都不显示，null，undefined也是jsx元素，代表的是空）
// - 循环判断语句都不行，但是支持三元运算符
// 3、循环数组穿件jsx元素，需要给创建的元素设置唯一的key值（当前本次唯一即可）
// 4、只能出现一个根元素
// 5、给元素设置样式类用的是className而不是class
// 6、style中不能直接写样式字符串，需要基于一个样式对象来遍历赋值

let data = {
    name:"xx",
    age:12,
    },
    root = document.querySelector("#root");

ReactDOM.render(<h1 id={'box'} className="box" style={{color:'red'}}>我是标题</h1>);

// let str = `<div>hello world! ${data}</div>`;  模板字符串这样写
// ReactDOM.render();