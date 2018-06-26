;(function anonymous(window) {
    function AJAX(options) {
        return new init(options);
    }
    let _emptyIn = new Function(''),
        _defalut={
            url:'',
            method:'get',
            data:'',
            dataType:'json',
            async:'true',
            cache:'true',
            success:_emptyIn,
            error:_emptyIn
        };
    // Object.assign();
    let init = function init(options = {}) {
        //=>INIT PARAM
        // options = {..._defalut,...options};
        // Object.assign(_defalut,options);
        // for(let attr in options){
        //     if(!options.hasOwnProperty(attr)) break;
        //     this[attr] = options[attr];
        // }
        let {
            url,
            method = 'GET',
            data = null,
            dataType = 'JSON',
            async = true,
            cache = true,
            success,
            error
        } = options;

        //=>MOUNT:把配置项挂载到实例上
        ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach(item => {
            this[item] = eval(item);
        });

        //=>SEND:发送AJAX请求
        this.sendAjax();
    };
    // 要处理的事情
    // 发送ajax请求
    // async (默认异步)
    // dataType（xml，text，json，默认json），
    // cache（get系的是否要缓存，默认要），
    // data（get是问号传参，post是请求主体传参），
    // 检查url中是否存在问号（要拼接参数还有加随机数）

    AJAX.prototype = {
        constructor: AJAX,
        init,
        //=>发送AJAX请求
        sendAjax() {
            this.handleData();
            this.handleCache();

            //=>SEND
            let {method, url, async, error, success, data} = this,
                xhr = new XMLHttpRequest;
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    //=>ERROR
                    if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                        error && error(xhr.statusText, xhr);
                        return;
                    }
                    //=>SUCCESS
                    let result = this.handlDataType(xhr);
                    success && success(result, xhr);
                }
            };
            xhr.send(data);
        },
        //=>处理DATA-TYPE
        handlDataType(xhr) {
            let dataType = this.dataType.toUpperCase(),
                result = xhr.responseText;
            switch (dataType) {
                case 'TEXT':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result = xhr.responseXML;
                    break;
            }
            return result;
        },
        //=>处理CACHE
        handleCache() {
            let {url, method, cache} = this;
            if (/^GET$/i.test(method) && cache === false) {
                //=>URL末尾追加时间辍
                url += `${this.check()}_=${+(new Date())}`;
                this.url = url;
            }
        },
        //=>处理DATA
        handleData() {
            let {data, method} = this;
            if (!data) return;
            //=>如果是个OBJECT对象,我们把它转换为x-www-form-urlencoded这种模式,方便后期传递给服务器
            if (typeof data === 'object') {
                let str = ``;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        str += `${key}=${data[key]}&`;    // 转换为 xx=xxx&xxx=xxxx 的X-WWW-FORM-URLENCODED格式(客户端一般都是这种格式，除此还有RAW格式)；
                    }
                }
                data = str.substring(0, str.length - 1);
            }

            //=>根据请求方式不一样,传递给服务器的方式也不同
            if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
                this.url += `${this.check()}${data}`;
                this.data = null;
                return;
            }
            this.data = data;//=>POST系列
        },
        //=>检测URL中是否存在问号
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    };

    init.prototype = AJAX.prototype;
    window.ajax = AJAX;
})(window);