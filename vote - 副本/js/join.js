let joinRender = (function(){
 let $submit=$("#submit"),
     $slogan=$("#slogan");
 let join = function () {
   axios.post('/match',{
       slogan:$slogan.val().trim()
   }).then(()=>{
       window.location.href = 'index.html'
   });
 };
 return{
   init:function(){
       $submit.tap(join)
   }
 }
})();
joinRender.init();