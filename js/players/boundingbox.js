function BoundingBox(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  
  this.left = x;
  this.top = y;
  this.right = this.left + width;
  this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (other) {
  return (this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top); 
}