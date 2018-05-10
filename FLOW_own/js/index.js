let imgRender = (function () {
    let isRun = false,
        page = 0;
    let queryData = function () {
        page++;
      $.ajax({
          url:`json/data.json?page=${page}`,
          method:'get',
          dataType:'json',
          success:bindHtml
      });
    };
    let bindHtml = function (data) {
      let $flowBox = $(".flowBox"),
         $liList = $flowBox.find("li");
      for(let i =0;i<data.length;i+=3){
          $liList.sort((a,b)=> {
            return $(a).outerHeight() - $(b).outerHeight()
          }).each((index,item)=>{
            let curData = data[i+index];
            if(!curData)return;
            let {pic,title,link} = curData;
            $(`<a href="${link}"><img src="${pic}" alt=""><p>${title}</p></a>`).appendTo(item);
          })
      };
      isRun = false;
    };
    let scroll = function () {
      $(window).on('scroll',function () {
         let winH = $(window).outerHeight(),
             pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
             curT = $(window).scrollTop();
         if((curT+100)>pageH-winH){
             if(isRun)return;
             isRun = true;
             if(page>4){
                 alert("没有更多数据")
                 return;
             }
             queryData();
         }

      });
    };
    return{
        init:function () {
           queryData();
           scroll();
        }
    }
})();
imgRender.init();