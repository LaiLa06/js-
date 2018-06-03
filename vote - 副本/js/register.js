let registerRender = (function () {
    let $userName = $("#userName"),
        $spanName = $("#spanName"),
        $userPhone = $("#userPhone"),
        $spanPhone = $("#spanPhone"),
        $userPass = $("#userPass"),
        $spanPass = $("#spanPass"),
        $userPassConfirm = $("#userPassConfirm"),
        $spanPassConfirm = $('#spanPassConfirm'),
        $userBio = $("#userBio"),
        $spanBio = $("#spanBio"),
        $man = $("#man"),
        $woman = $("#woman");
    $submit = $("#submit");
    let valicate = {
        // 检验名字是否合法 ，汉字二位以上，或者字母以上
        name() {
            let reg = /^[\u4e00-\u9fa5]{2,}|[a-zA-Z]{2,}$/,
                val = $userName.val().trim();
            if (!reg.test(val)) {
                $spanName.html('名字请输入两位以上的汉字或者字母');
                $spanName[0].className = 'error';
                return false;
            } else {
                $spanName[0].className = 'ok';
                return val;
            }
        },
        phone() {
            let val = $userPhone.val().trim(),
                reg = /^1\d{10}$/;
            if (!reg.test(val)) {
                $spanPhone.html('请输入11位有效手机号码');
                $spanPhone[0].className = 'error';
                return false;
            } else {
                $spanPhone[0].className = 'ok';
                return val;
            }
        },
        password() {
            let val = $userPass.val().trim(),
                confirmVal = $userPassConfirm.val().trim(),
                reg = /^[a-zA-Z]*|_?|\d*$/;
            if (val === '') {
                $spanPass.html('请输入密码');
                $spanPass[0].className = 'error';
                return;
            }
            if (confirmVal === '') {
                $spanPassConfirm.html('请输入确认密码');
                $spanPassConfirm[0].className = 'error';
                return;
            }
            if (val !== '' && reg.test(val)) {
                if (val === confirmVal) {
                    $spanPhone[0].className = 'ok';
                    return val;
                }
                $spanPassConfirm.html('密码不一致，请重新输入');
                $spanPassConfirm[0].className = 'error';
                return;
            }
        },
        bio() {
            let val = $userBio.val().trim(),
                reg = /\*{10,100}/;
            if (!reg.test(val)) {
                $spanBio.html('请输入10-100个字符');
                $spanBio[0].className = 'error';
                return;
            } else {
                return val
            }
        },
        sex() {
            if ($man.attr('checked')) {
                return 0
            } else {
                return 1
            }
        }
    };
    let register = function () {
        // let {name, password, phone, sex, bio} = valicate;
        // if (name() && phone() && password() && sex() && bio()) {
        //
        // }
        let name = $userName.val().trim(),
            password = hex_md5($userPassConfirm.val().trim()),
            phone = $userPhone.val().trim(),
            sex   = 1,
            bio =$userBio.val().trim();
        axios.post('/register', {
            name: name,
            password: password,
            phone: phone,
            sex: sex,
            bio: bio,
        }).then(() => {
            window.location.href = 'index.html'
        })
    };
    return {
        init: function () {
            $submit.tap(register);
        }
    }
})();
registerRender.init();