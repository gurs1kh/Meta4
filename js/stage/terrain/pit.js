function Pit(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 83/2;
	this.height = 86/2;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
	this.animation = new Animation(this.sheet, 584, 0, 83, 86, 0.2, 1, true, false);
	//if ()
	//this.animation = new Animation(this.sheet, 52, 8, 33, 36, 0.2, 1, true, false);
	this.closed = true;
}
Pit.prototype = new Terrain();
Pit.prototype.constructor = Pit;

Pit.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
	
}