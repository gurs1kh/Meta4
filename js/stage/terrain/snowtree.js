function SnowTree(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 95;
	this.height = 95;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetSnowTree.png");
	var which = getRandomNumber(0, 15);
	if (which === 0) this.animation = new Animation(this.sheet, 0, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 1) this.animation = new Animation(this.sheet, 95, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 2) this.animation = new Animation(this.sheet, 190, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 3) this.animation = new Animation(this.sheet, 285, 0, 95, 95, 0.2, 1, true, false);
	else if (which === 4) this.animation = new Animation(this.sheet, 0, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 5) this.animation = new Animation(this.sheet, 95, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 6) this.animation = new Animation(this.sheet, 190, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 7) this.animation = new Animation(this.sheet, 285, 95, 95, 95, 0.2, 1, true, false);
	else if (which === 8) this.animation = new Animation(this.sheet, 0, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 9) this.animation = new Animation(this.sheet, 95, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 10) this.animation = new Animation(this.sheet, 190, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 11) this.animation = new Animation(this.sheet, 285, 190, 95, 95, 0.2, 1, true, false);
	else if (which === 12) this.animation = new Animation(this.sheet, 0, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 13) this.animation = new Animation(this.sheet, 95, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 14) this.animation = new Animation(this.sheet, 190, 285, 95, 95, 0.2, 1, true, false);
	else if (which === 15) this.animation = new Animation(this.sheet, 285, 285, 95, 95, 0.2, 1, true, false);	
	this.closed = true;

	this.boxes = false;
}
SnowTree.prototype = new Terrain();
SnowTree.prototype.constructor = SnowTree;