function Item(game, x, y) {
	Entity.call(this, game, x, y);
	this.pickedUp = false;
}

Item.prototype = new Entity();
Item.prototype.constructor = Item;

Item.prototype.collide = function (other) {
	return (this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.height + this.y > other.y);
}

Item.prototype.update = function () {
	this.flipped = this.game.d;
	if (!this.pickedUp && this.collide(this.game.hero)) {
		this.pickedUp = true;
		this.game.hero.pickUp(this);
		this.removeFromWorld = true;
	}
	Entity.prototype.update.call(this);
};

Item.prototype.draw = function (ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}