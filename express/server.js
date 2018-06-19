let express = require('express'),
    bodyParse = require('body-parser'),
    session = require('express-session');

let {readFile, writeFile} = require('./utils/fsPromise'),
    pathDataUSER = './json/USER.JSON',
    pathDataVOTE = './json/VOTE.JSON',
    app = express(),
    port = 8688;

// 创建服务
app.listen(port, () => {
    console.log(`服务创建成功，正在监听${port}端口！`);
});

// 处理api
app.use(session({
    secret: 'zfpx',   // 秘钥
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}  // cookie 最大的有效时间，过期就是失效了
}));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false})); //'xxx=xxx&xxxx={xx=xxx}',有二级的时候是否深度处理
app.use(async (req, res, next) => {
    let userData = await readFile(pathDataUSER);   // 读取数据，拿到字符串
    let voteData = await readFile(pathDataVOTE);
    req.userData = JSON.parse(userData);
    req.voteData = JSON.parse(voteData);
    next();
});
// 登录接口
app.post('/login', (req, res) => {
    let {password = '', name = ''} = req.body;   // 请求主体中的内容（对象）
    password = password.substr(4, 24).split('').reverse().join('');    // 二次加密
    let result = req.userData.find(item => {
        return item.name === name || item.phone === name && item.password === password    //验证是否存在
    });
    if (result) {
        // 登录成功,记录session（是否登录成功 & 登录用户的id）
        req.session.isLogin = true;
        req.session.userID = parseFloat(result['id']);
        res.send({code: 0, message: 'ok!'});
        return;
    }
    res.send({code: 1, message: 'No!'});

});
// 检测是否登录
app.get('/checkLogin', (req, res) => {
    let isLogin = req.session.isLogin;
    if (isLogin) {
        res.send({code: 1, message: "OK!"});
        return;
    }
    res.send({code: 0, message: "NO!"})
});
// 退出登录
app.get('/exitLogin', (req, res) => {
    req.session.isLogin = false;
    req.session.userID = null;
    res.send({code: 0, message: "OK!"})
});
// 获取用户的详细信息:没有传递用户id，获取当前登录用户的信息
app.get('/getUser', (req, res) => {
    let {userId = req.session.userID} = req.query;
    let result = req.userData.find(item => item['id'] === parseFloat(userId));
    if (result) {
        res.send({code:1,message:"NO!",data:{...result,password:''}});
        return;
    }
    res.send({
        code: 0,
        message: '',
        data: {
            id: 1,
            name: 'xxx',
            picture: 'xxx',
            sex: 0,
            phone: '',
            bio: '',
            time: '',
            isMatch: 0,
            matchId: '',
            slogan: '',
            voteNum: ''
        }
    })
});
// 处理静态资源请求
app.use(express.static('./static'));  // 如果请求的是静态支援就不再往下走了
app.use((req, res, next) => {
    res.status(404);
    res.redirect('http://www.qq.com/babygohome/') // 重定向到哪个页面
});
