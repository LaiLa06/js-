import React from 'react'
import action from '../store/action'
import {connect} from 'react-redux'

class Body extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data} = this.props;

        return <div className={'panel-body'}>
           <ul className={'list-group'}>{
               data.map((item,index)=>{
                   let {name}=item;
                   return <li className={'list-group-item'} key={index}>
                       <input type="checkbox" name={'todo'}/>
                       <span>{name}</span>
                       <a className={'btn-danger'}>删</a>
                   </li>
               })
           }</ul>
        </div>
    }
}
export default connect(state=>({...state.todo}),action.todo)(Body)