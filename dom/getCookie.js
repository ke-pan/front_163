function getCookie() {
  var cookieObj = {}
  document.cookie.split('; ').forEach(function(e, i, arr){
    var keyValue = e.split('=');
    cookieObj[keyValue[0]] = keyValue[1];
  });
  return cookieObj;
}
