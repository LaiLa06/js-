import * as TYPES from '../action-types'

export default function todo(state = {
  data:[{
      id:1,
      name:'珠峰培训'
  }],
}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // 增加用户信息
        case TYPES.CUSTOM_CREATE:
            let {payload} = action;
            state.data.push(payload);
            break;
        default:
            break;
    }
    return state
}

