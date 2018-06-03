let loginRender = (function($) {
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';

    let $submit = $('#submit'),
        $userName = $('#userName'),
        $userPass = $('#userPass');


    let submitFn = function() {
        /* 判断输入的格式是否符合要求，不符合要求就没必要发送请求 */
        axios.post('/login', {
            name: $userName.val().trim(),
            password: hex_md5($userPass.val().trim())
        }).then(res => {
            console.log(res);
            let code = parseFloat(res.code);
            if (code === 0) {
                /* 登录成功 */

                window.location.href = fromURL;
                return;
            }
            alert('自己密码自己心里没点逼数么，自己想想');

        })

    };
    return {
        init: function() {
            $submit.tap(submitFn);

        }
    }
})(Zepto);
loginRender.init();
