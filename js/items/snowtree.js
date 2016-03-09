function SnowTree(game, x, y) {
	Entity.call(this, game, x, y);
	this.width = 95;
	this.height = 95;
	this.snowtreeSheet = ASSET_MANAGER.getAsset("img/sheetSnowTree.png");
	var which = getRandomNumber(0, 15);
	if (which === 0) this.animation = new Animation(this.snowtreeSheet, 0, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 1) this.animation = new Animation(this.snowtreeSheet, 95, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 2) this.animation = new Animation(this.snowtreeSheet, 190, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 3) this.animation = new Animation(this.snowtreeSheet, 285, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 4) this.animation = new Animation(this.snowtreeSheet, 0, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 5) this.animation = new Animation(this.snowtreeSheet, 95, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 6) this.animation = new Animation(this.snowtreeSheet, 190, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 7) this.animation = new Animation(this.snowtreeSheet, 285, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 8) this.animation = new Animation(this.snowtreeSheet, 0, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 9) this.animation = new Animation(this.snowtreeSheet, 95, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 10) this.animation = new Animation(this.snowtreeSheet, 190, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 11) this.animation = new Animation(this.snowtreeSheet, 285, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 12) this.animation = new Animation(this.snowtreeSheet, 0, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 13) this.animation = new Animation(this.snowtreeSheet, 95, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 14) this.animation = new Animation(this.snowtreeSheet, 190, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 15) this.animation = new Animation(this.snowtreeSheet, 285, 285, 95, 95, 0.2, 1, true, false);	
	this.closed = true;

	this.boxes = false;
}
SnowTree.prototype = new Entity();
SnowTree.prototype.constructor = SnowTree;

SnowTree.prototype.collide = function (other) {
	return (this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.height + this.y > other.y);
}
SnowTree.prototype.update = function () {
	//if (this.collide(this.game.hero)) {
	//	}
	Entity.prototype.update.call(this);
	}

//};

SnowTree.prototype.draw = function (ctx) {
	   
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