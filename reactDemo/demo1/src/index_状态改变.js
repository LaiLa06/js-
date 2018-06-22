import React from 'react';
import ReactDOM from 'react-dom';

/*所谓函数组件是静态组件，和执行普通方法一样，调取一次组件，就把组件中内容获取到，如果不重新调取组件，显示内容是不发生改变的
* */
/*function Clock() {
  return <div>
      <h3>当前北京时间为：</h3>
      <div style={{color:'red',fontWeight:'bold'}}>{new Date().toLocaleString()}</div>
  </div>
}*/
/*每隔一秒重新调取组件*/
/*setInterval(()=>{
    ReactDOM.render(<Clock/>,root);
},1000)*/

// 适用于组件内容不会再次发生改变的情况下


class Clock extends React.Component{
   constructor(){
       super();
       // 初始化组件状态(都是对象类型):要求我们在constructor中把后期需要使用的状态信息全部初始一下（约定俗称的语法规范）
       this.state = {
           time:new Date().toLocaleString(),
       }
   }
   componentDidMount(){
       //react生命周期函数之一：第一次组件渲染完成后触发（我们只需要间隔1000ms把state状态中的time数据改变，这样react会帮我们组件中的部门内容进行渲染）

       setInterval(()=>{
           // this.state.time = new Date().toLocaleString();  //虽然下面的定时器可以修改状态，但是不会通知react重新渲染页面，这样不行
           /*修改组件的状态
              1、修改部分状态：会用我们传递的对象和初始化的state进行匹配，只把我们传递的属性进行修改，没有传递的依然保留原始的状态信息（部分修改）
              2、修改状态修改完成，会通知react把组件进行重新渲染
           */
           this.setState({
               time:new Date().toLocaleString(),
           },()=>{
               /*当通知react把需要重新渲染的JSX元素重新渲染完成后，执行的回调操作（类似于生命周期中的componentDidUpdate）项目中一般使用钩子函数*/
               // 设置回调的原因是：通知完就直接往下执行，render方法是个异步操作
           });
       },1000)
   }
   render(){
       return <div>
           <h3>当前北京时间为：</h3>
           <div style={{color:'red',fontWeight:'bold'}}>{this.state.time}</div>
       </div>
   }
}
ReactDOM.render(<Clock/>,root);


// 组件的渲染