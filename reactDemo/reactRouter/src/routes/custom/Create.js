import React from 'react'
import {connect} from 'react-redux'
import action from '../../store/action'

class Create extends React.Component{
    constructor(props,context){
        super(props,context)
    }
    render(){
        return <div>
            用户编号：<input type='text' ref={'user_id'}/><br/><br/>
            用户姓名：<input type='text' ref={'user_name'}/><br/><br/>
            <button onClick={this.submit}>增加用户</button>
        </div>
    }
    submit = ev=>{
      let {user_id,user_name}=this.refs,
          {create,history} = this.props;
        console.log(this.props);
        if(user_name.value.length===0 || user_id.value.length===0){
            window.confirm('请输入内容');
            return;
        }
        create({
          id:parseFloat(user_id.value),
          name:user_name.value
      });
        user_id.value=user_name.value='';
      // 回到列表页面
        history.push('/custom/list')
    }
}

export default connect(state=>({...state.custom}),action.custom)(Create)