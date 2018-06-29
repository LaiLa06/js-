import * as TYPE from '../action-types';
import {TODO_FILTER} from "../action-types";

let todo ={
  add(payload){
      /*增加任务信息*/
      return{
          type:TYPE.TODO_ADD,
          payload
      }
  },
  filter(text){
      /*更新筛选的类别*/
     return {
         type:TODO_FILTER,
         text    //text可能的值： all complete uncompleted
     }
  },
    /*更新指定任务的状态信息*/
  updateState(taskId,newState){
      return{
          type:TYPE.TODO_UPDATE_STATE,
          taskId,
          newState
      }
  },
  /*删除指定任务信息*/
  remove(taskId){
      return{
          type:TYPE.TODO_DELETE,
          taskId
      }
  }
};
export default todo;


/**/