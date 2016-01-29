define(function() {
   var Point = function(time, price, volume){
       this.time = time;
       this.price = price;
       this.volume = volume;
   };

    return Point;
});