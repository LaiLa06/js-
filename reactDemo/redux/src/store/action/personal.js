/*
  每个版块单独的actionCreator：就是把dispatch 派发的时候需要传递的action对象进一步统一封装处理
*/

import * as TYPE from '../../store/action-type'

let personal ={
    support(){
        // dispatch派发的时候需要传递啥就返回啥即可
        return{
            type:TYPE.VOTE_SUPPORT
        }
    }
}

export default personal