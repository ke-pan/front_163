function bindFunc(func, obj) {
  if(arguments.length < 2) {
    console.log("arguments are wrong!")
    return;
  }
  args = Array.prototype.slice.call(arguments,2);
  return function() {
    func.apply(obj, args);
  }
}

function move(x, y) {
    this.x += x;
    this.y += y;
}
var point = {x:1, y:2};
var pointmove = bindFunc(move, point, 2, 2);
pointmove(); // {x:3, y:4}

console.log(point.x, point.y);
