function MeleeWeapon2(game, x, y, pickedUp) {
    MeleeWeapon.call(this, game, x, y, pickedUp);
    var sheet = ASSET_MANAGER.getAsset("img/weaponsheet2.png");
    this.animation = new Animation(sheet, 0, 163, 28, 25, 0.2, 1, true, false);
    this.damage = 50;
}

MeleeWeapon2.prototype = new MeleeWeapon();
MeleeWeapon2.prototype.constructor = MeleeWeapon2;
