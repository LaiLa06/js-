let p = function () {
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('get','data/data.json');
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && /^2\d{2}/.test(xhr.status)){
                let data = JSON.parse(xhr.responseText);
                resolve(data)
            }else{
                reject(e)
            }
        };
        xhr.send(null);
    })
};

p.then(res=>{
    console.log(data);
}).catch( error =>{
    console.log(error);
});