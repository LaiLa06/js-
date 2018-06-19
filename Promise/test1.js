let Promise = require('./promise.js');

// let  p1 = new Promise((resolve, reject) => {
//     // resolve(100);
//     // reject(200);
//
//     setTimeout(() => {
//         Math.random() < 0.5 ? resolve(100) : reject(-100)
//     }, 1000);
// });
//
// let p2 = p1.then((res) => {
//     // 成功执行这个
//     console.log(res);
//     return res+100
// }, (err) => {+
//     // 失败执行这个
//     console.log(err);
//     return err+100
// });
// console.log(p2);
// let p3 = p2.then((res)=>{
//     console.log("11111111111111",res);
// },(err)=>{
//     console.log(err,"11111111111111");
// });
//
// p3.then(()=>{
//
// }).catch(()=>{
//
// });

Promise.all([]).then(result=>{
   // result  存储的是【】中所有Promise实例执行的返回的结果，按数组的顺序排列，不管【】中的内部代码的执行顺序

});