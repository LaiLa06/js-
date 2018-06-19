let express = require('express'),
    app = express();

let bodyParser = require('body-parser'),
    session = require('express-session');

//创建服务，监听8686端口号，并且以后有请求过来执行的是App这个方法

let port = 8686;
app.listen(port, () => {

});

// 静态资源文件处理
app.use(express.static('./static'));

// express里面的中间件，在api接口处理之前，把一些公共的部分进行提取，中间件中就是先处理这些公共的内容，处理完成后再继续执行接口请求即可
// app.use() 就是中间件middlewire
// app.use('/admin', function(req, res, next) {
// 请求的path中，是以/admin开头的，例如 ：'/admin' '/admin/xxx'...
// next(); // 不加next，就无法走到下一个中间件，或者请求的（next是继续的意思，可能是中间件或者请求）
// });
// app.use((req, res, next)=>{
// 所有的请求都会走这个中间件，而且中间件的执行的顺序是安札书写的先后顺序执行
// next()
// console.log(1); 先执行下面的后回过头来再执行
// })

// api处理

// body-parse:如果是post、put请求，会把基于请求主体传递的信息预先截获，
// 如果传递的是json格式的字符串，bodyParser.json()会把它转为json格式的对象
// 如果传递的是urlencoded格式的字符串（xx=xxx&xxx=xxxx）,bodyParser.urlencoded()会把它转换为对象键值对的形式，
// 把转换的结果挂载到req.body属性上
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//express-session：是供我们后续操作session的，基于这个中间件，我们可以设置客户端cookie的过期时间，也理解为session在服务器端存储的时间，当中间件中执行
// 完成后 ，会在req上挂载一个session的属性，用来操作session

app.use(session({
    secret: 'zfpx',   // 秘钥
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}  // cookie 最大的有效时间，过期就是失效了
}));

app.get('/getUser',(req,res)=>{
    // 当客户端向服务器端发送请求,如果请求方式是get,请求路径是/getUser,就会把回调函数执行
    // 里面有三个参数,req,res,next
    // req: 是express 框架封装处理的,也是存储了很多客户端传递信息的对象,不是我们原生的req
    // req常用的属性和方法：
    // req.params 存储的是路径参数
    // req.path 请求的路径名称
    // req.query 请求时候的问号传参信息(get请求都是这样传递的信息)(对象)
    // req.body 当请求的方式是post,我们基于body-parse中间件处理后会把客户端请求主体中传递的内容存放到body属性上
    // req.session 当我们基于express-session中间件处理后,会把session操作放到这个属性上,基于这个属性可以操作session信息
    // req.cookie 当我们基于cookie-parse中间件处理后,会把客户端传递的cookie信息存放到这个属性上
    // req.get() 获取指定请求头信息req.get('content-type');
    // req.param() 可以获取url-encoded格式字符串或者路径参数中的某一个属性名对应的信息获取到
    // ...
    // res: 也不是原生的res，也是express封装处理后的，目的是为了提供一些属性和方法，可以供服务器端向客户端返回内容
    // res常用的属性和方法：
    // res.cookie() 通过此方法可以设置一些cookie信息，通过响应头set-cookie返回给客户端，客户端把返回的cookie信息种到本地
    // res.type  设置响应内容的mime类型res.type('application/json');
    // res.status(code) 设置响应状态码
    // res.set() 设置响应头
    // res.sendStatus(statusCode) 设置返回的状态码（会结束响应，把状态码对应的信息当做响应主体返回，我们一般都用status，然后自己设置响应主体返回）
    // res.json([body]) 向客户端返回json格式的字符串，但是我们传递传递json格式的对象，方法会帮我们转化为字符串然后再返回（执行此方法后会自动结束响应res.end()）4
    // res.sendFile([path]) 把path指定的文件得到，然后把内容返回给客户端（完成了文件读取和响应两步操作），也会自动结束响应（res.end()）
    // res.send() 你想返回什么就是什么，也会自动结束响应（res.end()）
    // res.redirect([status,] path) 响应是重定向的（状态码是302）res.redirect('http://example.com');
    // res.render(view [, locals] [, callback]) 只有页面是需要服务器渲染的时候，我们才会用这个

    res.send({
        //发送什么都行
        message:'ok'
    });
});
app.post('/register',(req,res)=>{
  // get 接收问号传参的信息，可以使用：req.query req.param()
  // post 接收请求主体传递的信息，此时我们需要使用一个中间件body-parse
  req.body()  // 获取的是请求主体的内容
});

