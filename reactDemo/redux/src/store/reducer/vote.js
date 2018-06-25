/*
vote模块的reducer
   state：原始redux管理状态信息，没有的值（设置初始值）
   action：dispatch 派发的时候，传递的行为对象（type...）
*/

import * as TYPE from '../action-type'     // 把action-type中所有模块都导进来，重命名为TYPE，TYPE对象中包含了所有导出的信息(Es6 module)

export default function vote(state = {
    n: 0,
    m: 0
}, action) {
    switch (action.type) {
        case TYPE.VOTE_SUPPORT:
            state = {...state, n: state.n + 1};
            break;
        case TYPE.VOTE_AGAINST:
            state = {...state, m: state.m + 1};
            break;
    }
    return state;
}

