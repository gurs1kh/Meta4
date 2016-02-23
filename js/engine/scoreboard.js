function ScoreBoard(game) {
	Entity.call(this, game);
}


ScoreBoard.prototype = new Entity();
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.prototype.draw = function(ctx) {
	ctx.save();
	
	var camera = this.game.camera;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.textAlign = "right";
	ctx.font = "30px Arial";
	ctx.fillStyle = "black"
	ctx.font = "24pt Impact";
	ctx.fillText("Lives: " + this.game.hero.lives, camera.width - 5, 30);
	
	this.game.hero.keys.forEach(function(key) {
		var i = key.whichKey;
		key.animations[i].drawFrame(key.game.clockTick, ctx, camera.width - 25, (i + 1) * 40);
	});
	
	ctx.restore();
}