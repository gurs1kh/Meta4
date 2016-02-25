function Bow(game, x, y, pickedUp) {
	Weapon.call(this, game, x, y, pickedUp);
	this.attackDelay = 2000;
	this.width = 25;
	this.height = 25;
	this.offX = 20;
	this.offY = 0;
}

Bow.prototype = new Weapon();
Bow.prototype.constructor = Bow;

Bow.prototype.update = function() {
	Weapon.prototype.update.call(this);
	if (this.attackingTime <= 0 && this.pickedUp) {
		if (this.game.left)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 0));
		if (this.game.down)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 1));
		if (this.game.right)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 2));
		if (this.game.up)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 3));
	}
}