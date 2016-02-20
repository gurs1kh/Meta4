function Enemy(game, x, y, frameWidth, frameHeight) {
	Player.call(this, game, x, y, frameWidth, frameHeight, 0);
	
	this.animation;
	this.forwardAnimation;
	this.backwardAnimation;
	this.leftAnimation;
	this.rightAnimation;
	
	this.seesHero = false;
	this.atStarting = true;
	this.walkTowardX = 0;
	this.walkTowardY = 0;
	
	this.startingX = this.x;
	this.startingY = this.y;
        
	this.hitpoints = 100;
	this.canBeHit = 1;
	
	this.boxes = false;
}

Enemy.prototype = new Player();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	this.wforward = false;
	this.wbackward = false;
	this.wleft = false;
	this.wright = false;
	//if the goblin is within the viewing circle
	if (this.seesHero || !this.atStarting) {
		//if the goblin and destination are on the same y axis
                ///**************************************************************************************TODO: changed this line*/
                 if (this.walkTowardY < this.y + 1 && this.walkTowardY > this.y - 1) {
			//if the destination is to the left of the goblin
			if (this.walkTowardX < this.x) {
				this.wleft = true;
				this.x = this.x - 1;
				//if the destination is to the right of the goblin
			} else {
				this.wright = true;
				this.x = this.x + 1;
			}
			//if the destination is below the goblin
		} else if (this.walkTowardY > this.y) {
			this.wforward = true;
			//if the destination and goblin are on the same x axis
			if (this.walkTowardX === this.x) {
				this.y = this.y + 1;
				//if the destination is to the left of the goblin
			} else if (this.walkTowardX < this.x) {
				this.y = this.y + .75;
				this.x = this.x - .75;
				//if the destination is to the right of the goblin
			} else {
				this.y = this.y + .75;
				this.x = this.x + .75;
			}
			//if the destination is above the goblin
		} else {
			this.wbackward = true;
			//if the destination and goblin are on the same x axis
			if (this.walkTowardX === this.x) {
				this.y = this.y - 1;
				//if the destination is to the left of the goblin
			} else if (this.walkTowardX < this.x) {
				this.y = this.y - .75;
				this.x = this.x - .75;
				//if the destination is to the right of the goblin
			} else {
				this.y = this.y - .75;
				this.x = this.x + .75;
			}
		}
	}
	
	if (this.startingX < this.x + 1 && this.startingX > this.x - 1) && (this.startingY < this.y + 1 && this.startingY > this.y - 1) {
		this.atStarting = true;
		this.wforward = false;
		this.wbackward = false;
		this.wleft = false;
		this.wright = false;
	}
	
	Entity.prototype.update.call(this);
}
