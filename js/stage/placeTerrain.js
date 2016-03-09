function PlaceTerrain(game, num) {
	this.game = game;
	this.num = num;
	game.gate = new Gate(game, 3170, 4010);
	game.addEntity(game.gate);
	this.placeTrees();
	this.placeSnowTrees(); 
	this.placeTombs();
	this.placeRocks();
}

PlaceTerrain.prototype = new Entity();
PlaceTerrain.prototype.constructor = PlaceTerrain;

PlaceTerrain.prototype.placeTrees = function () {
	this.placeTreesAtlocation(1950, 4450, 4300, 5900); //Bottom
	this.placeTreesAtlocation(1950, 4450, 350, 2150); //Top
	this.placeTreesAtlocation(350, 2300, 1950, 4300); //Left
	this.placeTreesAtlocation(4100, 5900, 1950, 4450); //Right
}

PlaceTerrain.prototype.placeTreesAtlocation = function (xMin, xMax, yMin, yMax) {
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(xMin, xMax, yMin, yMax);
		var trees;
			trees = new Tree(this.game, location.x, location.y);
		this.game.terrain.push(trees);
		this.game.addEntity(trees);
	}
}
PlaceTerrain.prototype.placeTombs = function () {
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(400, 1900, 4475, 6040);
		var tombs;
			tombs = new Tombstone(this.game, location.x, location.y);
		this.game.terrain.push(tombs);
		this.game.addEntity(tombs);
	}
}
PlaceTerrain.prototype.placeSnowTrees = function () {
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(4475, 6040, 4475, 6040);
		var snowtrees;
			snowtrees = new SnowTree(this.game, location.x, location.y);
		this.game.terrain.push(snowtrees);
		this.game.addEntity(snowtrees);
	}
}
PlaceTerrain.prototype.placeRocks = function () {
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(400, 1900, 350, 1910);
		var rocks;
			rocks = new Rock(this.game, location.x, location.y);
		this.game.terrain.push(rocks);
		this.game.addEntity(rocks);
	}
}
function getlocation(xMin, xMax, yMin, yMax) {
	var location = {};
	var newXY = true;
	while (true) {
		if (newXY) {
			location = {
				x: getRandomNumber(xMin, xMax),
				y: getRandomNumber(yMin, yMax)
			}
		}
		newXY = false;
		for (var j = 0; j < this.game.terrain.length; j++) {
			if (getDistance(this.game.terrain[j], location) <= 100)
				newXY = true;
		}
		if (!newXY)
			break;
		console.log("a");
	}
	return location;
}