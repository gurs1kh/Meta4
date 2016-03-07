function EnemyInfo(game, x, y) {
	Entity.call(this, game);
	this.x = x;
	this.y = y;
	this.width = 30;
	this.height = 10;
	
	this.greenWidth = this.width;
	
	this.boxes = false;
}


EnemyInfo.prototype = new Entity();
EnemyInfo.prototype.constructor = EnemyInfo;


EnemyInfo.prototype.draw = function (ctx) {
//	console.log("hello");
	ctx.fillStyle = "red";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "green";
	ctx.fillRect(this.x, this.y, this.greenWidth, this.height);
	
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