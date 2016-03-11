function FlatTerrain(game, x, y) {
	Terrain.call(this, game, x, y);
}

FlatTerrain.prototype = new Terrain();
FlatTerrain.prototype.constructor = FlatTerrain;