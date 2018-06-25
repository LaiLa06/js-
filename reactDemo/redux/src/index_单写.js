import React from 'react';
import ReactDOM from 'react-dom';
import Vote from "./component/vote/Vote";
import 'bootstrap/dist/css/bootstrap.css'
import {createStore} from "redux"

/*创建容器：需要把reducer传递进来
  reducer的作用：
  1、登记了所有状态更改的信息（根据行为标识走不同的修改任务）
  2、修改容器中的状态信息
*/
let reducer = (state={n:0,m:0},action,)=>{
    /*state:原来的状态信息，没有原始状态，给一个初始值
      action:dispatch任务派发的时候传递的行为对象，这个对象中必有一个type属性，是操作的行为标识，
      reducer就是根据和这个行为标识来识别改该如何修改状态信息
    */
    let {type} = action;
    switch (action.type){
        case 'VOTE_SUPPORT':
            state = {...state,n:state.n+1};
            break;
        case 'VOTE_AGAINST':
            state = {...state,m:state.m+1};
            break;
    }
    return state   // 只有把最新的state返回，原有的状态才会被修改
};
let store = createStore(reducer);
/*创建store中提供三个方法（执行createStore()return三个方法）：
  dispatch：派发行为（传递一个对象，对象有有一个type属性，目的是通知reducer修改状态信息）
  subscribe：事件池追加方法
  getState：获取最新管理的状态信息
*/

ReactDOM.render(<main>
    <Vote title={'英格兰VS巴拿马'} store={store}/>
</main>, document.getElementById('root'));
