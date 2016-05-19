
function Space (width, length){
  this.width = width;
  this.length = length;
  this.area = function (){
    console.log(this.width);
    return this.width * this.length;
  };
  this.calc = function(){
    console.log(this.area);
    return this.area() * this.width;
  };
};

var bedroom = new Space(10, 15);
console.log(bedroom);
