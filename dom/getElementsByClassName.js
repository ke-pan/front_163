function match(str1, str2) {
  arr1 = str1.split();
  arr2 = str2.split();
  for(var i=0; i<arr2.length; i++) {
    if(arr1.indexOf(arr2[i]) < 0) {
      return false;
    }
  }
  return true;
}

function getElementsByClassName(element, names) {
  if(element.getElementsByClassName) {
    return element.getElementsByClassName(names);
  }

  var res = [];

  for(var i=0; i<element.children.length; i++) {
    var classString = element.children[i].getAttribute('class');
    if(match(classString, names)) {
      res.push(element.children[i]);
    }
  }

  return res;
}
