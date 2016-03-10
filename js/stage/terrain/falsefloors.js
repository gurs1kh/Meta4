function FalseFloorZombie(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 83/2;
	this.height = 86/2;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
    this.animation = new Animation(this.sheet, 386, 0, 93, 95, 0.2, 1, true, false);
 // this.animation = new Animation(this.sheet, 584, 0, 83, 86, 0.2, 1, true, false);
	this.closed = true;
}
FalseFloorZombie.prototype = new Terrain();
FalseFloorZombie.prototype.constructor = FalseFloorZombie;

FalseFloor.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
}
function FalseFloorSnow(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 83/2;
	this.height = 86/2;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
    this.animation = new Animation(this.sheet, 97, 102, 100, 99, 0.2, 1, true, false);
 // this.animation = new Animation(this.sheet, 584, 0, 83, 86, 0.2, 1, true, false);
	this.closed = true;
}
FalseFloorSnow.prototype = new Terrain();
FalseFloorSnow.prototype.constructor = FalseFloorSnow;

FalseFloorSnow.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
}

function FalseFloorTomb(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 83/2;
	this.height = 86/2;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
    this.animation = new Animation(this.sheet, 289, 0, 95, 96, 0.2, 1, true, false);
 // this.animation = new Animation(this.sheet, 584, 0, 83, 86, 0.2, 1, true, false);
	this.closed = true;
}
FalseFloorTomb.prototype = new Terrain();
FalseFloorTomb.prototype.constructor = FalseFloorTomb;

FalseFloorTomb.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
}

function FalseFloorHuman(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 83/2;
	this.height = 86/2;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetPit.png");
    this.animation = new Animation(this.sheet, 193, 0, 95, 95, 0.2, 1, true, false);
 // this.animation = new Animation(this.sheet, 584, 0, 83, 86, 0.2, 1, true, false);
	this.closed = true;
}
FalseFloorHuman.prototype = new Terrain();
FalseFloorHuman.prototype.constructor = FalseFloorHuman;

FalseFloorHuman.prototype.draw = function(ctx){
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.5);
}