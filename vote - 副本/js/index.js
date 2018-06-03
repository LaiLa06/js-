let matchRender = (function ($) {
    let limit = 10, // 每页条数
        page = 1,   // 当前页面
        pageNum = 1, //总页数
        total = 0,  // 总条数
        search = null, // 搜索参数
        isRun = false; // 是否加载数据

    // 获取需要绑定的元素
    let $userList = $(".userList"),
        $wrapper = $userList.find('ul'),
        $tip = $userList.find('.tip'),
        $headerBox = $(".headerBox"),
        $searchBtn = $headerBox.find(".searchBtn");

    // 获取数据
    let queryData = function () {
        return axios.get('/getMatchList', {
            params: {
                limit, page, search
            }
        }).then(res => {
            pageNum = parseFloat(res['pageNum']);
            total = parseFloat(res['total']);
            return res
        }).then(bindHtml)
    };
    // 数据绑定
    let bindHtml = function (res) {
        let {code, list = []} = res;
        if (parseFloat(code) !== 0) {
            $wrapper.css('display', 'none');
            $tip.css('display', 'block');
            isRun = false;
            return;     // 没有匹配项
        }
        $wrapper.css('display', 'block');
        $tip.css('display', 'none');
        // 创建文档碎片
        let $frg = $(document.createDocumentFragment());
        list.forEach((item, index) => {
            let {id, name, picture, sex, matchId, slogan, voteNum, isVote} = item;
            // 通过useId到用户详情页，到详情页，根据传递的Id不同展示不同的信息即可
            $frg.append(`<li>
                <a href="detail.html?userId=${id}">
                    <img src="${picture}" alt="${name}" class="picture">
                    <p class="title">
                        <span>${name}</span>
                        |
                        <span>编号 #${matchId}</span>
                    </p>
                    <p class="slogan">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                    ${parseFloat(isVote) === 0 ? `<a href="javascript:;" data-id="${id}" class="voteBtn">投他一票</a>` : ``}
                </div>
            </li>`);
        });
        $wrapper.append($frg);
        $frg = null;
        isRun = false;  // 数据已经加载完
        $(".voteBtn").tap(vote);
    };
    // 投他一票
    let vote = function () {
        console.log(this);
        let id = $(this).attr('data-id');
      axios.get('/checkLogin').then((res)=>{
          if(res.code===0){
              alert('请先登录');
              return
          }else{
              return axios.get(`/vote?participantId=${id}`)
          }
        }).then(res=>{
          console.log(res);
          if(res!=='undefined') {
              if (res.code === 0) {
                  alert('投票成功')
              } else {
                  alert("投票过程中发生意外")
              }
          }
        })
    };
    return {
        init: function () {
            // 展示第一页内容
            queryData();
            // 下拉加载更多
            $(window).on('scroll', () => {
                let {clientHeight, scrollTop, scrollHeight} = document.documentElement;
                if ((clientHeight + scrollTop + 200) >= scrollHeight) {
                    // 即将到达页面底部，加载更多数据
                    if (isRun) return; // 正在加载中，不允许加载更多
                    isRun = true;
                    if (page >= pageNum) return; // 所有页面都加载完成了
                    page++;
                    queryData();
                }
            });
            $searchBtn.tap(()=>{
                if(isRun)return;
                isRun = true;
                search = $searchBtn.prev('input').val().trim();
                page = 1;
                $wrapper.html(''); // 清空之前的html，然后展示最新搜索信息即可
                queryData();
            });
        }
    }
})(Zepto);
matchRender.init();