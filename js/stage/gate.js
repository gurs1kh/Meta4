function Gate(game, x, y) {
	Terrain.call(this, game, x, y);
	this.width = 61;
	this.height = 64;
	this.gateSheet = ASSET_MANAGER.getAsset("img/gate.png");

	this.gateClosed = new Animation(this.gateSheet, 0, 0, 61, 64, 0.2, 1, true, false);
	this.gateOpening1 = new Animation(this.gateSheet, 0, 63, 61, 64, 0.2, 1, true, false);
	this.gateOpening2 = new Animation(this.gateSheet, 0, 127, 61, 64, 0.2, 1, true, false);
	this.gateOpening3 = new Animation(this.gateSheet, 0, 191, 61, 64, 0.2, 1, true, false);
	this.gateOpen = new Animation(this.gateSheet, 0, 254, 61, 64, 0.2, 1, true, false);

	this.closed = true;
	this.whichGate = 1;

	this.boxes = false;
}

Gate.prototype = new Terrain();
Gate.prototype.constructor = Gate;

Gate.prototype.update = function () {
	if (this.collide(this.game.hero)) {
		if (this.game.hero.keys.length === 0)
			this.whichGate = 1;
		else if (this.game.hero.keys.length === 1)
			this.whichGate = 2;
		else if (this.game.hero.keys.length === 2)
			this.whichGate = 3;
		else if (this.game.hero.keys.length === 3)
			this.whichGate = 4;
		else if (this.game.hero.keys.length === 4) {
			this.game.gate = new Gate(this.game, this.x, this.y);
			this.game.gate.whichGate = 5;
			this.game.entities.push(this.game.gate);
			this.removeFromWorld = true;
			if (this.closed)
				this.game.map.boundRects.pop();
			this.game.gate.closed = false;
		}
	}

	Terrain.prototype.update.call(this);
};

Gate.prototype.draw = function (ctx) {
	////use scaleby in drawFrame
	if (this.whichGate === 1)
		this.gateClosed.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	else if (this.whichGate === 2)
		this.gateOpening1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	else if (this.whichGate === 3)
		this.gateOpening2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	else if (this.whichGate === 4)
		this.gateOpening3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	else if (this.whichGate === 5)
		this.gateOpen.drawFrame(this.game.clockTick, ctx, this.x, this.y);

	if (this.boxes) {
		ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	Terrain.prototype.draw.call(this);
};