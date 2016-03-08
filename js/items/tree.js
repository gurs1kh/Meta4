function Tree(game, x, y) {
	Entity.call(this, game, x, y);
	this.width = 90;
	this.height = 90;
	this.treeSheet = ASSET_MANAGER.getAsset("img/sheetTree.png");

	this.animation = new Animation(this.treeSheet, 0, 0, 95, 95, 0.2, 1, true, false);

	this.closed = true;

	this.boxes = false;
}
Tree.prototype = new Entity();
Tree.prototype.constructor = Tree;

Tree.prototype.collide = function (other) {
	return (this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.height + this.y > other.y);
}
Tree.prototype.update = function () {
	//if (this.collide(this.game.hero)) {
	//	}
	Entity.prototype.update.call(this);
	}

//};

Tree.prototype.draw = function (ctx) {
	   
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