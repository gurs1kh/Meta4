function Bow(game, x, y, pickedUp) {
	Weapon.call(this, game, x, y, pickedUp);
	this.attackDelay = 3000;
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
		if (this.left)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 0));
		else if (this.down)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 1));
		else if (this.right)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 2));
		else if (this.up)
			this.game.addEntity(new Arrow(this.game, this.x, this.y, this.damage, 3));
	}
}