function ScoreBoard(game) {
	Entity.call(this, game);
}


ScoreBoard.prototype = new Entity();
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.prototype.draw = function(ctx) {
	ctx.save()
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.textAlign = "right";
	ctx.font = "30px Arial";
	ctx.fillStyle = "black"
	ctx.font = "24pt Impact";
	ctx.fillText("Lives: " + this.game.hero.lives, this.game.camera.width - 5, 30);
	ctx.restore();
}