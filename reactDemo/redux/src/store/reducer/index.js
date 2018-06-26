/*
  把每个模块单独设定的reducer最后合并成为总的reducer,为了保证合并reducer的过程中，每个模块管理的状态信息不会相互冲突，redux 在合并的时候把容器中的状态进行
  分开管理（以合并reducer时候设置的属性名作为状态划分的属性，把每个版块管理的状态放到自己的属性下即可）
  state = {
    vote:{
      n:0,
      m:0
    },
    personal:{
      baseInfo:{}
    }
  }
  获取的时候：store.getState().vote.n   store.getState().personal.baseInfo
*/

import {combineReducers} from "redux"
import vote from './vote'
import personal from './personal'

//combineReducers可以合并

let reducer = combineReducers({
    vote,
    personal
});

export default reducer;



