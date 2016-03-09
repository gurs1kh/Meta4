function Tombstone(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 50;
	this.height = 38;
	this.sheet = ASSET_MANAGER.getAsset("img/sheetTombstone.png");
	var which = getRandomNumber(0, 1);
	if (which === 0) this.animation = new Animation(this.sheet, 0, 20, 56, 58, 0.2, 1, true, false);
	else if (which === 1) this.animation = new Animation(this.sheet, 56, 20, 49, 58, 0.2, 1, true, false);
	this.closed = true;
	
	// this.game.map.boundRects.push({
		// x: this.x + this.width / 4,
		// y: this.y + this.height / 2,
		// rotation: 0,
		// width: this.width / 2,
		// height: this.height,
		// right: true,
		// color:"rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
	// });
	
	// this.game.map.boundRects.push({
		// x: this.x + this.width / 4 * 3,
		// y: this.y + this.height / 2,
		// rotation: 0,
		// width: this.width / 2,
		// height: this.height,
		// left: true,
		// color:"rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
	// });
	
	// this.game.map.boundRects.push({
		// x: this.x + this.width / 2,
		// y: this.y + this.height / 4,
		// rotation: 0,
		// width: this.width,
		// height: this.height / 2,
		// bottom: true,
		// color:"rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
	// });
	
	// this.game.map.boundRects.push({
		// x: this.x + this.width / 2,
		// y: this.y + this.height / 4 * 3,
		// rotation: 0,
		// width: this.width,
		// height: this.height / 2,
		// top: true,
		// color:"rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
	// });
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6,
		y: this.y + this.height / 6,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		bottom: true, right: true,
	});
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6 * 3,
		y: this.y + this.height / 6,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		bottom: true,
	});
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6 * 5,
		y: this.y + this.height / 6,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		bottom: true, left: true,
	});
	
	
	
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6,
		y: this.y + this.height / 6 * 3,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		right: true,
	});
	
	// this.game.map.boundRects.push({
		// x: this.x + this.width / 6 * 3,
		// y: this.y + this.height / 6 * 3,
		// rotation: 0,
		// width: this.width / 3,
		// height: this.height / 3,
		// right: true,
	// });
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6 * 5,
		y: this.y + this.height / 6 * 3,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		left: true,
	});
	
	
	
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6,
		y: this.y + this.height / 6 * 5,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		top: true, right: true,
	});
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6 * 3,
		y: this.y + this.height / 6 * 5,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		top: true,
	});
	
	this.game.map.boundRects.push({
		x: this.x + this.width / 6 * 5,
		y: this.y + this.height / 6 * 5,
		rotation: 0,
		width: this.width / 3,
		height: this.height / 3,
		top: true, left: true,
	});
}
Tombstone.prototype = new Terrain();
Tombstone.prototype.constructor = Tombstone;