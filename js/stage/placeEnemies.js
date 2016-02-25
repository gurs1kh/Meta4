function PlaceEnemies(game, num) {
	this.game = game;
	this.num = num;
}
	
PlaceEnemies.prototype = new Entity();
PlaceEnemies.prototype.constructor = PlaceEnemies;
count = 0;
PlaceEnemies.prototype.update = function() {
	if (!count) {
		this.placeBasics();
	console.log(2, game.entities.length);
		this.placeHuman();
	console.log(3, game.entities.length);
		count++; 
		this.placeTomb();
	console.log(4, game.entities.length);
		this.placeUndead();
	console.log(5, game.entities.length);
		this.placeGoblin();
	console.log(6, game.entities.length);
		this.placeDark();
	console.log(7, game.entities.length);
	}
}

PlaceEnemies.prototype.placeBasics = function() {
	var num = this.num / 4;
	
	this.placeBasicsAtlocation(num, 1950, 4450, 4500, 6050); //Bottom
	this.placeBasicsAtlocation(num, 1950, 4450, 350, 2300); //Top
	this.placeBasicsAtlocation(num, 350, 2300, 1950, 4450); //Left
	this.placeBasicsAtlocation(num, 4100, 6050, 1950, 4450); //Right
}

PlaceEnemies.prototype.placeBasicsAtlocation = function(num, xMin, xMax, yMin, yMax) {
	for (var i = 0; i < num; i++) {
		var location = getlocation(xMin, xMax, yMin, yMax);
		var basic;
		var which = getRandomNumber(0, 2);
		if (which === 0)
			basic = new Dog(this.game, location.x, location.y);
		else if (which === 1)
			basic = new BlackRat(this.game, location.x, location.y);
		else if (which === 2)
			basic = new BrownRat(this.game, location.x, location.y);
		this.game.enemies.push(basic);
		this.game.addEntity(basic);
	}   
}

PlaceEnemies.prototype.placeHuman = function() {
	var blackKnight = new BlackKnight(this.game, 500, 500);
	this.game.enemies.push(blackKnight);
	this.game.addEntity(blackKnight);
	for (var i = 0; i < this.num; i++) {
		var location = getlocation(400, 1900, 350, 1910);
		var human;
		var which = getRandomNumber(0, 2);
		if (which === 0)
			human = new Stitches(this.game, location.x, location.y);
		else if (which === 1)
			human = new Eyepatch(this.game, location.x, location.y);
		else if (which === 2)
		human = new Viking(this.game, location.x, location.y);
		this.game.enemies.push(human);
		this.game.addEntity(human);
	}
}

PlaceEnemies.prototype.placeTomb = function() {
	var skeletonKing = new SkeletonKing(this.game, 500, 5900);
	this.game.enemies.push(skeletonKing);
	this.game.addEntity(skeletonKing);

	for (var i = 0; i < this.num; i++) {
		var location = getlocation(400, 1900, 4475, 6040);
		var tomb;
		var which = getRandomNumber(0, 1);
		if (!which)
			tomb = new Skeleton(this.game, location.x, location.y);
		else
			tomb = new Mummy(this.game, location.x, location.y);
		this.game.enemies.push(tomb);
		this.game.addEntity(tomb);
	}
}

PlaceEnemies.prototype.placeUndead = function() {
	var death = new Death(this.game, 5820, 500);
	this.game.enemies.push(death);
	this.game.addEntity(death);

	for (var i = 0; i < this.num; i++) {
		var location = getlocation(this.game, 4475, 6040, 350, 1910);
		var undead;
		var which = getRandomNumber(0, 2);
		if (which === 0)
			undead = new SuitZombie(this.game, location.x, location.y);
		else if (which === 1)
			undead = new BlondeZombie(this.game, location.x, location.y);
		else if (which === 2)
			undead = new SuburbanZombie(this.game, location.x, location.y);
		this.game.enemies.push(undead);
		this.game.addEntity(undead);
	}
}

PlaceEnemies.prototype.placeGoblin = function() {
	var armoredGoblin = new ArmoredGoblin(this.game, 5820, 5900);
	this.game.enemies.push(armoredGoblin);
	this.game.addEntity(armoredGoblin);

	for (var i = 0; i < this.num; i++) {
		var location = getlocation(4475, 6040, 4475, 6040);
		var goblin;
		var which = getRandomNumber(0, 1);
		if (!which)
			goblin = new WizardGoblin(this.game, location.x, location.y);
		else
			goblin = new HelmetGoblin(this.game, location.x, location.y);
		this.game.enemies.push(goblin);
		this.game.addEntity(goblin);
	}
}

PlaceEnemies.prototype.placeDark = function() {
	
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1.0)) + min;
}

function getlocation(xMin, xMax, yMin, yMax) {
	var location = {};
	var newXY = true;
	while (true) {
		if (newXY) {
			location = {x:getRandomNumber(xMin, xMax),
						y:getRandomNumber(yMin, yMax)
					   }
		}
		newXY = false;
		for (var j = 0; j < this.game.enemies.length; j++) {
			if (getDistance(this.game.enemies[j], location) <= 100) 
				newXY = true;
		}
		if (!newXY)
			break;
		console.log("a");
	}
	return location;
}
