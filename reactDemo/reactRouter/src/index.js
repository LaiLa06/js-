import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store/index'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'

import Nav from './component/Nav'
import Home from './routes/Home'
import Custom from './routes/Custom'
import Plan from './routes/Plan'

import "bootstrap/dist/css/bootstrap.css"
import './static/css/common.css'

ReactDOM.render(<Provider store={store}>
    <HashRouter>
        <div>
            <Nav/>
            {/*基于hash路由展示不同的页面*/}
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/custom'} component={Custom}/>
                <Route path={'/plan'} component={Plan}/>
                <Redirect to={'/?lx=unsafe'}/>
            </Switch>
        </div>
    </HashRouter>
</Provider>, document.getElementById('root'));

