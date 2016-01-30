function Player(game, x, y, width, height, visualRadius) {
	Entity.call(this, game, x, y);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.visualRadius = visualRadius;
	
	this.left = x;
	this.top = y;
	this.right = this.left + width;
	this.bottom = this.top + height;
	
	this.wforward = false;
    this.wbackward = false;
    this.wleft = false;
    this.wright = false;
}

Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.collide = function(other) {
	return (this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top); 
}

Player.prototype.canSee = function (other) {	
	var midX = this.x + this.width / 2;
	var midY = this.y + this.height / 2;
  //Check the distance from the center of the circle to the enemies four corners
  var distanceC1 = Math.sqrt(((other.left - midX) * (other.left - midX)) + ((other.top - midY) * (other.top - midY)));
  var distanceC2 = Math.sqrt(((other.right - midX) * (other.right - midX)) + ((other.top - midY) * (other.top - midY)));
  var distanceC3 = Math.sqrt(((other.left - midX) * (other.left - midX)) + ((other.bottom - midY) * (other.bottom - midY)));
  var distanceC4 = Math.sqrt(((other.right - midX) * (other.right - midX)) + ((other.bottom - midY) * (other.bottom - midY)));
  return (distanceC1 < this.visualRadius || distanceC2 < this.visualRadius || distanceC3 < this.visualRadius || distanceC4 < this.visualRadius)
}