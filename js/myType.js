function myType(arg) {
  var _type = Object.prototype.toString.call(arg).slice(8, -1);
  console.log("I am an", _type);
}

myType([]);
myType({});
myType (function(){});
myType (new Date());
