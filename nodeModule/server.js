let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs");
let {readFile} = require("./utils/fsPromise.js");
let mime = require("mime");

let counter = 0;

// 公共方法
let responseResult = function (res, returnVal) {
  res.writeHead(200, {
    "content-type": "application/json;charset=utf-8"
  });
  res.end(JSON.stringify(returnVal));
};

let readUSER = function () {
  return readFile("./json/USER.JSON").then((result) => {
    return JSON.parse(result);
  })
}

let readVOTE = function () {
  return readFile("./json/VOTE.JSON").then((result) => {
    return JSON.parse(result);
  })
};

let port = 1717;
let handleRequest = function (req, res) {
  let { method, headers: requestHeaders } = req;
  let { pathname, query } = url.parse(req.url, true);
  let pathReg = /\.([a-z0-9]+)$/i;
  
  // statics
  if (pathReg.test(pathname)) {
    readFile(`./static${pathname}`).then(result => {
      let extname = pathReg.exec(pathname)[1];
      res.writeHead(200, {
        "content-type": `${mime.getType(extname)};charset=utf-8`
      });
      res.end(result);
    }).catch(error => {
      // 404
      res.writeHead(404, {
        "content-type": "text/plain;charset=utf-8"
      });
      res.end("Not Found!");
    });
  }

  // API
  if(pathname==='/register' && method === "POST"){

    return;
  }
  if (pathname === "/getUser" && method === "GET") {
    let { userId=0 } = query;
    let returnVal = { code: 1, message: "no", data: null };
    readUSER().then(result => {
      let data = result.find(item => parseFloat(item.id) === parseFloat(userId));
      if (data) {
        returnVal = {
          code: 0,
          message: "ok",
          data
        };
        responseResult(res, returnVal);
        return;
      }
      throw new Error("No match data found!"); // 目的是没有数据的时候, 让其执行catch中的操作, 这样我们只需要让then中的方法有异常信息即可
    }).catch(err => responseResult(res, returnVal));

    return;
  }
  // 请求的不是以上接口
  res.writeHead(404);
  res.end("");
};
http.createServer(handleRequest).listen(port, () => {
  console.log(`Server start successfully, listening on port: ${port}...(Ctrl+C to STOP server)`);


});



