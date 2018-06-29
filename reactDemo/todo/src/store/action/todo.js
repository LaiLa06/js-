import * as TYPES from '../action-types';

let todo ={
  add(pryload){
      return {
          type:TYPES.TODO_ADD,
          pryload
      }
  },
  filter(text){
    return {
        type:TYPES.TODO_FILTER,
        text
    }
  }
};
export default todo;

