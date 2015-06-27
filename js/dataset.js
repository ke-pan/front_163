function dataset(obj) {
  if(obj.dataset) {
    return obj.dataset;
  }
  if(!obj.attributes) {
    return;
  }

  var attr = obj.attributes,
      name,
      res = {};

  function changeStr(str) {
    var _str = str.slice(5);
    var re = /-([a-z])?/g;
    function replacer(match) {
      return match.slice(1).toUpperCase();
    }
    return _str.replace(re, replacer);
  }

  for(var i=0; i<attr.length; i++) {
    name = attr[i].nodeName;
    if(name.indexOf("data-") == 0) {
      name = changeStr(name);
      res[name] = attr[i].nodeValue;
    }
  }
  return res;
}
