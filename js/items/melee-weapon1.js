function MeleeWeapon1(game, x, y, pickedUp) {
	MeleeWeapon.call(this, game, x, y, pickedUp);
	var sheet = ASSET_MANAGER.getAsset("img/weaponsheet2.png");
	this.animation = new Animation(sheet, 68, 40, 20, 18, 0.2, 1, true, false);
	this.damage = 30;
	this.width = 20;
	this.height = 18;
	this.offX = 25;
	this.offY = 10;
}

MeleeWeapon1.prototype = new MeleeWeapon();
MeleeWeapon1.prototype.constructor = MeleeWeapon1;