let box = document.getElementById('box');

let S

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

};
let move = function move(ev) {
    // 随时根据鼠标的移动，计算出盒子当前的位置，鼠标当前位置-鼠标起始位置+盒子起始位置就是盒子的额当前位置。
    let curL = ev.clientX - this.strX + this.strL,
        curT = ev.clientY - this.strY + this.strT;


    this.style.left = curL +'px';
    this.style.top = curT + 'px';
};
let up = function up() {
    // 拖拽结束，把document上绑定的方法都移除掉即可
    //   document.onmousemove = null;
    //   document.onmouseup = null;
    document.removeEventListener('mousemove',this.MOVE);
    document.removeEventListener('mouseup',this.UP);
};
console.log(box);

box.onmousedown = down;