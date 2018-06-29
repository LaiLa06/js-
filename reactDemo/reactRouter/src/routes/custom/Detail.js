import React from 'react'
import {connect} from 'react-redux'
import Qs from 'qs'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        /*问号传参：
        * */
        // 一：问号传参
        /*let {location: {search}, data} = this.props,
            customID = Qs.parse(search.substr(1)).id || 0;
        customID = parseFloat(customID);
        console.log(data);*/
        // 二、state
       /* let {location: {state}, data} = this.props,
            customID = state || 0;
        customID = parseFloat(customID);*/
        // 第三种 match
        let {match: {params}, data} = this.props,    //路由冒号后面的的值就是以后解析时候的属性名
            customID = parseFloat(params.id) || 0;
        console.log(this.props);

        let itemData = data.find(item => {
            return customID === item.id;
        });
        if (!itemData) return '当前用户不存在';
        return <div>
            编号：{itemData.id} <br/><br/>
            姓名：{itemData.name}
        </div>
    }
}

export default connect(state=>({...state.custom}))(Detail)

