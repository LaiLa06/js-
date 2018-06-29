import React from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Redirect,Link,NavLink} from 'react-router-dom'
import List from './custom/List'
import Detail from './custom/Detail'
import Create from './custom/Create'

class Custom extends React.Component{
    constructor(props,context){
        super(props,context)
    }
    render(){
        return <section>
            <ul className={'nav nav-pills nav-stacked col-md-2'}>
                <li className={'presentation'}>
                    <NavLink to={'/custom/list'}>客户列表</NavLink>
                </li>
                <li className={'presentation'}>
                    <NavLink to={'/custom/create'}>增加客户</NavLink>
                </li>
            </ul>
            {/*二级路由*/}
            <div className={'col-md-10'}>
                <Switch>
                    {/*<Route path={'/custom'} exact component={List}/>    */}
                    <Route path={'/custom/list'} component={List}/>
                    <Route path={'/custom/create'} component={Create}/>
                    <Route path={'/custom/detail/:id'} component={Detail}/>
                    {/*重定向也可以*/}
                    <Redirect from={'/custom'} to={'/custom/list'}></Redirect>
                </Switch>
            </div>
        </section>
    }
}

export default connect()(Custom)