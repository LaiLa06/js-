let temp1 = require('./A') ;
let avg = (...arg)=>{
   return temp1.sum(arg)/arg.length  

}
module.exports.avg = avg;