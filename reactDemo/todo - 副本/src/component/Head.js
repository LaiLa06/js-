import React from 'react'
import action from '../store/action'
import {connect} from 'react-redux'

class Head extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data} = this.props,
            len = data.filter(item=>{
              return item.state===0
            }).length;
        return <div className={'panel-heading'}>
           <h3 className={'panel-title'}>
               任务列表【当前未完成任务书 <b className="text-danger">{len}</b>】
           </h3>
            <input type="text" className="form-control" placeholder="请输入项目名称" onKeyUp={this.keyUp}/>
        </div>
    }
    keyUp=ev=>{
        let target = ev.target;
        if(ev.keyCode===13){
            let value = target.value.trim();
            if(value.length===0)return;
            this.props.add({
                name:value,
                state:0  // 0是未完成，1是已完成
            })
            target.value='';
        }
    }
}

export default connect(state=>({...state.todo}),action.todo)(Head)