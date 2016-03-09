function Terrain(game, x, y) {
	Entity.call(this, game, x, y);
}
Terrain.prototype = new Entity();
Terrain.prototype.constructor = Terrain;

Terrain.prototype.draw = function (ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
	
	if (this.boxes) {
		ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	Entity.prototype.draw.call(this);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1.0)) + min;
}