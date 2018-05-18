// loading
let loadingRender = (function () {
    let $loadingBox = $(".loadingBox"),
        $current = $loadingBox.find(".current");
    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"]
    let n = 0,
        len = imgData.length;

    let autptimer = null;

    let maxDelay = function (callback) {
        autptimer = setTimeout(() => {
            if (n / len >= .9) {
                $current.css('width', '100%');
                clearTimeout(autptimer);
                callback && callback();
            } else {
                alert("非常遗憾，你的网络不佳，请稍后重试");
                location.reload();  // 刷新页面
            }
        }, 10000)
    };
    let run = function (callback) {
        imgData.forEach(item => {
            let temImg = new Image();
            temImg.src = item;
            temImg.onload = () => {
                temImg = null;
                if (n === len) {
                    $current.css('width', '100%');
                    callback && callback();
                    return;
                }
                $current.css('width', ++n / len * 100 + '%');
            }
        })
    };
    let done = function () {
        clearTimeout(autptimer);
        $loadingBox.remove();
        phoneRender.init();
    };
    return {
        init: function () {
            $loadingBox.css("display","block");
            run(done);
            maxDelay(done);
        }
    }
})();

// phone
let phoneRender = (function () {
    let $phoneBox = $(".phoneBox"),
        $spanInp = $phoneBox.find('span'),
        $call = $phoneBox.find(".call"),
        callMusic = $("#callMusic")[0],
        $callBtn = $call.find(".btn"),
        $answer = $phoneBox.find(".answer"),
        answerMusic = $("#answerMusic")[0],
        $answerBtn = $answer.find(".btn");

    let answer = function () {
        callMusic.pause();
        $(callMusic).remove();
        $call.css("display", "none");
        $answer.css('transform', 'translateY(0)');
        $spanInp.css('display', 'block');
        answerMusic.play();
        answerMusic.volume = 0.3;
        computedPlayTime();
    };
    let autoTimer = null;
    let computedPlayTime = function () {
        let duration = 0;
        answerMusic.oncanplay = () => {
            duration =  Math.round(answerMusic.duration);
            console.log(duration);
            autoTimer = setInterval(() => {
                let val =  Math.round(answerMusic.currentTime);
                console.log(val);
                if (val >= duration) {
                    closePhone();
                    return;
                }
                let minute = plusZero(parseFloat(Math.floor(val / 60))),
                    second = plusZero(parseFloat(Math.floor(val - minute * 60)));

                $spanInp.html(`${minute}:${second}`);
            }, 1000);
        };
    };
    // 关闭音乐
    let closePhone = function () {
        answerMusic.pause();
        clearInterval(autoTimer);
        $(answerMusic).remove();
        $phoneBox.remove();
        messageRender.init();
    };
    return {
        init: function () {
            $phoneBox.css("display","block");
            callMusic.play();
            callMusic.volume = 0.3;
            $callBtn.tap(answer);
            $answerBtn.tap(closePhone);
        }
    }
})();

let plusZero = function (val) {
    val = val < 10 ? '0' + val : val;
    return val
};
// message
let messageRender = (function(){
 let $messageBox = $(".messageBox"),
     $wrapper = $messageBox.find(".wrapper"),
     $newList = $wrapper.find("li"),
     $keybord = $(".keybord"),
     $spanInp = $keybord.find("span"),
     $submit = $keybord.find(".submit"),
     demonMusic = $("#demonMusic")[0];

 let step = -1,
     interval = 1000,
     autoTimer = null,
     len = $newList.length;

 // 信息框向上移动
 let n = 0;
 let run = function () {
     step++;
     if(step===2){
         clearInterval(autoTimer);
         openkeybord();
         return;
     }
     if(step>=len){
         done();
     }
     if(step>2){
         n -=  $newList[step].offsetHeight;
         $wrapper.css('top',n);
     }
     $newList.eq(step).addClass("move");
 };
 // 键盘事件
 let openkeybord = function () {
     $keybord.css({
         "display":"block",
         "transform":"translateY(0)"
     });
     let str = '好的，马上介绍!',
         n = -1,
         curStr = '';
     let fontTimer = setInterval(()=>{
         $spanInp.css('display','block').html(`${curStr+=str[++n]}`);
         if(n>=(str.length-1)){
           clearInterval(fontTimer);
           $submit.css('display','block');
         }
     },200)
 };
 // 发送
 let submiFont = function () {
     $spanInp.css('display','none');
     $keybord.css("transform","translateY(4.18rem)");
     $(`<li class="self move">
        <i class="arrow"></i>
        <img src="img/zf_messageStudent.png" alt="" class="pic">
        ${$spanInp.html()}
    </li>`).insertAfter($newList.eq(1));
     $newList = $wrapper.find("li");
     autoTimer = setInterval(run,interval);
 };
 // 执行完毕
 let done = function () {
   clearInterval(autoTimer);
   let delayTimer = setTimeout(()=>{
       demonMusic.pause();
       $(demonMusic).remove();
       clearTimeout(delayTimer);
       $messageBox.remove();
   },1000);
 };
 return{
   init:function(){
     $messageBox.css("display","block");
     demonMusic.play();
     demonMusic.volume = .3;
     autoTimer = setInterval(run,interval);
     $submit.tap(submiFont);
   }
 }
})();
let url = window.location.href,
    well = url.indexOf("#"),
    hash = url.substr(well + 1);
console.log(hash);
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
    default:
        loadingRender.init();
}
