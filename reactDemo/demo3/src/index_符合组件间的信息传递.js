import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

// head组件
class Head extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <section className= 'panel-heading'>
          {/*子组件通过属性接收从父组件传过来的值  */}
          <h3 className='panel-title' style={{fontSize:'15px',fontWeight:'bold'}}>点击次数：{this.props.count}</h3>
        </section>;
    }
}

// body组件
class Body extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <section className= 'panel-body'>
            {/*接收父组件传递过来的方法*/}
            <button className='btn btn-success' onClick={this.props.callback}>点我啊!</button>
        </section>;
    }
}

class Panel extends React.Component{
    constructor(){
        super();
        // 初始化状态
        this.state={
          n:0
        }
    }
    fn = ()=>{
      this.setState({
          n:this.state.n + 1
      })
    };
    render(){
        return <section className= 'panel panel-default' style={{width:'80%',margin:'20px auto'}}>
            {/*父组件在调取子组件的时候，通过属性把信息传递给子组件*/}
           <Head count={this.state.n}/>
            {/*父组件把自己的一个方法基于属性传递给子组件，目的是在于子组件中执行这个方法*/}
           <Body callback={this.fn}/>
        </section>;
    }
}

ReactDOM.render(<main>
  <Panel/>
</main>,root)