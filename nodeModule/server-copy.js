let url = require("url"),
  http = require("http"),
  path = require("path"),
  fs = require("fs");

let port = 1720;
let handle = function (req,res) { 
    // 服务创建成功，并且客户端向当前服务发送了请求，才会执行这个回调，并且，发送一次请求，回调函数就会被触发执行一次
    // req：请求对象 
    // req.pathname： 存储的是请求资源的路径地址
    // req.method：客户端请求的方式
    // req.url：存储的是请求资源的路径地址及文号传参
    // req.headers 客户端请求头信息,它是个对象

    // res：响应对象，包含了一写属性和方法，可以让服务器返回给客户端内容
    // res.write 基于这个方法，服务器可以向客户端返回内容
    // res.end(a) 结束响应 a 必须是String或者buffer
    // res.writeHead 重写响应头信息
     
// 把请求的url地址中：路径名称 & 问号传承，分别解析出来
   let {pathname,query} =  url.parse(req.url,true);
   console.log(pathname,query);
   res.writeHead(200,{
      'content-type':'text/plain;charset=utf-8'       // 解决乱码的问题
   })  // 200是状态码，第二个参数是响应头信息
   res.end("hello world!")
    
 }

// 创建web服务

http.createServer(handle).listen(port, () => {
  // 当服务创建成功，并且端口号也已经监听成功后，触发的回调函数
  console.log(`server is success,listen on ${port}!`);
  // listen Eacces 0.0.0:80  80端口被占用了，我们需要重新修改端口号

});
