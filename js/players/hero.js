function Hero(game, x, y) {
	var sheet = ASSET_MANAGER.getAsset("img/sheet5.png");
	var frameWidth = 33.3;
	var frameHeight = 32;
	Player.call(this, game, x, y, frameWidth, frameHeight, 200);
	
	this.animation = new Animation(sheet, 94, 128, frameWidth, frameHeight, 0.02, 1, true, false);
	
	this.downAnimation = new Animation(sheet, 94, 128, frameWidth, frameHeight, 0.2, 3, true, false);
	this.upAnimation = new Animation(sheet, 94.5, 224, frameWidth, frameHeight, 0.2, 3, true, false);
	this.leftAnimation = new Animation(sheet, 94, 160, frameWidth, frameHeight, 0.2, 3, true, false);
	this.rightAnimation = new Animation(sheet, 94, 192, frameWidth, frameHeight, 0.2, 3, true, false);

	this.speed = 3;
	this.boxes = false;
	this.lives = 3;
	this.invincible = false;
	this.timeBeingInvincible = 0;
	this.num = 0;

	this.weapons = [];
	this.weapons[0] = new MeleeWeapon1(this.game, x, y, true);
	this.weapons[1] = new Bow1(this.game, x, y, true);
	this.currentWeapon = this.weapons[0];

	this.keys = [];
}

Hero.prototype = new Player();
Hero.prototype.constructor = Hero;

Hero.prototype.pickUp = function (item) {
	if (item instanceof MeleeWeapon) {
		this.currentWeapon = this.weapons[0] = item;
	} else if (item instanceof Bow) {
		this.currentWeapon = this.weapons[1] = item;
	} else if (item instanceof Key) {
		this.keys.push(item);
	} else if (item instanceof Heart) {
		if (this.lives <= 2.5)
			this.lives += 0.5;
	}
}

Hero.prototype.update = function () {

	if (this.invincible) {
		if (this.timeBeingInvincible < 1000) {
			this.timeBeingInvincible += 20;
			this.num++;
		} else {
			this.invincible = false;
			this.timeBeingInvincible = 0;
			this.speed *= 3 / 4;
		}
	}

	if (this.game.j) {
		this.currentWeapon = this.weapons[(this.weapons.indexOf(this.currentWeapon) + 1) % 2];
		this.game.j = false;
	}

	if (this.game.a) {
		this.left = true;
		this.x -= this.speed;
	} else {
		this.left = false;
	}

	if (this.game.w) {
		this.up = true;
		this.y -= this.speed;

	} else
		this.up = false;

	if (this.game.s) {
		this.down = true;
		this.y += this.speed;
	} else
		this.down = false;

	if (this.game.d) {
		this.right = true;
		this.x += this.speed;
	} else {
		this.right = false;
	}

	var attacking = this.game.left || this.game.right || this.game.up || this.game.down;

	if (attacking && this.currentWeapon.attackingTime <= 0) {
		this.currentWeapon.attacking = true;
		this.currentWeapon.attackingTime = this.currentWeapon.attackDelay;
		this.currentWeapon.up = this.game.up;
		this.currentWeapon.down = this.game.down;
		this.currentWeapon.left = this.game.left;
		this.currentWeapon.right = this.game.right;
		this.game.up = false;
		this.game.down = false;
		this.game.left = false;
		this.game.right = false;
	} else if (this.currentWeapon.attackingTime <= 0) {
		this.currentWeapon.attacking = false;
		this.currentWeapon.up = false;
		this.currentWeapon.down = false;
		this.currentWeapon.left = false;
		this.currentWeapon.right = false;
	} else {
		this.currentWeapon.attackingTime -= 100;
	}

	//edge of island collisions
	var bounds = this.game.map.bounds;
	var feetX = this.x + this.width / 2;
	var feetY = this.y + this.height;

	if (feetX < bounds.x1)
		feetX = bounds.x1;
	if (feetY < bounds.y1)
		feetY = bounds.y1;
	if (feetX > bounds.x2)
		feetX = bounds.x2;
	if (feetY > bounds.y2)
		feetY = bounds.y2;

	//reset position
	this.x = feetX - this.width / 2;
	this.y = feetY - this.height;

	//"wall" collision
	for (var i = 0; i < this.game.map.boundRects.length; i++) {
		var rect = this.game.map.boundRects[i];
		while (collideCircleWithRotatedRectangle({
			x: this.x + this.width / 2,
			y: this.y + this.height,
			radius: 5
		}, rect)) {
			if (rect.top)
				this.y++;
			if (rect.bottom)
				this.y--;
			if (rect.left)
				this.x++;
			if (rect.right)
				this.x--;
		}
	}

	//enemy collision
	for (var i = 0; i < this.game.enemies.length; i++) {
		var enemy = this.game.enemies[i];
		if (!this.invincible && !enemy.removeFromWorld && this.collide(enemy)) {
			this.lives = this.lives - 0.5;
			this.invincible = true;
			this.speed *= 4 / 3;
			this.num++;
			if (this.lives <= 0) {
				this.removeFromWorld = true;
				if (enemy.x !== enemy.startingX && enemy.y !== enemy.startingY) {
					enemy.walkTowardX = enemy.startingX;
					enemy.walkTowardY = enemy.startingY;
					enemy.atStarting = false;
				}
			}
		}
	}

	//gate is open and hero just got onto the bridge
	// if (!this.game.gate.closed && (this.x >= 3150 && this.x < 3250) && this.y < 3970) {
	// this.game.gate.closed = true;
	// this.game.gate.whichGate = 1;
	// this.keys.forEach(function(key) {
	// key.removeFromWorld = true;
	// });
	// this.keys.length = 0;
	// this.game.map.boundRects.push({
	// x: this.game.gate.x + this.game.gate.width / 2,
	// y: this.game.gate.y + this.game.gate.height / 2,
	// rotation: 0,
	// width: this.game.gate.width,
	// height: this.game.gate.height,
	// top: true
	// });

	// }

	Player.prototype.update.call(this);
	this.currentWeapon.update();
}

