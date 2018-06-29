import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './static/less/todo.less'
import Head from "./component/Head";
import Body from "./component/Body";
import Footer from "ter fronent/Footer";
import store from './store'
import {Provider} from 'react-redux'

// ReactDOM.render(<main className={'panel panel-default'} style={{width:'80%',margin:'20px auto'}}>
//     <Head/>
//     <Body/>
//     <Footer/>
// </main>, document.getElementById('root'));

ReactDOM.render(<Provider store={store}>
        <main className={'panel panel-default'} style={{width: '80%', margin: '20px auto'}}>
            <Head/>
            <Body/>
            <Footer/>
        </main>
    </Provider>, document.getElementById('root'));

