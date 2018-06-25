/*
store:
   reducer 存放每一个模块的reducer
      vote.js
      personal.js
      ...
      index.js 把每一个模块的reducer合并成一个reducer
   action 存放每一个模块需要进行的派发任务（ActionCreator）
     vote.js
     person.js
     ...
     index.js 把每一个模块action
   action-type.js:所有的派发任务的行为标识都在这里进行宏观管理
   index.js 创建store

*/

import  {createStore} from "redux"
import reducer from './reducer'   //  等价于 import reducer from './reducer/index'
// 创建store全过程

let store =  createStore(reducer);

export default  store;  // 以后用的时候，直接引入store即可

