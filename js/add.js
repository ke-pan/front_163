function add(num) {
  var sum = num;
  return function tmp (arg){
    if(arg === undefined) {
      return sum;
    }
    sum += arg;
    return tmp;
  }
}

console.log(add(2)(4)(6)(10)(12)());
