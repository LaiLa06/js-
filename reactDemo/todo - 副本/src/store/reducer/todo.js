import * as TYPES from '../action-types'

export default function todo(state={
 data:[],
 flag:'all'     // 可能的值 all complete uncompleted
},action) {
   state = JSON.parse(JSON.stringify(state));
  switch (action.type){
      case TYPES.TODO_ADD:
          let {pryload} = action;
          state.id= state.data.length===0?1:parseFloat(state.data[state.data.length-1]['id']+1);
          state.data.push(pryload);
          break;
      default:
      case TYPES.TODO_FILTER:
          state.flag = action.text;
          break;
  }
  return state
}