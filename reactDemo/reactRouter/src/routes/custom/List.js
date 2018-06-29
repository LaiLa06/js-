import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class List extends React.Component{
    constructor(props,context){
        super(props,context)
    }
    render(){
        let {data} = this.props;
        return <div>
            <ul className={'list-group'}>{
                data.map((item,index)=>{
                    let {id,name}= item;
                   /* return  <li className={'list-group-item'} key={index} onClick={ev=>{
                     this.props.history.push({pathname:'/custom/detail'})
                    }}>
                        编号：{id} &nbsp;&nbsp;姓名：{name}
                    </li>*/
                    return  <li className={'list-group-item'} key={index}>
                        <Link to={{
                            /*pathname:'/custom/detail',
                            search:`?id=${id}`,
                            state:''*/
                            pathname:`/custom/detail/${id}`
                        }}>编号：{id} &nbsp;&nbsp;姓名：{name}</Link>
                    </li>
                })
            }</ul>
        </div>
    }
}

export default connect(state=>({...state.custom}))(List)