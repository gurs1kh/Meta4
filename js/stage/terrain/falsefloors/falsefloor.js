function FalseFloor(game, x, y) {
	FlatTerrain.call(this, game, x, y);
}

FalseFloor.prototype = new FlatTerrain();
FalseFloor.prototype.constructor = FalseFloor;

FalseFloor.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
	// var x = this.x + this.width * 7 / 16;
	// var y = this.y + this.width * 7 / 16;
	// var width = this.width / 4;
	// var height = this.height / 4;
	// var other = this.game.hero;
	// var otherX = other.x + other.width / 2 - width / 2;
	// var otherY = other.y + other.height - height / 2;
	// ctx.fillRect(x, y, height, width);
	// ctx.fillRect(otherX, otherY, height, width);
}

FalseFloor.prototype.update = function() {
	if (this.collide(this.game.hero)) {
		this.removeFromWorld = true;
		this.game.entities.push(new Pit(this.game, this.x, this.y));
	}
}