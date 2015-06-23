function Circle(r){
  this.radius = r;
}

Circle.prototype.area = function() {
  return this.radius * this.radius * Math.PI
}
Circle.prototype.circumference = function() {
  return 2 * Math.PI * this.radius
}

c = new Circle(4);
console.log(c.area());
console.log(c.circumference());
