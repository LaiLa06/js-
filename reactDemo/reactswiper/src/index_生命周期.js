import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

class A extends React.Component {
    static defaultProps = {}; // 第一个执行，属性设置默认值
    constructor() {
        super();
        console.log('1=constructor');
        this.state = {
            n: 1
        }
    }

    componentWillMount() {
        console.log('3=componentWillMount 第一次渲染前', this.refs.HH);
        // 在这里，如果直接setState修改数据（同步的），会把状态信息改变后，然后render和didMount，如果setState是放到一个异步操作中完成（例如：定时器或者从服务器获取数据），也是先执行render和did
        // 然后再执行这个异步操作修改状态，紧接着走修改的流程（这样和放到didMount中没啥区别），所以我们一般吧数据请求放到DID中处理
        // 真实项目中的数据绑定，第一次组件渲染，我们都是绑定的默认属性，第二次才是从服务器获取的数据，有些属性，我们需要根据数据是否存在，判断显示隐藏
    }

    componentDidMount() {
        console.log('4=componentWillMount 第一次渲染后', this.refs.HH);
        //真实项目中，这个阶段一般做如下处理：
        //  1、控制状态信息更改的操作
        //  2、从服务器获取数据，然后修改状态信息，完成数据绑定
        setInterval(() => {
            this.setState({
                n: this.state.n + 1
            })
        }, 5000)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this.state.n   更新之前的
        console.log('5=shouldComponentUpdate 函数返回true（允许），false（不允许）');
        // return true

        /*在这个钩子函数中，我们获取的state不是最新修改的，而是上一次的state的值
         例如：第一次加载完成后，5000ms后，我们基于setState把n修改为2，但是此处获取的还是1呢
         但是这个有两个参数：
          nextProps:最新修改的属性
          nextState：最新修改的状态
        */

        if (nextState.n > 3) {
            return true
        } else {
            return false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // this.state.n  也是更新之前的，也有两个参数存储最新的信息
        console.log('6=componentWillUpdate');
    }

    componentDidUpdate() {
        // this.state.n   更新之后的
        // 先render
        console.log('8=componentWillUpdate');
    }

    render() {
        console.log('2=render');
        return <section ref='HH'>
            {this.state.n}
        </section>
    }
}

ReactDOM.render(<main>
    <A></A>
</main>, root);

