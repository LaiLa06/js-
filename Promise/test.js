let Promise = require('./promise.js');

let p1 = new Promise((resolve,reject)=>{

   resolve(100)
}).then(()=>{

});


let p2 = p1.then(res=>{
    return new Promise((resolve,reject)=>{

    })
    // throw new Error("error")
},reason =>{
    console.log(2);
}).then();

p2.then(reasult=>{
    return aaa
}).catch(reason => {
    console.log(reason);
});
