import React from 'react';
import ReactDOM,{render} from 'react-dom';
// import {createElement,render} from './self-jsx'

import Dialog from './component/Dialog'    // 导入dialog组件

// createElement(
//     'div',
//     { id: 'box', className: 'box', style: { color: 'red' } },
//     createElement(
//         'h2',
//         { className: 'title' },
//         '\u7CFB\u7EDF\u63D0\u793A'
//     ),
//     createElement(
//         'div',
//         { className: 'content' },
//         '\u6E29\u99A8\u63D0\u793A\uFF1A\u8BED\u6CD5\u9519\u8BEF\uFF01'
//     ),
//     '\u672C\u64CD\u4F5C\u5C31\u662F\u4E00\u4E2A\u6D4B\u8BD5\uFF01'
// );

ReactDOM.render(<div>
    {/*这是注释，JSX自动给加大括号 -_- :JSX中调取组件，只需要把组件当做一个标签调取使用即可 */}
    <Dialog con="hahha" lx={2} style={{color:'red'}}>
        {/*属性值不是字符串，我们需要使用大括号包起来*/}
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </Dialog>
    {/*或者*/}
    <Dialog con="嘿嘿"/>
</div>,root);
