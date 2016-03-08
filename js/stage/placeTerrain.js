function PlaceTerrain(game, num) {
	this.game = game;
	this.num = num;
	this.placeTrees();
}

PlaceTerrain.prototype = new Entity();
PlaceTerrain.prototype.constructor = PlaceTerrain;

PlaceTerrain.prototype.placeTrees = function () {
	this.placeTreesAtlocation(1950, 4450, 4500, 5900); //Bottom
	this.placeTreesAtlocation(1950, 4450, 350, 2150); //Top
	this.placeTreesAtlocation(250, 2300, 1950, 4450); //Left
	this.placeTreesAtlocation(4100, 5900, 1950, 4450); //Right
}

PlaceTerrain.prototype.placeTreesAtlocation = function (xMin, xMax, yMin, yMax) {
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(xMin, xMax, yMin, yMax);
		var trees;
		var which = getRandomNumber(0, 2);
		if (which === 0)
			trees = new Tree(this.game, location.x, location.y);
		else if (which === 1)
			trees = new Tree(this.game, location.x, location.y) ;
		else if (which === 2)
			trees = new Tree(this.game, location.x, location.y);
		this.game.terrain.push(trees);
		this.game.addEntity(trees);
	}
}
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1.0)) + min;
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