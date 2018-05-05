// animate 动画库

(function(){
    // 准备操作css样式的方法 getCss 、setCss、setGroupCss 、css
    let utils = (function () {
        //=>获取样式
        let getCss = (ele, attr) => {
            let val = null,
                reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
            if ('getComputedStyle' in window) {
                val = window.getComputedStyle(ele)[attr];
                if (reg.test(val)) {
                    val = parseFloat(val);
                }
            }
            return val;
        };

        //=>设置样式
        let setCss = (ele, attr, value) => {
            if (!isNaN(value)) {
                if (!/^(opacity|zIndex)$/.test(attr)) {
                    value += 'px';
                }
            }
            ele['style'][attr] = value;
        };

        //=>批量设置样式
        let setGroupCss = (ele, options) => {
            for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss(ele, attr, options[attr]);
                }
            }
        };

        //=>合并为一个
        let css = (...arg) => {
            let len = arg.length,
                fn = getCss;
            if (len >= 3) {
                fn = setCss;
            }
            if (len === 2 && typeof arg[1] === 'object') {
                fn = setGroupCss;
            }
            return fn(...arg);
        };

        return {css}
    })();
    // 准备运动的公式
    let effect = {
        Linear:(t,b,c,d)=>t/d*c+b,
    };
    // 封装动画库
    window.animate = function(ele,target={},duration=1000,callback = new Function()){
        // 不传callback，就默认为一个空函数，动画完成后调用callback函数
        //基于target计算出begin/ change
        let begin = {},
            change = {},
            time = 0,
            cur = {};
        for (let attr in target) {
            if(target.hasOwnProperty(attr)){
                begin [attr] = utils.css(ele,attr);
                change[attr] = target[attr]-begin[attr];
            }
        };
        // 验证是否传递四个参数
        if(typeof duration === 'function'){
            callback = duration;
            duration = 1000;
        }
        // 实现动画
        ele.animateTimer = setInterval(()=>{
            clearInterval(this);
            // 在给当前元素设置新的动画之前，要先清空原有动画，
            // （防止多动画共存，把动画的返回值赋值给当前元素的自定义属性，这样只要元素不变）
            // 我们不管在哪执行，都是只执行当前动画
            time += 17;
            if(time>=duration){
                utils.css(ele,target);
                clearInterval(this);
                callback.call(ele);  // 动画执行后执行callback，并且让回调函数中的this指向当前元素
                return;
            };
            // 依托target算出每个方向的当前位置
            for (let attr in target) {
                if(target.hasOwnProperty(attr)){
                    cur[attr] = effect.Linear(time,begin[attr],change[attr],duration);
                }
            }
            utils.css(ele,cur);
        })
    }
})();

// 调用方法：

/*
animate(box,{
    top:300,
    left:500,
    width:100,
    height:100,
    borderRadius:100
});*/
