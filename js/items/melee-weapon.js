function MeleeWeapon(game, x, y, pickedUp) {
	Weapon.call(this, game, x, y, pickedUp);
	
}

MeleeWeapon.prototype = new Weapon();
MeleeWeapon.prototype.constructor = MeleeWeapon;

MeleeWeapon.prototype.update = function() {
	Weapon.prototype.update.call(this);
	if (this.attacking && this.pickedUp) {
		for (var i = 0; i < this.game.enemies.length; i++) {
			var enemy = this.game.enemies[i];
			if (this.collide(enemy)) {
				enemy.hitpoints -= this.damage;
				if (enemy.hitpoints <= 0) {
					this.game.enemies.splice(i, 1);
					i--;
					enemy.removeFromWorld = true;
				}
			}
		}
	}
}