function Player(game, x, y, width, height, visualRadius) {
	Entity.call(this, game, x, y);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.visualRadius = visualRadius;
	
	this.wforward = false;
	this.wbackward = false;
	this.wleft = false;
	this.wright = false;
}

Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.collide = function(other) {
	return (this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.height + this.y > other.y)
}

Player.prototype.canSee = function(other) {
	//Check the distance from the center of the circle to the enemies four corners
	var otherLeft = other.x;
	var otherRight = other.x + other.width;
	var otherTop = other.y;
	var otherBottom = other.y + other.height;

	var midX = this.x + this.width / 2;
	var midY = this.y + this.height / 2;
	
	var distanceC1 = Math.sqrt(((otherLeft - midX) * (otherLeft - midX)) + ((otherTop - midY) * (otherTop - midY)));
	var distanceC2 = Math.sqrt(((otherRight - midX) * (otherRight - midX)) + ((otherTop - midY) * (otherTop - midY)));
	var distanceC3 = Math.sqrt(((otherLeft - midX) * (otherLeft - midX)) + ((otherBottom - midY) * (otherBottom - midY)));
	var distanceC4 = Math.sqrt(((otherRight - midX) * (otherRight - midX)) + ((otherBottom - midY) * (otherBottom - midY)));
	if (distanceC1 < this.visualRadius || distanceC2 < this.visualRadius || distanceC3 < this.visualRadius || distanceC4 < this.visualRadius) {
	return true;
	}
	return false;
}