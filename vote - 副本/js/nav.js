// 导航：导入插件后，可以动态向页面中的navBox盒子的起始位置创建一个navBox，并且完成相关的业务处理
// 1、进入到登录页面或者注册页面，都会记录formrURl,当登录或者注册成功的时候，跳转回到原有的页面
// 2、验证是否已经登录，展示不同的信息
// 3、完成其他业务，例如:退出，点击用户进入详情页
$(function () {
    let $mainBox = $(".mainBox");
    // 检测登录状态
    axios.get('/checkLogin').then(res => {
        let code = parseFloat(res.code);
        $mainBox.prepend(`<nav class="navBox">
        <a href="index.html">首页</a>
        ${code === 0 ? `<a href="javascript:;">登录</a>
        <a href="javascript:;">注册</a>` : `<a href="detail.html"></a><a href="javascript:;">退出</a>`}
    </nav>`);
        $navBox = $mainBox.find('.navBox'),
            $navList = $navBox.find('a');
        return code
    }).then(code => {
        // console.log(code);
        // 如果已经登录，获取登录用户的信息，展示在nav中
        // 0->参与成功  1->参与失败
        if (code === 0) {
            return;
        }

            return axios.get('/getUser')

    }).then(result => {
        console.log(result);
        //=>未登录传递的是undefined,已登录传递的是用户信息
        if (typeof  result !== 'undefined') {
            let {data: {name=xxx}} = result;
            $navList.eq(1).html(name);
        }
    }).then(() => {
        // 基于事件委托，给a绑定事件
        $navBox.tap(ev => {
            let target = ev.target,
                tarTAG = target.tagName,
                tarINN = target.innerHTML;
            if (tarTAG !== 'A') return;
            if (tarINN === '登录') {
                // window.location.href 既可以页面跳转，还可以获取当前页面的url地址（但是一定要编译，否则特殊；符号会和跳转的地址冲突）
                window.location.href = `login.html?formURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN === '注册') {
                window.location.href = `register.html?formURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN === '退出') {
                axios.get('/exitLogin');
                window.location.href = window.location.href;  //页面刷新
                return;
            }
        })
    });

});