let musicRender = (function () {
    let $headerBox = $(".headerBox"),
        $contentBox=$(".contentBox"),
        $footerBox=$(".footerBox"),
        winH = document.documentElement.clientHeight,
        font = parseFloat(document.documentElement.style.fontSize);

    let computedContent = function () {
        let _height = winH-$headerBox[0].offsetHeight-$footerBox[0].offsetHeight-.8*font;
        console.log(_height);
        $contentBox.css({
            height:_height
        })
    };
    return {
        init: function () {
            computedContent();
        }
    }
})();
musicRender.init();