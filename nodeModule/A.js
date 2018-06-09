let fn = (...arg) => {
    // let aa = arg.reduce((prev, next) => {
    //     return prev + next
    // })
    let aa = eval(arg.join("+"))
    console.log(aa);
    
    return aa
}
module.exports.sum = fn;
