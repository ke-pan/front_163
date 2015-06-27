function Bird() {
  this.category = "bird";
}

Bird.prototype.squawk = function () {
  console.log("this is a", this.category);
}

function Duck() {
  this.category = "duck";
}

Duck.prototype = new Bird();
Duck.prototype.constructor = Duck;


duck = new Duck();
duck.squawk();
