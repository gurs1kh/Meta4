function Map(game) {
	Entity.call(this, game, 0, 400);
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.update = function() {
}

Map.prototype.draw = function(ctx) {
	
}