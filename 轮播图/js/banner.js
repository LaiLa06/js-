
let  bannerRender = (function () {
   // 1，获取需要操作的元素

   let container = document.getElementById("container"),
       wrapper = container.querySelector('.wrapper'),
       focus = container.querySelector(".focus"),
       arrowLeft = container.querySelector(".arrowLeft"),
       arrowRight = container.querySelector(".arrowRight"),
       slideList = null,
       focusList = null
       //轮播图运动的基础参数
    let stepIndex = 0,   // 记录步长，当前展示块的索引
        autoTimer = null,  // d自动轮播的定时器
        interval = 1000;  // 间隔多长时间切换一次


        // 2，获取数据

    let queryData = function queryData () {
        // 后面的queryData写不写都行，装逼用
      return new Promise((resolve,reject)=>{
         let xhr = new XMLHttpRequest();
         xhr.open('get','json/banner.json',true);  // true 异步，不写也是异步
         xhr.onreadystatechange = ()=>{
           if(xhr.readyState===4 && xhr.status === 200){
               let data =JSON.parse(xhr.responseText);
               resolve(data)
           }
         };
         xhr.send(true)
      }) ;
    };
   // 3,数据绑定
   let bindHtml = function (data) {
      let strSlide = ``,
          strFocus = ``;
      data.forEach((item,index)=>{
          let {img= 'img/banner1.jpg',desc='凤凤'} = item;   // 等号后面的是默认的
          strSlide += `<div class="slide">
                          <img src="${img}" alt="${desc}">
                      </div>`;
          // 模板字符串${}存放的是JS表达式，但是需要表达式有返回值，因为我们要把这个返回值拼接到字符串中
          strFocus += `<li class="${index===0?'active':''}"></li>`
      });
      wrapper.innerHTML = strSlide;
      focus.innerHTML = strFocus;

      // 获取所有的slide和 li
      slideList = wrapper.querySelectorAll(".slide");
      focusList = focus.querySelectorAll("li");

       // 把现有第一张克隆一份放在容器末尾  ，由于querySelectorAll不存在dom映射,新增加一个到容器中，原有的位置不变

       wrapper.appendChild(slideList[0].cloneNode(true));
       slideList = wrapper.querySelectorAll(".slide");

      // 根据slide的个数，动态设置wrapper的宽度
       utils.css(wrapper,'width',slideList.length*1000);
   };

   // 4,自动轮播

   let autoMove = function () {

       stepIndex ++;
      if(stepIndex > (slideList.length-1)){
          // 说明切换到最后一张了（现在展示的是克隆的第一张），此时我们让wrapper立即回到真实第一张的位置
          utils.css(wrapper,'left',0);
          stepIndex = 1;
      }
      animate(wrapper,{
          left: -stepIndex*1000
      },200);

      // 每次运动完成，需要让焦点跟着切换
       changeFocus();
   };

   // 5,让焦点跟着轮播图的切换而切换
   let changeFocus = function changeFocus() {
     // 当轮播图运动到最后一张（克隆的第一张，我们需要让第一个li有选中样式）
     let tempIndex = stepIndex;
     tempIndex===slideList.length-1 ? tempIndex = 0 :null;
     [].forEach.call(focusList,(item,index)=>{
         item.className = index ===tempIndex?'active':"";
     })
   };

   // 6,鼠标进入和离开，控制自动轮播的暂停开启，
   let handleContainer = function handleContainer() {
      container.onmouseenter = function(){
         clearInterval(autoTimer);
         arrowLeft.style.display = arrowRight.style.display = 'block';
      };
      container.onmouseleave = function(){
        autoTimer = setInterval(autoMove,interval);
          arrowLeft.style.display = arrowRight.style.display = 'none';
      }
   };

  // 7,点击焦点切换图片
   let handleFocus = function handleFocus() {
      [].forEach.call(focusList,(item,index)=>{
         item.onclick = function () {
             stepIndex = index;   // 点击的是谁，让stepindex运动到哪
             animate(wrapper,{
                 left : -stepIndex*1000
             },200);
             changeFocus();
         };
      })
   };
  // 8，给两个按钮绑定事件
  let handleArrow = function handleArrow() {
    arrowRight.onclick = autoMove;//点击右按钮和自动轮播的机制是一样的
    arrowLeft.onclick = function () {
      stepIndex--;
      // 如果索引小于0，说明当前已经是第一张，不能再向右运动了，此时我们让wrapper瞬间移动到最后一张，
        // （最后一张和第一张一模一样），再让其运动到倒数第二张即可
      if(stepIndex < 0){
          utils.css(wrapper,'left',-(slideList.length-1)*1000);
          stepIndex = slideList.length-2;
      }
      animate(wrapper, {
          left: -stepIndex * 1000
      },200);
    }
  };

   return {
       init:function () {
           let promise = queryData();
           promise.then(bindHtml).then(()=>{
               // 开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove,interval);
           }).then(()=>{
              // 左右按钮或者焦点切换
               handleContainer();
               handleFocus();
               handleArrow();
           });
           // 将bindHTML方法放入等待池中，等待promise中的请求的返回结果
           // promise帮我们执行
       }
   }
})();

bannerRender.init();