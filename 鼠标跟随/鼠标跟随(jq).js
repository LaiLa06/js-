let $imgList = $(".container>.imgBox>li"),
    $mark = null,
    $container = $('.container');

$imgList.on('mouseenter',function (ev) {

  // 1、创建mark：根据经过li的小图片，动态管控mark中的大图片
  // 如果小图和大图名字上没有固定的规则，我们把大图地址都以自定义属性的方式存储起来，后期需要展示大图的时候，从自定义属性获取即可
  // 如果有固定的规则，我们完全可以不采用自定义属性的方式，而是基于规则自己处理和匹配即可

  // let $src = $(this).children().attr('data-src');

  let srcStr = $(this).children("img").attr('src');
    console.log($(this));
    srcStr = srcStr.replace(/_(\d+)/g,'_$1_bigger');

  if(!$mark){// 不重复创建
      $mark = $(`<div class="mark">
        <img src="${srcStr}" alt="">
    </div>`);
      $mark.appendTo($container);
  }

}).on('mouseleave',(ev)=>{
    if($mark){
        $mark.remove();
        $mark = null;
    }
}).on('mousemove',(ev)=>{
    let {top:conTop,left:conLeft} = $container.offset(),
        curL = ev.pageX - conLeft +20,
        curT = ev.pageY - conTop + 20;
    $mark.css({
        top:curT,
        left:curL
    })
});