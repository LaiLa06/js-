(function(){
    let flowRender = (()=>{
        let page = 0,    // 先加载第一页数据
            isRun = false;  // 开关，防止页面一拖动，原来的页面还没加载完就去请求数据

        // 1.获取数据
        let queryData = ()=>{
            page++
            $.ajax({
                url:`json/data.json?page=${page}`,
                method:'get',
                dataType:'json',
                success:bindHtml
            })
        };

        // 2、绑定数据
        let bindHtml = (data)=> {
            let $flowBox = $('.flowBox');
            let $liList = $flowBox.find('li');
            for (let i = 0; i < data.length; i += 3) {
                // 每次遍历3个，一行排列三个
                $liList.sort((a, b) => {
                    // 比较li的高度，哪个短先往哪个填充数据
                    return $(a).outerHeight() - $(b).outerHeight()
                }).each((index, curLi) => {
                    let item = data[i+index];
                    if(!item) return;
                    let {pic, title, link} = item;
                    $(`<a href="${link}">
                                    <img src="${pic}"/>
                                    <p>${title}</p>
                                </a>`).appendTo(curLi);
                })
            }
            isRun = false; //=>当前这一组数据绑定完成后，让isRun=false，代表运行完成了
        };

        // 3、当滚动到页面底部的时候，加载下一页的更多数据

        let scroll = ()=>{
            $(window).on('scroll',()=>{
                let winH = $(window).outerHeight(),
                    pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
                    scrollT = $(window).scrollTop();

                if((scrollT+100)>=(pageH-winH)){
                    //=>卷去的高度 大于 真实高度-一屏幕高度：距离底下还有100PX，我们让其开始加载更多的数据
                    if(isRun){return}
                    isRun = true; //=>开始进行新一轮处理了
                    if(page > 2){
                        // 只能加载两页
                        alert("没有更多了");
                        return;
                    }
                    queryData();
                }
            });
        };
        return {
            init:function () {
                queryData();
                scroll();
            }
        }
    })();
    flowRender.init();
})();