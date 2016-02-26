function Player(game, x, y, width, height, radius) {
	Entity.call(this, game, x, y);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.radius = radius;
	
	this.animation;
	this.downAnimation;
	this.upAnimation;
	this.leftAnimation;
	this.rightAnimation;
	
	this.down = false;
	this.up = false;
	this.left = false;
	this.right = false;
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
	return (distanceC1 < this.radius || distanceC2 < this.radius || distanceC3 < this.radius || distanceC4 < this.radius);
}

Player.prototype.draw = function(ctx) {
	if (!this.invincible || this.num % 10 === 0) {
		if (this.down) {
			this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
		} else if (this.up) {
			this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		} else if (this.left) {
			this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		} else if (this.right) {
			this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		} else {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		}
	}
	if (this.boxes) {
		ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height, 2, 0, 2 * Math.PI);
		ctx.stroke();
	}
	Entity.prototype.draw.call(this);
}