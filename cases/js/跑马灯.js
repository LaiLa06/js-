
// 实现JS动画

// 让wrapper每间隔一段时间（最优动画时间是13-17ms）在原有的left值基础值减去步长（想让动画快一点，步长就大一点）
let wrapper = document.querySelector(".wrapper");

wrapper.innerHTML += wrapper.innerHTML;   // 克隆一份
utils.css(wrapper, 'width', utils.css(wrapper, 'width') * 2);  // 克隆完整后，别忘记修改一下wrapper的宽度
setInterval(()=>{
    // 获取当前wrapper 的left 值
    let curL = utils.css(wrapper,'left');
    curL -=2;
    utils.css(wrapper,{
        left: curL
    });
    //=>实现无缝:当我们UL距离MARQUEE-BOX的左偏移已经是整个WRAPPER的一半宽度(第一组原始内容已经运动完成了，现在看到的是克隆后的)，此时我们让WRAPPER立即运动到LEFT为零的位置即可
    if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
        utils.css(wrapper, 'left', 0);//=>立即回到起始的位置
    }
},13);

