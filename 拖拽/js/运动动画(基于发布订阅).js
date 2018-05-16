
// 浏览器有最小计算（反应）时间，同样的距离移动，操作快（用的时间短）
// 浏览器能够反应过来的次数越小，触发mousemove这个行为次数也变少了，
// 如果移动的慢，反应次数多，触发行为的次数也就多了

// 水平方向的运动只跟即将松开手的一瞬间运动的速度有关 ： 我们获取的就是即将松开一瞬间的速度



let box = document.getElementById('box');

let subscribeDown = new Subscribe(),
    subscribeMove = new Subscribe(),
    subscribeUp = new Subscribe();
let down = function down(ev){
    // 记录鼠标和盒子的起始位置
    this.strX = ev.clientX;
    this.strY = ev.clientY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;

    // 绑定document是为了防止鼠标操作过快，离开box盒子，导致焦点丢失问题 ，这样做后
    // 不管鼠标如何运动，基本上也是离不开整个文档的
    // document.onmousemove = move.bind(this);
    // document.onmouseup = up.bind(this);
    //   此处我们用DOM2事件绑定方法更好一点（这样可以避免由于DOM0只能绑定一个方法，
    // 后期可能会导致其他绑定的方法覆盖我们绑定的）

    // DOM2进行数据绑定是可以的，但是考虑到后期需要把绑定的方法移除，所以不能绑定匿名函数
    // （move.bind(this)）的返回结果就是一个匿名函数
    this.MOVE = move.bind(this);
    this.UP = up.bind(this);

    document.addEventListener('mousemove',this.MOVE);
    document.addEventListener('mouseup',this.UP);

    subscribeDown.fire(this,ev)

};
let move = function move(ev) {
    // 随时根据鼠标的移动，计算出盒子当前的位置，鼠标当前位置-鼠标起始位置+盒子起始位置就是盒子的额当前位置。
    let curL = ev.clientX - this.strX + this.strL,
        curT = ev.clientY - this.strY + this.strT;

    this.style.left = curL +'px';
    this.style.top = curT + 'px';

    subscribeMove.fire(this,ev)

};
let up = function up(ev) {
    // 拖拽结束，把document上绑定的方法都移除掉即可
    //   document.onmousemove = null;
    //   document.onmouseup = null;
    document.removeEventListener('mousemove',this.MOVE);
    document.removeEventListener('mouseup',this.UP);

    subscribeUp.fire(this,ev)
};

box.onmousedown = down;


//==================================

//=>浏览器有最小计算(反应)时间，同样的距离移动，操作快（用的时间短），浏览器能够反应过来的次数就少，触发MOUSE-MOVE这个行为次数也就变少了，如果移动的慢，反应次数多，触发行为的次数也就多了
//=>水平方向的运动只跟即将松开手的一瞬间运动的速度有关系：我们需要获取的就是即将松开一瞬间的速度

//1.移动中随时计算速度
subscribeMove.add((curEle, ev) => {
    //=>第一次开始运动：让LAST-FLY(上一次的位置)以及SPEED-FLY(最新的速度)都为初始当前位置
    if (!curEle.lastFly) {
        curEle.lastFly = curEle.offsetLeft;
        curEle.speedFly = 0;
        return;
    }
    //=>第二次移动：用当前的值-上一次记录的值，就是最新的差值（速度），当前最新的值很快就会成为下一次的上一次的值，直到拖动结束为止
    curEle.speedFly = curEle.offsetLeft - curEle.lastFly;
    curEle.lastFly = curEle.offsetLeft;
});

//2.离开的时候做一些事情（根据获取的SPEED-FLY）让元素运动起来
subscribeUp.add((curEle, ev) => {
    //=>curEle.speedFly:记录了最后一次运动的速度
    //计算边界
    let minL = 0,
        maxL = document.documentElement.clientWidth - curEle.offsetWidth;

    //动画运动之前计算运动的方向
    let speed = curEle.speedFly,
        dir = 'right';
    speed < 0 ? dir = 'left' : null;
    speed = Math.abs(speed);

    //开始按照方向运动
    curEle.flyTimer = setInterval(() => {
        //offsetLeft获取的值都会四舍五入,所以在当前LEFT基础上+小于0.5的速度，下一次在获取当前LEFT值的时候还是会被省略到，也就是元素不在运动，此时结束定时器
        if (speed < 0.5) {
            clearInterval(curEle.flyTimer);
            return;
        }

        //实现指数衰减的运动，一直到速度为零位置
        speed *= .98;
        let curL = curEle.offsetLeft;
        if (dir === 'right') {
            if (curL >= maxL) {
                //向右走到达右边界
                curEle.style.left = maxL + 'px';
                dir = 'left';
                return;
            }
            curL += speed;
        } else {
            if (curL <= minL) {
                //向左走到达左边界
                curEle.style.left = minL + 'px';
                dir = 'right';
                return;
            }
            curL -= speed;
        }
        curEle.style.left = curL + 'px';
    }, 17);
});

//3.当我们按住盒子的时候，还要结束当前所有正在运动的动画
subscribeDown.add((curEle, ev) => {
    clearInterval(curEle.flyTimer);
    curEle.speedFly = undefined;

    clearInterval(curEle.dropTimer);
});

//4.实现垂直方向的运动
subscribeUp.add((curEle, ev) => {
    let speed = 9.8,
        minT = 0,
        maxT = document.documentElement.clientHeight - curEle.offsetHeight,
        flag = 0;

    curEle.dropTimer = setInterval(() => {
        if (flag > 1) {
            clearInterval(curEle.dropTimer);
            return;
        }
        //实现速度衰减和加速
        speed += 10;
        speed *= .98;

        let curT = curEle.offsetTop;
        curT += speed;
        if (curT >= maxT) {
            curEle.style.top = maxT + 'px';
            speed *= -1;
            flag++;
            return;
        }
        if (curT <= minT) {
            curEle.style.top = minT + 'px';
            speed *= -1;
            return;
        }
        curEle.style.top = curT + 'px';
        flag = 0;
    }, 17);
});