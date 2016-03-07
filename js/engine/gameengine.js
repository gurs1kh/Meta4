// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
window.requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();


function Timer() {
	this.gameTime = 0;
	this.maxStep = 0.05;
	this.wallLastTimestamp = 0;
}
;

Timer.prototype.tick = function () {
	var wallCurrent = Date.now();
	var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
	this.wallLastTimestamp = wallCurrent;

	var gameDelta = Math.min(wallDelta, this.maxStep);
	this.gameTime += gameDelta;
	return gameDelta;
};

function GameEngine() {
	this.entities = [];
	this.showOutlines = false;
	this.ctx = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;
	this.surfaceWidth = null;
	this.surfaceHeight = null;
	this.KBeenHandled = false;
}
;

GameEngine.prototype.init = function (ctx) {
	this.ctx = ctx;
	this.surfaceWidth = this.ctx.canvas.width;
	this.surfaceHeight = this.ctx.canvas.height;
	this.startInput();
	this.timer = new Timer();
	//	console.log('game initialized');
};

GameEngine.prototype.start = function () {
	//	console.log("starting game");
	var that = this;
	(function gameLoop() {
		that.loop();
		requestAnimationFrame(gameLoop, that.ctx.canvas);
	})();
};

GameEngine.prototype.startInput = function () {
	//	console.log('Starting input');
	var that = this;

	this.ctx.canvas.addEventListener("keydown", function (e) {
		if (String.fromCharCode(e.which) === 'A')
			that.a = true;
		if (String.fromCharCode(e.which) === 'W')
			that.w = true;
		if (String.fromCharCode(e.which) === 'S')
			that.s = true;
		if (String.fromCharCode(e.which) === 'D')
			that.d = true;
		if (String.fromCharCode(e.which) === ' ') {
			that.j = true;
			e.preventDefault();
		}
		if (e.keyCode >= 37 && e.keyCode <= 40)
			e.preventDefault();
	}, false);

	this.ctx.canvas.addEventListener("keyup", function (e) {
		if (String.fromCharCode(e.which) === 'A')
			that.a = false;
		if (String.fromCharCode(e.which) === 'W')
			that.w = false;
		if (String.fromCharCode(e.which) === 'S')
			that.s = false;
		if (String.fromCharCode(e.which) === 'D')
			that.d = false;
		if (String.fromCharCode(e.which) === ' ')
			that.j = false;
		if (e.keyCode === 37)
			that.left = true;
		if (e.keyCode === 38)
			that.up = true;
		if (e.keyCode === 39)
			that.right = true;
		if (e.keyCode === 40)
			that.down = true;
	}, false);

	//	console.log('Input started');
};

GameEngine.prototype.addEntity = function (entity) {
	//	console.log('added entity');
	this.entities.push(entity);
};

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.save();
	var transX = -(this.camera.x - this.camera.width / 2);
	var transY = -(this.camera.y - this.camera.height / 2);
	this.ctx.translate(transX, transY);
	for (var i = 0; i < this.entities.length; i++) {
		if (this.entities[i] && (this.camera.onScreen(this.entities[i]) ||
			this.entities[i] instanceof Map ||
			this.entities[i] instanceof PlayerInfo)) {

			this.entities[i].draw(this.ctx);
		}
	}
	this.playerInfo.draw(this.ctx);
	this.ctx.restore();
};

GameEngine.prototype.update = function () {
	var entitiesCount = this.entities.length;

	for (var i = 0; i < entitiesCount; i++) {
		var entity = this.entities[i];

		if (entity && !entity.removeFromWorld) {
			entity.update();
		}
	}

	for (var i = this.entities.length - 1; i >= 0; --i) {
		if (!this.entities[i] || this.entities[i].removeFromWorld) {
			if (this.entities[i] instanceof Enemy)
				this.entities[i].update();
			this.entities.splice(i, 1);
		}
	}
	this.playerInfo.update();
};

GameEngine.prototype.loop = function () {
	this.clockTick = this.timer.tick();
	this.update();
	this.draw();
	this.space = null;
};

function Entity(game, x, y) {
	this.game = game;
	this.x = x;
	this.y = y;
	this.removeFromWorld = false;
}
;

Entity.prototype.update = function () {
};

Entity.prototype.draw = function (ctx) {
	if (this.game.showOutlines && this.radius) {
		this.game.ctx.beginPath();
		this.game.ctx.strokeStyle = "green";
		this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.game.ctx.stroke();
		this.game.ctx.closePath();
	}
};

Entity.prototype.collide = function (other) {
	return (this.x < other.x + other.width &&
	this.x + this.width > other.x &&
	this.y < other.y + other.height &&
	this.height + this.y > other.y);
}

Entity.prototype.rotateAndCache = function (image, angle) {
	var offscreenCanvas = document.createElement('canvas');
	var size = Math.max(image.width, image.height);
	offscreenCanvas.width = size;
	offscreenCanvas.height = size;
	var offscreenCtx = offscreenCanvas.getContext('2d');
	offscreenCtx.save();
	offscreenCtx.translate(size / 2, size / 2);
	offscreenCtx.rotate(angle);
	offscreenCtx.translate(0, 0);
	offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
	offscreenCtx.restore();
	//offscreenCtx.strokeStyle = "red";
	//offscreenCtx.strokeRect(0,0,size,size);
	return offscreenCanvas;
};