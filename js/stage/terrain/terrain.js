function Terrain(game, x, y) {
	Entity.call(this, game, x, y);
}
Terrain.prototype = new Entity();
Terrain.prototype.constructor = Terrain;

Terrain.prototype.draw = function (ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
	Entity.prototype.draw.call(this);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1.0)) + min;
}