function FalseFloor(game, x, y) {
	FlatTerrain.call(this, game, x, y);
	this.width = 83 / 2;
	this.height = 86 / 2;
}

FalseFloor.prototype = new FlatTerrain();
FalseFloor.prototype.constructor = FalseFloor;

FalseFloor.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
}