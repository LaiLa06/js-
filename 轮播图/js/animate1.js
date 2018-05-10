
let utils = (function () {
    let getCss = function (ele,attr) {
       if('getComputedStyle' in window){
           let val = window.getComputedStyle(ele)[attr],
               reg = /^-?\d+(\.\d+)?(rem|em|px|pt)?$/;
           if(reg.test(val)){
               val = parseFloat(val);
           }
           return val;
       }
    };
    let setCss = function (ele,attr,value) {
      if(!isNaN(value)){
          if(!/^(opacity|zIndex)$/.test(attr)){
            value += 'px';
            ele['style'][attr] = value;
          }
      }
    };
    let setGroupCss = function (ele,options = {}) {
       for(let key in options){
          if(options.hasOwnProperty(key)) {
              setCss(ele,key,options[key]) ;
          }
       }
    };
    let css = function (...arg) {
       let len = arg.length,
            fn = getCss;
       len >=3? fn= setCss:null;
       len ===2 && typeof arg[1] === 'object' ?fn=setGroupCss:null;
       return fn(...arg);
    };
    return{
        css
    }
})();

(function () {
    let effect ={
        Linear:(time,duration,change,begin)=>time/duration*change+begin
    };
    window.animate = function(ele,target = {} , duration=1000,callback=new Function()){
       let change = {},
           time = 0,
           begin = {},
           interval = 17,
           cur= {};
       for(let key in target){
          if(target.hasOwnProperty(key)) {
              begin[key] = utils.css(ele,key);
              change[key] = target[key] - begin[key];
          }
       };
       if(typeof duration === 'function'){
           callback =  duration;
           duration = 1000;
       };
        clearInterval(ele.timer);
       ele.timer = setInterval(()=>{
           time += interval;
           if(time>=duration){
              clearInterval(ele.timer);
              utils.css(ele,target);
              callback && callback.call(ele);
              return;
           }
           for(let key in target){
               if(target.hasOwnProperty(key)) {
                   cur[key] = effect.Linear(time,duration,change[key],begin[key]);
               }
           };
           utils.css(ele,cur);
       },interval)
    }
})();


