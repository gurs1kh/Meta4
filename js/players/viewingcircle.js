function ViewingCircle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}

ViewingCircle.prototype.collide = function (other) {
  //Check the distance from the center of the circle to the enemies four corners
  var distanceC1 = Math.sqrt(((other.left - this.x) * (other.left - this.x)) + ((other.top - this.y) * (other.top - this.y)));
  var distanceC2 = Math.sqrt(((other.right - this.x) * (other.right - this.x)) + ((other.top - this.y) * (other.top - this.y)));
  var distanceC3 = Math.sqrt(((other.left - this.x) * (other.left - this.x)) + ((other.bottom - this.y) * (other.bottom - this.y)));
  var distanceC4 = Math.sqrt(((other.right - this.x) * (other.right - this.x)) + ((other.bottom - this.y) * (other.bottom - this.y)));
  if (distanceC1 < this.radius || distanceC2 < this.radius || distanceC3 < this.radius || distanceC4 < this.radius) {
    return true;
  }
  return false;
}

ViewingCircle.prototype = new ViewingCircle();
ViewingCircle.prototype.constructor = ViewingCircle;