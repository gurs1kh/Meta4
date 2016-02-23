function Weapon(game, x, y, pickedUp) {
	Entity.call(this, game, x, y);
	this.attacking = false;
	this.attackingTime = 0;
	this.boxes = false;
	this.flipped = true;
	this.pickedUp = pickedUp;
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;

Weapon.prototype.update = function() {
	Item.prototype.update.call(this);
	this.flipped = this.game.d;
	
	if (this.pickedUp) {
		this.x = this.game.hero.x + 15 - (this.flipped ? -this.offX + this.width : this.offX);
		this.y = this.game.hero.y + this.offY;
	}
};

Weapon.prototype.draw = function(ctx) {
	if (!this.pickedUp) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else if ((this.attacking || this instanceof Bow)&& this.flipped) {
		ctx.save();
		ctx.scale(-1,1);
		this.animation.drawFrame(this.game.clockTick, ctx, -this.x - this.width, this.y);
		ctx.restore();
	} else if (this.attacking || this instanceof Bow) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	if (this.boxes) {
		ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
};