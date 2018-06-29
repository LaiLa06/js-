import React from 'react';
import {connect} from 'react-redux';
import {Link,NavLink,withRouter} from 'react-router-dom';

class Nav extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            count:1
        }
    }
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid col-md-2">
                    <Link href=" " className="navbar-brand" to={{
                        pathname:'/',
                        search:'?lx=logo'
                    }}>珠峰培训CRM</Link>
                </div>
                <div className="collapse navbar-collapse col-md-10">
                    <ul className="nav navbar-nav">
                        {/*NavLink不是点击谁，谁有选中样式，但是可以路由切换，而且当前页面哈希后的地址和navlink中的to进行比较，
                        哪个匹配了哪个才有选中样式*/}
                        {/*replace:路由回退的时候会有问题*/}
                        <li><NavLink to={'/'} exact replace>首页</NavLink></li>
                        <li><NavLink to={"/custom"}>客户管理</NavLink></li>
                        <li><NavLink to={"/plan"}>计划管理</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
    handle=()=>{
        this.setState({
            count:this.state.count+1
        })
    }
}


export default withRouter(connect()(Nav));   // 讲执行高阶后返回的Proxy组件受路由管控

