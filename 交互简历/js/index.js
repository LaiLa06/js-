/*
       属性：
        controls：设置这个属性，则使用浏览器默认的播放器控制（项目中很少使用默认播放器，一般都是自己做的）
        autoplay：自动播放
        loop：播放完之后是否允许循环播放
        preload:资源预加载模式（none：开始的时候什么都不加载，播放的时候才加载[常用]	metadata：开始加载一些基础信息	auto：加载页面就开始加载资源）最好不要与play同时使用
        duration：播放的总时间，单位s	currentTime:当前已经播放的时间，单位s
        ended：是否已经播放结束：布尔类型
        paused：当前是否为暂停状态
        volume：控制音量【取值范围0-1,1最大，0静音】，默认1
        事件：
        canplay:可以正常播放事件【但是播放过程中可能出现卡顿】
        canplaythrough：资源加载完毕，可以顺畅播放了
        ended：已经播放完成
        loadedmetadata：资源的基础信息已经加载完成
        pause：触发了暂停
        play：触发了播放
        playing：正在播放中
        方法：
        pause()：暂停
        play()：播放
     */

// loading
let loadingRender = (function () {
    let $loadingBox = $(".loadingBox"),
        $current = $loadingBox.find(".current");
    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"]

    let n = 0,
        len = imgData.length;
    // 设置最长等待时间（假设是10s，到达10s我们看加载多少了，如果已经达到90%以上，我们可以正常访问内容了，如果不足，直接提示用户当前网络状态不好，稍后重试）
    let delayTimer = null;
    let maxdalay = function (callback) {
        delayTimer = setTimeout(() => {
            if (n / len >= .9) {
                $current.css("width", '100$');
                callback && callback()
            } else {
                alert("非常遗憾,您当前的网络不佳，请稍后重试！");
                window.reload();  //此时我们不应该继续加载页面，而是让其关掉页面或者是跳转到其他页面
            }
        }, 10000);
    };

    // 加载图片
    let run = function (callback) {

        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                //因为这里new  Image是为了测试这个图片资源有没有加载成功，
                // 如果加载成功了进入load函数里面，那么这个new出来的Image的作用就结束了
                //  为了防止它不占内存，所以手动清除掉
                tempImg = null;
                $current.css('width', (++n / len) * 100 + '%');
                // 加载完成,执行回调（让当前loading页消失）
                if (n === len) {
                    callback && callback();
                    clearTimeout(delayTimer);
                }
            };
            //src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错。
            tempImg.src = item;
        });
    };
    // 完成
    let done = function () {
        // 停留1s移除
        let timer = setTimeout(() => {
            $loadingBox.remove();
            clearTimeout(timer);
            phoneRender.init();
        }, 1000);
    };
    return {
        init: function () {
            $loadingBox.css('display', 'block');
            run(done);
            maxdalay(done);
        }
    }
})();
// phone
let phoneRender = (function () {
    let $phoneBox = $(".phoneBox"),
        $time = $phoneBox.find("span"),
        $answer = $phoneBox.find(".answer"),
        $answerMarkLink = $answer.find(".markLink"),
        $hang = $phoneBox.find(".hang"),
        $hangMarkLink = $hang.find(".markLink"),
        answerBell = $("#answerBell")[0],
        introduction = $("#introduction")[0];   //音视频一般都用原生操作

    let answerMarkTouch = function () {
        $answer.remove();
        answerBell.pause();
        $(answerBell).remove();
        $hang.css({
            'transform': 'translateY(0rem)'
        });
        $time.css('display', 'block');
        introduction.play();
        computedTimer();
    };
// 计算播放时间
    let autoTimer = null;
    let computedTimer = function () {
        // 我们让audio播放，首先去加载资源，部分资源加载完成后才会播放，才会计算出总时间
        // duration等信息，所以我们可以把获取信息放到canplay事件中
        let duration = 0;
        introduction.oncanplay = function () {
            duration = Math.round(introduction.duration);
            autoTimer = setInterval(() => {
                let val = Math.round(introduction.currentTime);
                if (val > duration) {
                    clearInterval(autoTimer);
                    closePhone();
                    return;
                }
                let min = Math.floor(val / 60),
                    second = Math.floor(val - min * 60);
                min = min < 10 ? '0' + min : min;
                second = second < 10 ? '0' + second : second;
                $time.html(`${min}:${second}`);
            }, 1000);
        };
    };
    // 关闭phone
    let closePhone = function () {
        clearInterval(autoTimer);
        introduction.pause();
        $(introduction).remove();
        $phoneBox.remove();
        messageRender.init();
    };
    return {
        init: function () {
            $phoneBox.css('display', 'block');
            // 播放bell
            answerBell.play();
            answerBell.volume = 0.3;
            $answerMarkLink.tap(answerMarkTouch);
            $hangMarkLink.tap(closePhone)
        }
    }
})();
// message
let messageRender = (function () {
    let $messageBox = $(".messageBox"),
        $wrapper = $messageBox.find(".wrapper"),
        $messageList = $wrapper.find("li"),
        $keyboard = $(".keyboard"),
        $textInp = $keyboard.find(".text"),
        $submit = $keyboard.find(".submit"),
        demonMusic = $("#demonMusic")[0];

    let step = -1,   //当前展示信息的索引
        total = $messageList.length + 1, // 信息总条数（自己还会发一条）
        autoTimer = null,  // 记录定时器
        interval = 1000;   // 信息出现的间隔时间

    let tt = 0;

    let showMessage = function () {
        ++step;
        if (step === 2) {
            //已经展示两条：此时我们暂时结束自动发送信息，开始手动发送
            clearInterval(autoTimer);
            handleSend();
            return;
        }
        let $cur = $messageList.eq(step);
        $cur.addClass('active');
        if (step >= 3) {
            // 如果已经展示4条或者4条以上了,我们让wrapper向上移动(移动的距离是虚拟展示这一条的高度)
            // 方案一：
            // let curH = $cur[0].offsetHeight,
            //     wraT = parseFloat($wrapper.css('top'));
            // $wrapper.css('top',wraT - curH);
            let curH = $cur[0].offsetHeight;
            // wraT = parseFloat($wrapper.css('transform'));   //js中基于css获取transform是个矩阵
            tt -= curH;
            console.log(tt);
            $wrapper.css('transform', `translateY(${tt}px)`);
        }
        if (step >= (total - 1)) {
            clearInterval(autoTimer);
            closeMessage();
        }
    };
// 手动发送信息
    let handleSend = function () {
        $keyboard.css('transform', 'translateY(0)').one('transitionend', () => {
            // $keyboard.css('transform','translateY(0)').on('transitionEnd',()=>{}
            // transitionEnd  监听当前元素transition动画结束的事件
            // 有几个样式属性改变，并且执行了过渡效果，事件就会被触发几次

            // 用one做事件绑定，只会触发一次

            let str = '好的，马上介绍!',
                n = -1,
                textTimer = null;
            textTimer = setInterval(() => {
                let originHtml = $textInp.html();
                $textInp.html(originHtml + str[++n]);
                if (n >= (str.length - 1)) {
                    clearInterval(textTimer);
                    $submit.css('display', 'block');
                }
            }, 100);
        });

    };
    // 点击submit
    let handleSubmit = function () {
        // 把新创建的li增加到页面的第二个li的后面
        $(`<li class="self">
                <i class="arrow"></i>
                <img src="img/zf_messageStudent.png" alt="" class="pic">
                ${$textInp.html()}
            </li>`).insertAfter($messageList.eq(1)).addClass('active');
        $messageList = $wrapper.find("li");
        //重要：把新的li放到页面中，我们此时应该重新获取li ，让 $messageList的索引保持不变
        // 该消失的消失
        $textInp.html('');
        $submit.css('display', 'none');
        $keyboard.css('transform', 'translateY(3.7rem)');
        // 继续向下展示剩余的信息
        autoTimer = setInterval(showMessage, interval);
    };
// 关掉message区域
    let closeMessage = function () {
        let delayTimer = setTimeout(() => {
            demonMusic.pause();
            $(demonMusic).remove();
            $keyboard.remove();
            $messageBox.remove();
            cubeRender.init();  // 执行下一模块
            clearInterval(delayTimer);
        }, interval)
    };
    return {
        init: function () {
            $messageBox.css('display', 'block');
            $keyboard.css('display', 'block');
            showMessage();  // 一进来就展示一张，后期间隔interval再发送呢一条信息
            autoTimer = setInterval(showMessage, interval);
            $submit.tap(handleSubmit);
            demonMusic.play();
            demonMusic.volume = .3;
        }
    }
})();
// cube
let cubeRender = (function () {
    let $cubeBox = $(".cubeBox"),
        $cube = $cubeBox.find(".cube"),
        $cubeList = $cube.find("li");

    let start = function (ev) {
        // 记录手指按在位置的起始坐标
        let point = ev.changedTouches[0];
        this.strX = point.clientX;
        this.strY = point.clientY;
        this.changeX = 0;
        this.changeY = 0;
    };
    let move = function (ev) {
        // 用最新手指的位置-起始的位置，记录xy轴的偏移
        let point = ev.changedTouches[0];

        this.changeX = point.clientX - this.strX;
        this.changeY = point.clientY - this.strY;
    };
    let end = function (ev) {
        // 获取change值 、rotate值
        let {changeX, changeY, rotateX, rotateY} = this,
            isMove = false;

        // 验证移动距离  小于10默认没有滑动
        Math.abs(changeX) > 10 || Math.abs(changeY) > 10 ? isMove = true : null;
        // 只有发生移动才做处理
        if(isMove){
           // 左右滑动，changeX = rotateY （正比）
           // 上下滑动，changeY = rotateY（反比）

           //  移动距离的1/3作为旋转角度
            rotateX = rotateX - changeY / 3;
            rotateY = rotateY + changeX / 3;
            // 赋值给魔方盒子
            $(this).css('transform', `scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            this.rotateX = rotateX;
            this.rotateY = rotateY;
        }
        // 清空其他记录的自定义属性值,做不做都行来着
        ['strX','strY','changeX','changeY'].forEach(item=>{
            this[item] = null;
        })
    };

    return {
        init: function () {
            $(".messageBox").remove();
            $cubeBox.css('display', 'block');
            // 手指操作cube，让cube跟着旋转
            let cube = $cube[0];
            cube.rotateX = -35; // 记录初始的旋转角度
            cube.rotateY = -35;

            $cube.on('touchstart', start);
            $cube.on('touchmove', move);
            $cube.on('touchend', end);
        }
    }
})();
// detail
let detailRender = (function(){
 let $detailBox = $(".detailBox"),
     swiper = null;
 let swiperInit = function () {
     swiper= new Swiper('.swiper-container',{
       // initialSlide :2, // 初始slide索引
       // direction:'horizontal/vertical'  // 控制滑动方向
       //   loop:true   // 有一个bug，3D切换设置loop为true的时候偶尔会实现无法切换的情况（2D没问题）
         // swiper的无缝轮播原理：把真实图片的第一张克隆一份放到末尾，把真实最后一张克隆一份放到开始
         // （真实slide有5个，wrapper中有7个slide）
         effect:'coverflow',
         onInit:(sw)=>{},
         onTransitionEnd:(sw)=>{
             //sw 当前实例
         }
         // 实例的私有属性：
         // 1、activeIndex：当前展示slide块的索引
         // 2、slides：获取所有的slides数组
         // ...
         // 实例的公有方法
         // 1、slideTo   // 切换到指定索引
         // ...
     })
 };

 return{
   init:function(){
       $detailBox.css("display","block");
       swiperInit();
   }
 }
})();
// 开发过程中，由于当前项目板块众多，我们最好每一个板块都是一个单例，我们最好规划一种机制，
// 通过标识的判断可以让程序只执行对应板块内容，这样开始哪个版本就把标识改为啥
// 最常用的标识是（hash路由）

let url = window.location.href,  //获取当前页面的url地址
// window.location.href = ''   //让其跳转到等号右边的地址
    well = url.indexOf("#"),
    hash = well === -1 ? null : url.substr(well + 1);

switch (hash) {
    case 'loading':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
    case 'message':
        messageRender.init();
        break;
    case 'cube':
        cubeRender.init();
        break;
    case 'detail':
        detailRender.init();
        break;
    default:
        loadingRender.init();
}
