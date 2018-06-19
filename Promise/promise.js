class Promise{
    constructor(exector){
        this.status = 'pending';
        this.value = null;
        this.fulfillCallback = [];
        this.reectedCallback = [];
        let resolve = result=>{
          let timer = setTimeout(()=>{
              clearTimeout(timer);
              if(this.status !=='pending')return;
              this.status = 'fulfilled';
              this.value = result;
              this.fulfillCallback.forEach(item=>item(this.value))
          },0)
        };
        let reject = reason =>{
            let timer = setTimeout(()=>{
                clearTimeout(timer);
                if(this.status !=='pending')return;
                this.status = 'rejected';
                this.value = result;
                this.reectedCallback.forEach(item=>item(this.value))
            },0)
        };
        try {
            exector(resolve,reject)
        }catch (e) {
            reject(e)
        }
    }
    then(fulfillCallback,rejectedCallback){
       typeof fulfillCallback !== 'function'? fulfillCallback = result=>result:null;
       typeof rejectedCallback !== 'function'? rejectedCallback = reason=>{
            throw new Error(reason instanceof Error ? reason.message:reason);
       }:null;
       return new Promise((resolve,reject)=>{

       })
    }
}