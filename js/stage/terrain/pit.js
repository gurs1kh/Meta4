function Pit(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 43;
	this.height = 33;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
	this.animation = new Animation(this.sheet, 5, 4, 48, 37, 0.2, 1, true, false);
	//if ()
	//this.animation = new Animation(this.sheet, 52, 8, 33, 36, 0.2, 1, true, false);
	this.closed = true;
}
Pit.prototype = new Terrain();
Pit.prototype.constructor = Pit;