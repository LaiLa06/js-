// ES6中的新增的内置类,目的是为了管理异步操作，

// 1、new Promise()   创建一个Promise实例，每个实例都可以管理一个异步操作,里面必须传递一个异步回调，不传会报错
// 回调中会有两个参数：
// resolve：异步操作成功，成功后的事件队列 => 成功后要做的所有事件
// reject：异步操作失败，失败后的事件队列 => 失败后
// new Promise()  的时候，立即把回调执行了（Promise是同步的）


let promise1 = new Promise((resolve, reject) => {
    $.ajax('json/data.json', {
        success(res) {
            resolve(res);
        },
        error(msg) {
            reject(msg)
        }
    });
});

// 2、基于Promise.prototype.then方法（catch、finally两个方法）向成功队列和失败队列一次加入需要处理的事情
promise1.then(
    res => {
        console.log(res);
    },
    msg => {
        console.log(msg);
    }
).then(
    res => {
        console.log('then2', 'ok',res);
    },
    msg => {
        console.log('then2', 'no',msg);
    }
);

// =>创建一个Promise实例，就形成两个队列（成功队列resolve，失败队列reject）
// =>执行回调，发布ajax请求（异步，放等待队列中，继续向下执行）
// => 执行then方法，将第一个参数（函数）放成功队列，第二个函数参数放失败队列里面
// => 执行第二个then....
// => 异步操作结束，开始执行对应的方法
// A：请求成功：resolve，先把成功队列的第一个方法执行.
// （当前函数的实参是上一个函数的返回值）
// B：请求失败：reject，

// 多个then,不是我们像我们想象的,依次把方法执行,异步操作成功或者失败,先把第一个then中的方法执行,每执行一个then会返回一个新的Promise实例,这个实例管控的是第一个then的方法中执行的成功或者失败

// 成功的执行第一个函数参数,失败执行第二个函数参数


// 两个状态 ?

// 建议不要then中的第二个参数，这样有点乱，建议使用Promise.prototype.catch来管理失败的情况

promise1.then(res => {
    console.log(res);
}).catch(msg=>{
    // 1、异步请求失败，会执行它
    // 2、第一个then请求失败，会执行它
}).then(res => {
    // 管控上一个then 和catch两个任何一个执行成功
    console.log('then2', 'ok', res);
}).catch(msg=>{
   // 上一个catch执行失败或者兄弟的then（这里是第二个then）的执行失败 ，执行这个
});

// promise1.finally();  不管上面执行成功或者失败都执行


// JS中的异常捕获（目的：把抛出异常的错误捕获到，不让其阻断浏览器的继续进行）

try{
    // 正常执行的代码，可能报错
}catch (e) {
   // try 中的方法报错，就执行这个
    console.log(e);  // e 报错信息

    //TypeError: 1 is not a function
    //     at <anonymous>:2:3

}finally {
    // 不管try中的代码成功或者失败都执行
}

// 真实项目一般不做失败的处理，只做成功的处理


// 缺个案例  ajax回调地狱
// return Promise实例
