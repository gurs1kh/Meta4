function Camera(game) {
	Entity.call(this, game, 0, 0);
	// this.width = game.ctx.canvas.width;
	// this.height = game.ctx.canvas.height;
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function() {
	if (this.game.a) this.x -= this.game.hero.speed;
    if (this.game.w) this.y -= this.game.hero.speed;    
    if (this.game.s) this.y += this.game.hero.speed;
    if (this.game.d) this.x += this.game.hero.speed;
}

Camera.prototype.draw = function(ctx) {
	
}