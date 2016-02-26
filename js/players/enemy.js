function Enemy(game, x, y, frameWidth, frameHeight) {
	Player.call(this, game, x, y, frameWidth, frameHeight, 200);
	
	this.atStarting = true;
	this.attackedTime = 0;

	this.startingX = this.x;
	this.startingY = this.y;
	
	this.hitpoints = 100;

	this.boxes = false;
}

Enemy.prototype = new Player();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	this.down = false;
	this.up = false;
	this.left = false;
	this.right = false;
	
	var v = {x: -this.x, y: -this.y};
	if (this.canSee(this.game.hero)) {
		v.x += this.game.hero.x;
		v.y += this.game.hero.y;
	} else {
		v.x += this.startingX;
		v.y += this.startingY;
	}
	
	var magn = Math.sqrt(v.x * v.x + v.y * v.y);
	if (magn) {
		v.x /= magn;
		v.y /= magn;
	}
	
	if (this.attackedTime > 0) {
		this.attackedTime -= 100;
		v.x *= -4;
		v.y *= -4;
	}
	
	v.x = Math.round(v.x);
	v.y = Math.round(v.y);
	
	this.x += v.x;
	this.y += v.y;
	
	if (v.x != 0 || v.y != 0) {
		if (Math.abs(v.x) > Math.abs(v.y)) {
			if (v.x > 0)
				this.right = true;
			else
				this.left = true;
		} else {
			if (v.y < 0)
				this.up = true;
			else
				this.down = true;
		}
	}
	
	Entity.prototype.update.call(this);
}