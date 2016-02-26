function DrDarkabolical(game, x, y) {
	var sheet = ASSET_MANAGER.getAsset("img/sheet5.png");
	var frameWidth = 33.3;
	var frameHeight = 32;
	Boss.call(this, game, x, y, frameWidth, frameHeight);
	this.radius = 300;
	
	this.animation = new Animation(sheet, 192 + 32, 128, 32, 32, 0.05, 1, true, false);
	this.upAnimation = new Animation(sheet, 192, 128 + 96, 32, 32, 0.2, 3, true, false);
	this.downAnimation = new Animation(sheet, 192, 128, 32, 32, 0.2, 3, true, false);
	this.leftAnimation = new Animation(sheet, 192, 128 + 32, 32, 32, 0.2, 3, true, false);
	this.rightAnimation = new Animation(sheet, 192, 128 + 64, 32, 32, 0.2, 3, true, false);

	this.telOutAnimation = new Animation(sheet, 192 + 96, 128, 32, 32, 0.05, 9, false, true);
    this.telInAnimation = new Animation(sheet, 192 + 96, 128, 32, 32, 0.05, 9, false, false);
    
	this.telIn = false;
	this.telOut = false;
}

DrDarkabolical.prototype = new Boss();
DrDarkabolical.prototype.constructor = DrDarkabolical;

DrDarkabolical.prototype.update = function() {
	Boss.prototype.update.call(this);
	this.speed = this.game.hero.speed;
	if (this.canSee(this.game.hero)) {
		this.radius = 6400;
	}
	if (this.telOut) {
        if (this.telOutAnimation.isDone()) {
            this.telOutAnimation.elapsedTime = 0;
            this.telOut = false;
			this.telIn = true;	
			this.x += getRandomNumber(-250, 250);
			this.y += getRandomNumber(-250, 250);
        }
    } else if (this.telIn) {
		if (this.telInAnimation.isDone()) {
            this.telInAnimation.elapsedTime = 0;
            this.telIn = false;
        }
	}
}

DrDarkabolical.prototype.draw = function (ctx) {
    if (this.telOut) {
        this.telOutAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.telIn) {
		this.telInAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);	
	} else if (this.up) {
		this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);	
	} else if (this.down) {
		this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);	
	} else if (this.left) {
		this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);	
	} else if (this.right) {
		this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);	
	} else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}