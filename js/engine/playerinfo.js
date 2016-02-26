function PlayerInfo(game) {
	Entity.call(this, game);
        this.heartSheet = ASSET_MANAGER.getAsset("img/heartspritesheet.png");
        this.hearts = [       new Animation(this.heartSheet, 0, 0, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 58, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 116, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 174, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 232, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 290, 186, 58, 0.2, 1, true, false),
                              new Animation(this.heartSheet, 0, 348, 186, 58, 0.2, 1, true, false)
                            ];
        this.heart1 = new Animation(this.heartSheet, 0, 0, 62, 58, 0.2, 1, true, false);
}


PlayerInfo.prototype = new Entity();
PlayerInfo.prototype.constructor = PlayerInfo;

PlayerInfo.prototype.draw = function(ctx) {
	ctx.save();
	
	var camera = this.game.camera;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	// ctx.textAlign = "right";
	// ctx.font = "30px Arial";
	// ctx.fillStyle = "black"
	// ctx.font = "24pt Impact";
	// ctx.fillText("Lives: ", camera.width - 100, 30);

	this.game.hero.currentWeapon.animation.drawFrame(this.game.clockTick, ctx, camera.width - 30, 40);
	
	this.hearts[this.game.hero.lives * 2].drawFrame(this.game.clockTick, ctx, camera.width - 100, 5, 0.5);
	
	this.game.hero.keys.forEach(function(key) {
		if (key.pickedUp) {
			var i = key.whichKey;
			key.animations[i].drawFrame(key.game.clockTick, ctx, camera.width - 25, (i + 2) * 40);
		}
	});
	
	ctx.restore();
        
	if (this.game.hero.lives <= 0) {
		var img = ASSET_MANAGER.getAsset("img/test.jpg");
		ctx.drawImage(img, this.game.camera.x - this.game.camera.width / 2, this.game.camera.y - this.game.camera.height / 2);
	}
}

PlayerInfo.prototype.update = function() {
	if (this.game.hero.lives <= 0) {
		this.game.entities.splice(this.game.entities.indexOf(this), 1);
		this.game.entities.push(this);
		this.game.enemies.forEach(function(d) {
			d.removeFromWorld = true;
		});
	}
}