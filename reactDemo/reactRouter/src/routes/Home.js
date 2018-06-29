import React from 'react'
import {connect} from 'react-redux'
import {LocaleProvider,DatePicker,Icon,Calendar} from 'antd'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '../static/css/antd.css'

class Home extends React.Component{
    constructor(props,context){
        super(props,context)
    }
    render(){
        return <LocaleProvider locale={zhCN}>
            {/*只要LocaleProvider包含的组件都是被汉化的根组件*/}
          <div>
              <DatePicker/>
              <Icon type="alipay-circle"  style={{ fontSize: 25, color: '#08c' }}/>
          </div>
        </LocaleProvider>
    }
}

export default connect()(Home)