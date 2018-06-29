import React from 'react'
import {connect} from 'react-redux'
import action from '../store/action'

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.showData = [{text:'全部',flag:'all'},{text:'已完成',flag:'complete'},{text:'未完成',flag:'uncompleted'}]
    }
    render(){
        let {flag} = this.props;
        return <div className={'panel-footer'}>
            <ul className={'nav nav-pills'} onClick={this.updateFilter}>{
                this.showData.map((item,index)=>{
                    let {text,flag:itemFlag} = item;
                    return <li className={itemFlag===flag?'presentation active':'presentation'} key={index}>
                        <a flag={itemFlag}>{text}</a>
                    </li>
                })
            }</ul>
        </div>
    }
    updateFilter = ev=>{
        let target = ev.target,
            tagName = target.tagName;
        if(tagName==='LI'){
            target = target.firstElementChild;
            target = target.tagName;
        }
        if(tagName==='A'){
          let text = target.getAttribute('flag');
            target.innerHTML === '已完成'? text = 'complete':null;
            target.innerHTML === '未完成'? text = 'uncompleted':null;
            if (this.props.flag === text) return;
            this.props.filter(text)
        }
    }
}
export default connect(state=>({...state.todo}),action.todo)(Footer)