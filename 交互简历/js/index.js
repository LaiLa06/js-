let loadingRender = (function () {
    let $loadingBox = $(".loadingBox"),
        $current = $loadingBox.find(".current");
    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"]

    let n = 0,
        len = imgData.length;
    // 设置最长等待时间（假设是10s，到达10s我们看加载多少了，如果已经达到90%以上，我们可以正常访问内容了，如果不足，直接提示用户当前网络状态不好，稍后重试）
    let delayTimer = null;
    let maxdalay = function(callback){
        delayTimer = setTimeout(()=>{
            if(n/len>=.9){
                $current.css("width",'100$');
                callback && callback()
            }else{
                alert("非常遗憾,您当前的网络不佳，请稍后重试！");
                window.location.href = 'http://www.qq.com';  //此时我们不应该继续加载页面，而是让其关掉页面或者是跳转到其他页面
            }
        },10000);
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
              $current.css('width',(++n/len)*100+'%');
              // 加载完成,执行回调（让当前loading页消失）
              if(n===len){
                callback && callback();
                clearTimeout(delayTimer);
              }
            };
            tempImg.src = item;
        });
    };
    // 完成
    let done = function () {
        // 停留1s移除
        let timer = setTimeout(()=>{
            $loadingBox.remove();
        },1000);
    };
    return {
        init: function () {
          run(done);
          maxdalay(done);
        }
    }
})();
loadingRender.init();