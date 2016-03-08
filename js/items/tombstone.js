function Tombstone(game, x, y) {
	Entity.call(this, game, x, y);
	this.width = 95;
	this.height = 95;
	this.tombSheet = ASSET_MANAGER.getAsset("img/sheetTombstone.png");
	var which = getRandomNumber(0, 1);
	if (which === 0) this.animation = new Animation(this.tombSheet, 0, 0, 56, 58, 0.2, 1, true, false);
	else if (which === 1) this.animation = new Animation(this.tombSheet, 56, 0, 49, 58, 0.2, 1, true, false);
	this.closed = true;

	this.boxes = false;
}
Tombstone.prototype = new Entity();
Tombstone.prototype.constructor = Tombstone;

Tombstone.prototype.collide = function (other) {
	return (this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.height + this.y > other.y);
}
Tombstone.prototype.update = function () {
	//if (this.collide(this.game.hero)) {
	//	}
	Entity.prototype.update.call(this);
	}


Tombstone.prototype.draw = function (ctx) {
	   
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