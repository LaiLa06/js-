import * as TYPES from '../action-types'

export default function todo(state = {
    data: [],   // 任务
    flag: 'all'
}, action) {
    state = JSON.parse(JSON.stringify(state));   // 为了防止直接修改原有的状态信息，我们把原有的深度克隆一份，return的结果才是能覆盖原有state的信息
    switch (action.type) {
        case TYPES.TODO_ADD:
            let {payload} = action;   // 传进来需要增加的信息
            payload.id = state.data.length === 0 ? 1 : parseFloat(state.data[state.data.length - 1]['id'] + 1);
            state.data.push(payload);
            break;
        /*更新指定任务状态信息*/
        case TYPES.TODO_FILTER:
            state.flag = action.text;
            break;
        case TYPES.TODO_UPDATE_STATE:
            let {taskId,newState} = action,
            item = state.data.find(item=>item.id===taskId);
            if(item){
               item.state = newState;
            }
            break;
        case TYPES.TODO_DELETE:
            let {taskId:taskId_del} = action;     // 为了防止重名，要起个别名
            state.data = state.data.filter(item=>item.id !==taskId_del);
            break;
        default:
            break;
    }
    return state
}

