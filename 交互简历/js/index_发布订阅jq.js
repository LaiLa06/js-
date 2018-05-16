let loadingRender = (function () {
    let $loadingBox = $(".loadingBox"),
        $current = $loadingBox.find(".current");
    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"]

    // 发布订阅
    let $plan = $.Callbacks();

    let n = 0,
        len = imgData.length;
    let delayTimer = null;
    let maxDelay = function () {
        delayTimer = setTimeout(function () {
          if(n/len>=.9){
              $current.css("width", '100%');
              $plan.fire();
          }else{
              alert("非常遗憾，您的网络不佳，请稍后重试");
              window.location.href = 'http://www.qq.com';
          }
        },10000) 
    };
    let run = function () {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.src = item;
            tempImg.onload = () => {
                tempImg = null;
                if (n === len) {
                    $current.css("width", '100%');
                    $plan.fire();
                }
                $current.css("width", (++n / len * 100 + '%'));
            };
        });

    };
    let done = function () {
        let timer = setTimeout(function () {
            $loadingBox.remove();
            clearTimeout(timer);
        }, 500)
    };
    $plan.add(done);

    return {
        init: function () {
            run();
            maxDelay();
        }
    }
})();
loadingRender.init();