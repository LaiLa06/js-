let headerRender = (function(){
 let $headerBox = $(".headerBox"),
     $navMenu = $headerBox.find(".navMenu"),
     $navBox = $(".navBox");

 let handleTap = function () {
     // $navBox.stop().slideToggle(200);  // zepto中没有这些方法，zepto只实现了部分jquery方法
     let block = $navBox.css('display');
     console.log(block);
     if(block==='none'){
         $navBox.css('display','block');
         return;
     }
     $navBox.css('display','none');
 };
 return{
   init:function(){
       $navMenu.tap(handleTap);
   }
 }
})();
headerRender.init();

let bannerRender = (function(){
 let $bannerBox= $(".bannerBox"),
     $wrapper = $bannerBox.find(".swiper-wrapper");

 let queryData = function () {
     return new Promise((resolve,reject)=>{
         $.ajax({
             url:"banner.json",
             method:'get',
             dataType:'json',
             success:resolve
         })
     })
 };
 let bindHtml = function (result) {
   let str = ``;
   result.forEach(item=>{
       let {img,desc} = item
       str += ` <div class="swiper-slide">
                <img src="${img}" alt="">
                <p>${desc}</p>
            </div>`
   });
     $wrapper.html(str);
     $bannerBox.css('display','block');
 };
 let swiperInit = function () {
  let swiper = new  Swiper('.bannerBox',{
    loop:true,
    autoplay:3000,
    autoplayDisableOnInteraction:true,
    pagination:'.swiper-pagination',
    paginationType:'fraction'
  })
 };
 return{
   init:function(){
     let promise = queryData();
       promise.then(bindHtml).then(swiperInit)
   }
 }
})();
bannerRender.init();

let messgaeRender = (function(){
 let $messageBox = $(".messageBox"),
     $wrapper = $messageBox.find(".swiper-wrapper");

 let queryData = function () {
   return new Promise((resolve,reject)=>{
     $.ajax({
         url:"aside.json",
         method:'get',
         dataType:"json",
         success:resolve,
     })
   })
 };
 let bindHtml = function (result) {
   let str = '';
   result.forEach(item=>{
      let {title,link} = item;
      str += `<div class="swiper-slide">
                    <a href="${link}">${title}</a>
                </div>`;
   });
     $wrapper.html(str);
 };
 return{
   init:function(){
     let promise = queryData();
     promise.then(bindHtml).then(()=>{
         let swiper1 = new Swiper('.message',{
            loop:true,
            direction:'vertical',
            autoplay:3000
         })
     })
   }
 }
})();
messgaeRender.init();