
$(function () {
    let bannerRender = (function(){
        let $container = $('#container'),
            $wrapper =  $container.children(".wrapper"),
            $focus =  $container.children(".focus"),
            $arrowLeft = $container.children(".arrowLeft"),
            $arrowRight = $container.children(".arrowRight"),
            $slideList = null,
            $focusList = null;
        let stepIndex = 0,
            autoTimer = null,
            interval = 2000,
            lastIndex = 0,
            speed= 200;
        let queryData = function () {
            return new Promise((resolve,reject)=>{
                $.ajax({
                    url:'json/banner.json',
                    method:'get',
                    dataType:'json',
                    async:true,
                    success:resolve,
                    error:reject
                })
            })
        };
        let bindHtml = function (data) {
            let strSlide = ``,
                strFocus = ``;
            $.each(data, (index, item) => {
                let {img, desc} = item;
                strSlide += `<div class="slide">
                    <img src="${img}" alt="${desc}">
                </div>`;
                strFocus += `<li class="${index === 0 ? 'active' : ''}"></li>`;
            });
            $wrapper.html(strSlide);
            $focus.html(strFocus);

            $slideList = $wrapper.find('.slide');
            $focusList = $focus.find('li');
        };
        let changeSlide =function () {
            let _curIndex = $slideList.eq(stepIndex),
                _lastIndex = $slideList.eq(lastIndex);
            _curIndex.css('zIndex',1);
            _lastIndex.css('zIndex',0);
            _curIndex.stop().animate({
                opacity:1,
            },speed,()=>{
                _lastIndex.animate({
                    opacity:0,
                },speed);
                lastIndex = stepIndex;
            });
            changeFocus();
        };
        let autoMove = function () {
            stepIndex ++;
            if(stepIndex>$slideList.length-1){
                stepIndex = 0;
            }
            changeSlide();
        };
        let changeFocus = function () {
            $focusList.eq(stepIndex).addClass('active');
            $focusList.eq(lastIndex).removeClass('active');
        };
        let handleMouse = function(){
            $container.on('mouseenter',()=>{
                clearInterval(autoTimer);
                $arrowLeft.add($arrowRight).css('display','block');
            }).on('mouseleave',()=>{
                autoTimer= setInterval(autoMove,interval);
                $arrowLeft.add($arrowRight).css('display','none');
            });
        };
        let handleArrow = function () {
            $arrowRight.on('click',autoMove);
            $arrowLeft.on('click',()=>{
                stepIndex--;
                if(stepIndex < 0){
                    stepIndex = $slideList.length-1;
                }
                changeSlide();
            });
        };
        let handleFocus = function () {
            $focusList.on('click',function () {
               let _index = $(this).index();
               if(stepIndex=== _index){return}
                stepIndex = _index;
                changeSlide();
            });
        };
        return{
            init:function () {
                let promise = queryData();
                promise.then(data=>{
                    bindHtml(data);
                    autoTimer = setInterval(autoMove,interval);
                    handleMouse();
                    handleArrow();
                    handleFocus();
                });
            }
        }
    })();
    bannerRender.init();
});