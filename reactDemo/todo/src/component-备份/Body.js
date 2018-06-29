import React from 'react'
import action from "../store/action";
import {connect} from "react-redux";

class Body extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // 获取数据，筛选对应的内容
        let {data, flag} = this.props;
        data = data.filter(item => {
            let {state} = item;
            state = parseFloat(state);
            if (flag === 'complete') return state === 1;
            if (flag === 'uncompleted') return state === 0;
            return true
        });
        return <div className={'panel-body'}>
            <ul className={'list-group'}>{
                data.map((item, index) => {
                    let {name, id, state} = item;
                        state = parseFloat(state);
                    return <li key={index} className={'list-group-item'}>
                        <input type="checkbox" name='todo' checked={!!state} onChange={ev=>{
                            /*更新当前任务的状态信息*/
                            let newState = ev.target.checked ? 1 : 0;
                            this.props.updateState(id, newState)
                        }}/>
                        <span className={state===1?'complete':''}>{name}</span>
                        <a className={'btn-danger'} onClick={ev=>{
                          let isOk = window.confirm('一旦删除就不能还原，确定要删除吗？');
                          if(isOk){
                              this.props.remove(id)
                          }
                        }}>删</a>
                    </li>
                })
            }
            </ul>
        </div>
    }
}

export default connect(state => ({...state.todo}), action.todo)(Body);
