function PurpleOrb(game, x, y, deltaX, deltaY) {
	Entity.call(this, game, x, y);
	var sheet = ASSET_MANAGER.getAsset("img/purpleOrb.png");
	this.animation = new Animation(sheet, 0, 0, 23, 24, 0.2, 1, true, false);

	this.width = 23;
	this.height = 24;

	this.deltaX = deltaX;
	this.deltaY = deltaY;

}

PurpleOrb.prototype = new Entity();
PurpleOrb.prototype.constructor = PurpleOrb;

PurpleOrb.prototype.update = function () {
	if (!this.game.camera.onScreen(this) || this.collide(this.game.gate))
		this.removeFromWorld = true;

	if (this.collide(this.game.hero) && !this.game.hero.invincible) {
		this.game.hero.lives -= 0.5;
		this.game.hero.invincible = true;
		this.game.hero.speed *= 4 / 3;
		this.game.hero.num++;
		this.removeFromWorld = true;
		if (this.game.hero.lives <= 0)
			this.game.hero.removeFromWorld = true;
	}

	this.x += this.deltaX;
	this.y += this.deltaY;

	Entity.prototype.update.call(this);
};

PurpleOrb.prototype.draw = function (ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
};