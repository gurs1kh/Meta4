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
    
	this.telIn = true;
	this.telOut = false;
}

DrDarkabolical.prototype = new Boss();
DrDarkabolical.prototype.constructor = DrDarkabolical;

// DrDarkabolical.prototype.update = function() {
	
// }

// DrDarkabolical.prototype.draw = function() {
	
// }