function Rock(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 63;
	this.height = 77;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetRock.png");
	var which = getRandomNumber(0, 0);
	if (which === 0) this.animation = new Animation(this.sheet, 0, 0, 63, 77, 0.2, 1, true, false);
	else if (which === 1) this.animation = new Animation(this.sheet, 33, 0, 32, 31, 0.2, 1, true, false);
	else if (which === 2) this.animation = new Animation(this.sheet, 33, 0, 32, 31, 0.2, 1, true, false);
	this.closed = true;
}
Rock.prototype = new Terrain();
Rock.prototype.constructor = Rock;