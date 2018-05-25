(function anonymous(window){
    function AJAX(options) {
        return new init(options);
    }
    // 要处理的事情
    // 发送ajax请求
    // async (默认异步)
    // dataType（xml，text，json，默认json），
    // cache（get系的是否要缓存，默认要），
    // data（get是问号传参，post是请求主体传参），
    // 检查url中是否存在问号（要拼接参数还有加随机数）
    let init = function(options={}){
      let {
        url,
        method="get",
        data,
        dataType='json',
        async = 'true',
        cache = 'true',
        success = new Function,
        error = new Function
      } =options;
      ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach(item => {
          this[item] = eval(item);
      });
      this.sendAJax();
    };
    AJAX.prototype={
        constructor:AJAX,
        init,
        sendAJax(){
            this.handleData();
            this.handleCache();
            let {method, url, data, dataType, async, cache, success, error} = this,
                xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                // 失败
                if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                    error && error(xhr.statusText, xhr);
                    return;
                }
                // 成功
                if (xhr.readyState === 4) {
                    let result = this.handleDataType(xhr);
                    success && success(result, xhr);
                }
            };
            xhr.send(data)
        },
        handleDataType(xhr){
          let dataType = this.dataType.toUpperCase(),
              result = xhr.responseText;
          switch (dataType){
              case 'JSON':
                result = JSON.parse(result);
                break;
              case 'TEXT':
                  break;
              case 'XML':
                result = xhr.responseXML;
                break;
          }
          return result;
        },
        handleCache(){
          let {method,cache,url} = this;
          if(/^get$/i.test(method) && cache=== false){
            url += `${check()}_=${+(new Date())}`;  //+(new Date()) 会转为秒而且称为字符串
            this.url = url;
          }
        },
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?'
        },
        handleData(){
          let {data,method} = this;
          if(!data) return;
          if(data instanceof Object){
            let str = ``;
            for (let key in data){
                if(data.hasOwnProperty(key)){
                    str += `${key}=${data[key]}&`;
                }
            }
            data = str.substring(0,str.length-1);
          }
          if(/^(get|put|head|delete|option|trace)$/i.test(method)){
            // 'xx=xxx&xxx=xxxx'
            this.url += `${this.check()}${data}`;
            this.data = null;
            return;
          }
          this.data = data;
        }
    };
    init.prototype = AJAX.prototype;
    window.ajax = AJAX;
})(window);