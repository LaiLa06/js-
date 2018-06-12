let axios = require("axios");
console.log(axios);

axios.get("/json/USER.JSON").then(res=>{
    console.log(res);
     
}).catch((err)=>{
  console.log(err);
  
})
