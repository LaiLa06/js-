(function () {
    class Banner{
       constructor(options){
           let {
               ele,url,isArrow,isFocus,isAuto,defaultIndex,interval,speed,moveEnd
           } = options;
           ['ele','url','isArrow','isFocus','isAuto','defaultIndex','interval','speed','moveEnd'].forEach((item,index)=>{
               this[item] = eval(item);
           });

           this.container = document.querySelector(ele);
           this.wrapper = this.container.querySelector(".wrapper");
           this.focus = this.container.querySelector(".focus");
           this.arrowLeft = this.container.querySelector(".arrowLeft");
           this.arrowRight = this.container.querySelector(".arrowRight");
           this.slideList = null;
           this.focusList = null;

           this.stepIndex = 0;
           this.autoTimer = null;

           this.init();
        }
        init(){
           let promise = this.queryData();
           promise.then(()=>{
               this.bindHtml();
               this.autoTimer= setInterval(this.autoMove.bind(this),this.interval);
           })
        }
        queryData(){
          let {url} = this;
          return new Promise((resolve,reject)=>{
              let xhr= new XMLHttpRequest();
              xhr.open('get',url);
              xhr.onreadystatechange = (()=>{
                  if(xhr.readyState===4 && xhr.status===200){
                      this.data = JSON.parse(xhr.responseText);
                      resolve();
                  }
              });
              xhr.send(null);
          });
        };
        bindHtml(){
            let strSlide = ``,
                strFocus = ``;
            console.log(this.data);
            this.data.forEach((item,index)=>{
                let {img,desc} = item;
                strSlide += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
                strFocus += `<li class="${index===0?'active':''}"></li>`;
            });
            this.wrapper.innerHTML = strSlide;
            this.focus.innerHTML = strFocus;

            this.slideList = this.wrapper.querySelectorAll('.slide');
            this.focusList = this.focus.querySelectorAll("li");

            this.wrapper.appendChild(this.slideList[0].cloneNode(true));
            this.slideList = this.wrapper.querySelectorAll(".slide");
            console.log(this.slideList.length);
            utils.css(this.wrapper,'width',this.slideList.length*1000);
        }
        move(){
            animate(this.wrapper,{
                left: - this.stepIndex*1000
            },200);
            this.changeFocus();
        }
        autoMove(){
            this.stepIndex ++;
            console.log(this);
            if(this.stepIndex > (this.slideList.length-1)){
                this.stepIndex = 1;
                utils.css(this.wrapper,'left',0);
            }
            this.move();
        }
       changeFocus(){
           [].forEach.call(this.focusList,(item,index)=>{
              let tempIndex = this.stepIndex;
              tempIndex = tempIndex===(this.slideList.length-1)? 0:null;
              item.className= tempIndex===index?'active':'';
           })
       }
    }
    window.Banner = Banner;
})();