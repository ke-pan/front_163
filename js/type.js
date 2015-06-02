function type(arg) {
  var _type = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
  if(_type != "object") {
    return _type;
  }
  return arg.constructor.toString().match(/function\s*([^(]*)/)[1].toLowerCase();
}

console.log(type(1) === "number");
console.log(type(new Number(1)) === "number");
console.log(type("abc") === "string");
console.log(type(new String("abc")) === "string");
console.log(type(true) === "boolean");
console.log(type(undefined) === "undefined");
console.log(type(null) === "null");
console.log(type({}) === "object");
console.log(type([]) === "array");
console.log(type(new Date) === "date");
console.log(type(/\d/) === "regexp");
console.log(type(function(){}) === "function");

function Point(x, y) {
  this.x = x;
  this.y = y;
}

console.log(type(new Point(1,2)) === "point");
console.log(type() === "undefined")
