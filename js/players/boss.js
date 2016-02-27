function Boss(game, x, y, frameWidth, frameHeight) {
	Enemy.call(this, game, x, y, frameWidth, frameHeight);
}

Boss.prototype = new Enemy();
Boss.prototype.constructor = Boss;

Boss.prototype.update = function () {
	Enemy.prototype.update.call(this);

	if (this.removeFromWorld) {
		var key = new Key(this.game, this.x, this.y, this.game.hero.keys.length);
		this.game.addEntity(key);
		this.game.bossesKilled++;
		var weapon;

		switch (this.game.bossesKilled) {
			case 1:
				weapon = new MeleeWeapon2(this.game, this.x + 25, this.y);
				break;
			case 2:
				weapon = new Bow2(this.game, this.x + 25, this.y);
				break;
			case 3:
				weapon = new MeleeWeapon3(this.game, this.x + 25, this.y);
				break;
			case 4:
				weapon = new Bow3(this.game, this.x + 25, this.y);
				break;
		}

		this.game.addEntity(weapon);

	}

	Entity.prototype.update.call(this);
}