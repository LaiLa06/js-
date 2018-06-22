import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

class Temp extends React.Component{
    constructor(){
        super();
        this.state = {
            text:'小姐姐'
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({text:'小哥哥'})
        },1000)
    }
    render(){
        let {text} = this.state;

        return <section className='panel panel-default'>
            <div className='panel-heading'>
                <input type="text" className='form-control' value={text} onChange={ev=>{
                    // 在onChange中修改状态信息，实现的是视图改变数据
                    this.setState({
                        text:ev.target.value
                    })
                }}/>
            </div>
            <div className='panel-body'>
                {text}
            </div>
        </section>
    }
}

ReactDOM.render(<main>
    <Temp></Temp>
</main>,root);