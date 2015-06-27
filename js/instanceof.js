// object instanceof constructor
// 检查 constructor 的 prototype 是否在 object 的原型链上

// 定义一个构造函数
function A() {};
var a = new A();
console.assert(a instanceof A);

// 定义构造函数 B
function B() {};
var b = new B();
console.assert(!(b instanceof A));

B.prototype = new A();
console.assert(!(b instanceof B)); // B 的 prototype 已经不在 b 的原型链上

var b1 = new B();
console.assert(b1 instanceof B);
console.assert(b1 instanceof A); // 继承

// 定义构造函数 C
function C() {};
C.prototype = new A();
var c = new C();

//!!! C 的 prototype 和 B 的一样，都是A， 所以 B 的 prototype 也在 c 的原型链上
console.assert(c instanceof B);
