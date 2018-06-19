import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './self-jsx.js'

// 从react-dom中导入一个reactDOM，逗号后面的内容是吧renderDOM这个对象进行结构
// == import {render} from 'react-dom'

// let  styleObj = {color:'red'};
// render(<h1 id="titleBox" className='title' style={styleObj}>
//     <ul className='urlWrap'>
//        <li>标签1</li>
//        <li>标签2</li>
//        <li>标签3</li>
//     </ul>
// </h1>,root);
//
// console.dir(React.createElement(
//     'h1',
//     {id: 'titleBox', className: 'title', style: styleObj},
//     '\u73E0\u5CF0\u57F9\u8BAD'
// ), root);