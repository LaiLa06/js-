import * as TYPES from '../action-types';


let custom ={
    // payload:{id,name}
  /*create(payload){
      /!*Thunk中间件的使用语法:在指定执行派发任务的时候，等待3000ms后再派发*!/
     return dispatch=>{
         /!*dispatch都传递给我们了，我们想什么时候派发，自己搞定即可*!/
         setTimeout(()=>{
             dispatch({
                 type:TYPES.CUSTOM_CREATE,
                 payload
             })
         },1000)
     }
  }*/
  create(payload){
    /*传递给reducer的payload需要等待promise成功，把成功的结果传递过去 */
    return {
        type:TYPES.CUSTOM_CREATE,
        payload:new Promise(resolve=>{
            setTimeout(()=>{
                resolve(payload)
            },3000)
        })
    }
  }
};
export default custom;

