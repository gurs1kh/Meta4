function Map(game) {
	Entity.call(this, game, 0, 400);
	var sheet = ASSET_MANAGER.getAsset("img/META4map-min2.png");
	this.animation = new Animation(sheet, 0, 0, 12800, 12800, 1, 1, true, false);
	
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.update = function() {
}

Map.prototype.draw = function(ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, 0, 0);
}