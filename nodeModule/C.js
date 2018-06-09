// let temp = require('./B');
// console.log(temp.avg(12,23,34,45,56,67,78,89));

let fs = require('fs');
// fs.mkdir('./D',(err)=>{
//   if(err){console.log(err);}
//   console.log("文件夹创建成功");
// })

fs.readFile('./D/1.js','utf-8',(err,result)=>{
    if(err){
        console.log(err);
        
    }
    console.log(result);
    
})
// fs.writeFile('./D/1.js','hahha','utf-8',(err,result)=>{
//     if(err){
//         console.log(err);
        
//     }
//     console.log(result);
    
// });
fs.appendFile('./D/1.js',';','utf-8',(err,result)=>{
    if(err){
        console.log(err);
        
    }
    console.log(result);
    
})