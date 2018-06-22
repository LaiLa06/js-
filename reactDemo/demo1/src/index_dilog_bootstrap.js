import React from 'react';
import ReactDOM from 'react-dom';
// 公共css放index.js中，这样在其他组件中也可以使用（webpack会把所有的组件最后都编译到一起，index是主入口）
// import 'static/css/reset.min.css'
import 'bootstrap/dist/css/bootstrap.css'  // 需要导入未经过压缩的文件，否则报错（真实项目中bootstrap已经是过去式了，后期用ant）

import Dialog from "./component/Dialog-bootstrap";

ReactDOM.render(<main>
    <Dialog content ='马少帅很帅'/>
    <Dialog type ={2} content='系统错误了'/>
    <Dialog type = '请登录' content={
        '新的JSX语法'
    }>
        <div>
            <input type="text" className='form-control' placeholder='请输入用户名'/><br/>
            <input type="password" placeholder='请输入密码'/>
        </div>
        <br/>
        <button className='btn btn-success'>登录</button>
        <button className='btn btn-danger'>取消</button>
    </Dialog>
</main>,root);