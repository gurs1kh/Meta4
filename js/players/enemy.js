function Enemy(game, x, y, frameWidth, frameHeight) {
	Player.call(this, game, x, y, frameWidth, frameHeight, 200);
	
	this.animation;
	this.forwardAnimation;
	this.backwardAnimation;
	this.leftAnimation;
	this.rightAnimation;
	
	this.wforward = false;
	this.wbackward = false;
	this.wleft = false;
	this.wright = false;
	
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
	this.wforward = false;
	this.wbackward = false;
	this.wleft = false;
	this.wright = false;
	
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
	
	this.x += v.x;
	this.y += v.y;
	
	if (v.x != 0 || v.y != 0) {
		if (Math.abs(v.x) > Math.abs(v.y)) {
			if (v.x > 0)
				this.wright = true;
			else
				this.wleft = true;
		} else {
			if (v.y < 0)
				this.wbackward = true;
			else
				this.wforward = true;
		}
	}
	
	Entity.prototype.update.call(this);
}