Hero.prototype.draw = function (ctx) {
	if ((this.currentWeapon.up || this.currentWeapon.left) && this.currentWeapon instanceof MeleeWeapon) {
		this.upAnimation.elapsedTime = 0;
		this.leftAnimation.elapsedTime = 0;
		this.currentWeapon.draw(ctx);
	}

	if (!this.invincible || this.num % 10 === 0) {
		if (this.currentWeapon instanceof Bow) {
			Player.prototype.draw.call(this, ctx);
		} else {
			if (this.down || this.currentWeapon.down) {
				this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
			} else if (this.up || this.currentWeapon.up) {
				this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
			} else if (this.left || this.currentWeapon.left) {
				this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
			} else if (this.right || this.currentWeapon.right) {
				this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
			} else {
				this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
			}
		}
	}
	if (this.boxes) {
		ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height, 2, 0, 2 * Math.PI);
		ctx.stroke();
	}
	Entity.prototype.draw.call(this);

	if ((this.currentWeapon.down || this.currentWeapon.right) && this.currentWeapon instanceof MeleeWeapon) {
		this.downAnimation.elapsedTime = 0;
		this.rightAnimation.elapsedTime = 0;
		this.currentWeapon.draw(ctx);
	}

	if (this.currentWeapon instanceof Bow) {
		this.currentWeapon.draw(ctx);
	}
}

//from https://gist.github.com/snorpey/8134c248296649433de2 
function collideCircleWithRotatedRectangle(circle, rect) {
	var rectCenterX = rect.x;
	var rectCenterY = rect.y;

	var rectX = rectCenterX - rect.width / 2;
	var rectY = rectCenterY - rect.height / 2;

	var rectReferenceX = rectX;
	var rectReferenceY = rectY;

	// Rotate circle's center point back
	var unrotatedCircleX = Math.cos(rect.rotation) * (circle.x - rectCenterX) - Math.sin(rect.rotation) * (circle.y - rectCenterY) + rectCenterX;
	var unrotatedCircleY = Math.sin(rect.rotation) * (circle.x - rectCenterX) + Math.cos(rect.rotation) * (circle.y - rectCenterY) + rectCenterY;

	// Closest point in the rectangle to the center of circle rotated backwards(unrotated)
	var closestX, closestY;

	// Find the unrotated closest x point from center of unrotated circle
	if (unrotatedCircleX < rectReferenceX) {
		closestX = rectReferenceX;
	} else if (unrotatedCircleX > rectReferenceX + rect.width) {
		closestX = rectReferenceX + rect.width;
	} else {
		closestX = unrotatedCircleX;
	}

	// Find the unrotated closest y point from center of unrotated circle
	if (unrotatedCircleY < rectReferenceY) {
		closestY = rectReferenceY;
	} else if (unrotatedCircleY > rectReferenceY + rect.height) {
		closestY = rectReferenceY + rect.height;
	} else {
		closestY = unrotatedCircleY;
	}

	// Determine collision
	var collision = false;
	var distance = getDistance(unrotatedCircleX, unrotatedCircleY, closestX, closestY);

	if (distance < circle.radius) {
		collision = true;
	} else {
		collision = false;
	}
	return collision;
}

function getDistance(fromX, fromY, toX, toY) {
	var dX = Math.abs(fromX - toX);
	var dY = Math.abs(fromY - toY);
	return Math.sqrt((dX * dX) + (dY * dY));
}