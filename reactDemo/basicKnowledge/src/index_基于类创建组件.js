import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'  // facebook是公司开发的一个插件，基于这个插件我们可以给组件传的属性设置规则，设置的规则不会影响页面的渲染，
// 但是会在控制台抛出警告错误

class Dialog extends React.Component{
   // this.props只读的，我们无法在方法中修改它的值，但是可以给其设置默认值或者设置一些规则（例如：设置是否是必须传递的以及传递的值的类型等）
   static  defaultProps ={
        lx:"系统提示"
   };
   static propTypes = {
        // 设置属性规则，如果传的不是这个规则的，不影响页面的渲染，只是会在控制台抛出警告错误
        // con: PropTypes.string   传递的内容必须是字符串
        con:PropTypes.string.isRequired  // 传递的内容是字符串，而且还必须是传递
   };
   constructor(props){    // props context updater
       // props：当render渲染并且把当前类执行创建实例的时候，会把之前JSX解析出来的props对象中的信息（可能有children）传递给参数props  =>  "调取组件传递的属性"

       // props如果不传，super也不传，除了constructor中不能直接使用this.props,其他声明周期函数中都可以使用（也就是执行完成constructor，
       // react已经帮我们把传递的属性接收，并且挂载到实例上了）

       super(props);  // extends继承，一旦使用了constructor，第一行位置必须设置super执行，相当于React.Component.call(this),也就是call继承，把父类私有的属性继承过来
       // this.props:属性集合
       // this.refs：ref集合（非受控组件中用到）
       // this.context:上下文

       // - 如果super(props); 在继承父类私有的时候,就把props挂载到this实例上了，这个this只是constructor中的this，不影响原型上的this，写不写都行
       // - 如果只写super() 虽然创建实例的时候把属性传递过来了，但是并没有传递父组件，也就是没有把属性挂载到实例上，使用this.props获取的结果是undefined
       // -
       console.log(props);
       // AA = 12;  设置私有属性，但是不符合ES6语法，需要babel-preset-react编译
       // fn=()=>{}  设置一个箭头函数，但是不符合ES6语法，需要babel-preset-react编译
   }

   render(){
       // render必须写还必须有返回的东西

       // 组件中的属性（this.props）是调取组件的时候（创建类实例的时候）传递给组件的信息，这部分信息是只读的（只能获取不能修改）-> "组件的属性是只读的"
       // Object.defineProperty(this.props,'cont',{
       //    writable:true
       // });
       // 用这种方法也改不了

       return <section>
           <h3>系统提示</h3>
           <div>
               zhufeng
           </div>
       </section>
   }
}

ReactDOM.render(<div>
    <Dialog>
        <span>d</span>
    </Dialog>
</div>,root);