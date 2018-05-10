var magnifier = (()=>{
    var $magnifierBox = $('.magnifierBox'),
        $smallBox = $magnifierBox.find('.smallBox'),
        $mark = $smallBox.find('.mark'),
        $bigBox = $magnifierBox.find('.bigBox'),
        $bigImg = $bigBox.find('img');

    var mark = function () {
        $smallBox.on('mouseenter',function () {
            $mark.add($bigBox).css('display','block');
        }).on('mouseleave',function () {
            $mark.add($bigBox).css('display','none');
        }).on('mousemove',function (ev) {
            computedMark(ev);
        });
    };
    var computedMark = function (ev) {
        var offsetObj = $smallBox.offset(),
            curT = ev.pageY - offsetObj.top - $mark.outerHeight() / 2,
            curL = ev.pageX - $mark.outerWidth() / 2 - offsetObj.left,
            mintT = 0,
            maxT = $smallBox.outerHeight() - $mark.outerHeight(),
            minL = 0,
            maxL = $smallBox.outerWidth() - $mark.outerWidth();
        curT = curT < mintT ? mintT : (curT > maxT ? maxT : curT);
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        $mark.css({
            top: curT,
            left: curL
        });
        $bigImg.css({
            top: -curT * 3,
            left: -curL * 3
        });
    };

    return{
        init:()=>{
            mark();
        }
    }
})();

magnifier.init();