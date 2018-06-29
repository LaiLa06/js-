import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'  // facebook是公司开发的一个插件，基于这个插件我们可以给组件传的属性设置规则，设置的规则不会影响页面的渲染，
// 但是会在控制台抛出警告错误

class Dialog extends React.Component{

    // this.props只读的，我们无法在方法中修改它的值，但是可以给其设置默认值或者设置一些规则（例如：设置是否是必须传递的以及传递的值的类型等）
    static  defaultProps ={
        // 这样写是符合ES6语法规范的，但是webpack打包编译的时候会把它转换为Dialog.defaultProps这样符合规范的语法

        // react自带的设置默认属性，因为，this.props只读，我们只能设置默认值，为了能修改，我们用插件 “prop-types”
        lx:"系统提示"
    };

    // AA = 12;  设置私有属性，但是不符合ES6语法，需要babel-preset-react编译
    // fn=()=>{}  设置一个箭头函数，但是不符合ES6语法，需要babel-preset-react编译

    static propTypes = {
      // 设置属性规则，如果传的不是这个规则的，不影响页面的渲染，只是会在控制台抛出警告错误
      // con: PropTypes.string   传递的内容必须是字符串
        con:PropTypes.string.isRequired  // 传递的内容是字符串，而且还必须是传递
    };
    constructor(props){
        super(props);  // extends继承，一旦使用了constructor，第一行位置必须设置super执行，相当于React.Component.call(this),也就是call继承，把父类私有的属性继承过来
        console.log(props);
    }

    render(){
        let {lx,cont} = this.props;
        return <section>
            <h3>{lx}</h3>
            <div>
                {cont}
            </div>
        </section>
    }
}

ReactDOM.render(<div>
    Zhufeng
    <Dialog cont='提示'>
        <span>d</span>
    </Dialog>
</div>,root);