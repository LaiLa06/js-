let fs = require('fs'),
    path = require('path');

//=>存储的是当前模块执行所在的绝对路径(!==__dirname)
let dirname = path.resolve();

//=>MKDIR && RMDIR && READ-DIR && READ-FILE && COPY-FILE
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile','unlink'].forEach(item => {
    exports[item] = function (pathname, copypath = '') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            if(item==='readFile'){
                // 非图片资源或者音视频等富媒体资源设置utf-8
                if(!/(jpg|jpeg|png|git|svg|ico|BMP|eot|ttf|woff|mp3|mp4|ogg|wav|w4a|wmv|avi)$/i.test(pathname)){
                    arg.unshift('utf8')
                }
                
            }
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    };
});

//=>WRITE && APPEND
['writeFile', 'appendFile'].forEach(item => {
    exports[item] = function (pathname, content) {
        pathname = path.resolve(dirname, pathname);
        if (typeof content !== 'string') {
            //=>写入的内容我们规定必须是字符串才可以
            content = JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content, 'utf8', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});
