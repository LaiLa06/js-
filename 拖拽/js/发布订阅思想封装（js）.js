
// 下面的这个思想就是发布订阅思想

// jq中的发布订阅

// let $plan = $.Callbacks();
// $plan.add(function(){});
// $plan.remove(function(){});
// $plan.fire(10,20);

(function annoymous(window){
    class Subscribe {
        constructor(){
            // 创建一个容器（每一个实例都有一个自己独有的容器，管理自己执行的方法即可）
            this.pond = [];
        }
        // 向计划表（Pond池子）中增加方法,去重
        add(fn){
          let pond = this.pond,
              isExist = false;    // 默认是不存在
          pond.forEach((item)=>{
              item === fn ? isExist = true : null
          });
          !isExist ? pond.push(fn) : null;
        }
        // 从计划表（pond）中移除方法
        remove(fn){
         let pond = this.pond;
         pond.forEach((item,index) =>{
           if(item === fn){
               //pond.splice(index,1);   // 不能用splice删除，因为这种删除方式会改变原有的数组
               // 例如：我们通知方法执行，当执行到fn3的时候，for循环索引是2，
               // 但是基于splice把fn1 / fn2 删除后，原始数组后面的项都向前2位
               // 此时fire中继续遍历下一个方法（索引3），已经找不到和他匹配的那一项了

               // 所以我们不删除，我们只是让其赋值为null，
               // 不是函数的不能执行，并且我们最好把不是函数的这一项干掉
               // item = null // 不行
               pond[index] = null;
           }
         })
        }
        // 通知计划表中的方法依次执行:如果传参了,把这些参数依次赋值给执行的每一个方法
        fire(...arg){
          let pond = this.pond;
            // 此时 item 不一定都是函数，还有可能是null，null的话不执行，并且最好把这一项删除掉
            for (let i = 0; i < pond.length; i++) {
               let item = pond[i];
               if(item === null){
                   pond.splice(i,1);
                   i--;
                   continue;
               }
              item(...arg);
            }
        }
    }
    window.Subscribe = Subscribe;
})(window);

// let subscribe = new Subscribe();
// subscribe.add();
// subscribe.remove();
// subscribe.fire();

// 下面是案例

// let subscribe = new Subscribe();
//
// let fn1 = function fn1(...arg) {
//     console.log(1,arg);
// };
// let fn2 = function fn2(...arg) {
//     console.log(2);
// };
// let fn3 = function fn3() {
//     console.log(3);
//     subscribe.remove(fn1);
//     subscribe.remove(fn2);
// };
// let fn4 = function fn4() {
//     console.log(4);
// };
// subscribe.add(fn1);
// subscribe.add(fn2);
// subscribe.add(fn1);
// subscribe.add(fn3);
// subscribe.add(fn4);
//
//
// let timer = setInterval(()=>{
//     subscribe.fire(100,200);
// },1000);
//
// setTimeout(()=>{
//     clearInterval(timer);
// },0);