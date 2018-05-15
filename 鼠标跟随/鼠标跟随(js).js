let mouseFollow = (function () {
   document.getElementById("aa").onClick = function (ev) {
       console.dir(ev)
   };
   return {
       init:function () {

       }
   }
})();
mouseFollow.init();