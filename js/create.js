function objectCreate(proto) {
  function F() {};
  F.prototype = proto;
  var f = new F();
  return f;
}

var a = objectCreate({x: 1, y: 2});
console.log(a.x, a.y);
