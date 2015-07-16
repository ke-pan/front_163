function fadeout(element) {
  function lessOpacity(step) {
    var opacity = parseFloat(element.style.opacity) - step;
    console.log(opacity);
    if(opacity <= 0) {
      opacity = 0;
      clearInterval(intervalID);
    }
    element.style.opacity = opacity;
  };

  var step = parseFloat(element.style.opacity) / 10;
  var intervalID = setInterval(lessOpacity, 100, step);

};
