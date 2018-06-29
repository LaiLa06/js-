import React from 'react';
import {connect} from 'react-redux'
import action from '../store/action'

/*
export default class Head extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return <div className="panel-heading">
            <h3 className="panel-title">
                任务列表【当前未完成任务书 <b className="text-danger">0</b>】
            </h3>
            <input type="text" className="form-control" placeholder="121212"/>
        </div>
    }
}
*/
class Head extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let {data} = this.props,
            len = data.filter(item=>(parseFloat(item['state']))===0).length;

        return <div className="panel-heading">
            <h3 className="panel-title">
                任务列表【当前未完成任务书 <b className="text-danger">{len}</b>  {/*筛选未完成的任务数*/}
            </h3>
            <input type="text" className="form-control" placeholder="请输入项目名称" onKeyUp={this.keyUp}/>
        </div>
    }
   /*向redux中追加一条新的任务*/
   keyUp = ev=>{
     /*enter*/
     if(ev.keyCode === 13){
        let value = ev.target.value.trim();
        if(ev.target.value.length===0)return;
        this.props.add({
            name:value,
            state:0      // 0-未完成
        })
         ev.target.value = '';
     }
   }
}
export default connect(state=>({...state.todo}),action.todo)(Head)