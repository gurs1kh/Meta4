function Weapon(game, x, y) {
  Entity.call(this, game, x, y);
  this.x = x;
  this.y = y;
  this.weaponSheet = ASSET_MANAGER.getAsset("img/weaponsheet2.png");
  this.weaponSheetFlipped = ASSET_MANAGER.getAsset("img/weaponsheet2_flipped.png");
  //  this.weaponSheet2 = ASSET_MANAGER.getAsset("img/weaponsheet1_flipped-rotated.png");
  //  this.weaponSheet2Flipped = ASSET_MANAGER.getAsset("img/weaponsheet1_flipped-rotated_2.png");
  this.bowSheet = ASSET_MANAGER.getAsset("img/bows.png");

  this.meleeWeaponLeft_basic = new Animation(this.weaponSheet, 68, 40, 20, 18, 0.2, 1, true, false);
  this.meleeWeaponRight_basic = new Animation(this.weaponSheetFlipped, 296, 40, 20, 18, 0.2, 1, true, false);
  this.meleeBasic_Damage = 40;
  this.meleeWeaponLeft_middle = new Animation(this.weaponSheet, 0, 163, 28, 25, 0.2, 1, true, false);
  this.meleeWeaponRight_middle = new Animation(this.weaponSheetFlipped, 356, 163, 28, 25, 0.2, 1, true, false);
  this.meleeMiddle_Damage = 50;
  this.meleeWeaponLeft_best = new Animation(this.weaponSheet, 33, 163, 28, 25, 0.2, 1, true, false);
  this.meleeWeaponRight_best = new Animation(this.weaponSheetFlipped, 323, 163, 28, 25, 0.2, 1, true, false);
  this.meleeBest_Damage = 70;
  this.meleeWeaponFlipped = false;
  this.meleeWeaponSlashing = false;
  this.meleeWeaponSlashTime = 1000;
  this.meleeWeaponTimeAfterSlash = 0;
  this.meleeWeaponLevel = 0; //if 0: basic, if 1: middle, if 2: best

  this.bowWeaponLeft_basic = new Animation(this.bowSheet, 1, 2, 13, 33, 0.2, 1, true, false);
  this.bowWeaponRight_basic = new Animation(this.bowSheet, 18, 2, 13, 33, 0.2, 1, true, false);
  this.bowBasic_Damage = 20;
  this.bowWeaponLeft_middle = new Animation(this.bowSheet, 36, 0, 16, 36, 0.2, 1, true, false);
  this.bowWeaponRight_middle = new Animation(this.bowSheet, 54, 0, 16, 36, 0.2, 1, true, false);
  this.bowMiddle_Damage = 30;
  this.bowWeaponLeft_best = new Animation(this.bowSheet, 72, 3, 15, 32, 0.2, 1, true, false);
  this.bowWeaponRight_best = new Animation(this.bowSheet, 90, 4, 15, 32, 0.2, 1, true, false);
  this.bowBest_Damage = 50;
  this.bowWeaponFlipped = false;
  this.bowWeaponShooting = false;
  this.bowWeaponLevel = 0; //if 0: basic, if 1: middle, if 2: best
  this.bowTimeBetweenShots = 1000;
  this.bowTimeAfterShot = 1000;

  this.weaponRightOffset_x = 21;
  this.weaponLeftoffset_x = 7;
  this.weaponoffset_y = 12;

  this.usingMelee = true;

  this.boxes = false;

  this.pickedUp = true;
  setWidthHeight(this);
}

Weapon.prototype = new Entity();
Weapon.prototype.constructor = Weapon;

Weapon.prototype.collide = function (other) {
  return (this.x < other.x + other.width &&
		  this.x + this.width > other.x &&
		  this.y < other.y + other.height &&
		  this.height + this.y > other.y);
}

Weapon.prototype.update = function () {
  if (!this.pickedUp && this.collide(this.game.hero)) {
	this.pickedUp = true;
	if (this.usingMelee)
	  this.game.hero.weapon.meleeWeaponLevel = this.meleeWeaponLevel;
	else
	  this.game.hero.weapon.bowWeaponLevel = this.bowWeaponLevel;
	setWidthHeight(this.game.hero.weapon);
	setXYOffset(this.game.hero.weapon);
	this.removeFromWorld = true;
  } else if (this.usingMelee && this.pickedUp) { //&& this.meleeWeaponSlashing) {
	for (var i = 0; i < this.game.enemies.length; i++) {
	  var enemy = this.game.enemies[i];
	  if (enemy.canBeHit && this.collide(enemy) && this.meleeWeaponSlashing) {
		console.log(enemy.hitpoints);
		enemy.canBeHit = 0;
		enemy.hitpoints -= subtractDamage(this);
		if (enemy.hitpoints <= 0)
		  enemy.removeFromWorld = true;
	  } else if (!this.meleeWeaponSlashing) {
		enemy.canBeHit = 1;
	  }
	}
  }

  this.bowTimeAfterShot += 25;
  Entity.prototype.update.call(this);
};

Weapon.prototype.draw = function (ctx) {
  if (this.usingMelee) {
	if (!this.pickedUp) {
	  drawWhichWeapon(this, false, ctx, 0);
	} else if (!this.meleeWeaponFlipped && this.meleeWeaponSlashing) {
	  drawWhichWeapon(this, false, ctx, 0);
	} else if (this.pickedUp && this.meleeWeaponFlipped && this.meleeWeaponSlashing) {
	  drawWhichWeapon(this, true, ctx, 0);
	}
	if (this.pickedUp) {
	  drawWhichWeapon(this, false, ctx, 1);
	}
  } else {
	if (this.bowWeaponFlipped)
	  drawWhichWeapon(this, true, ctx, 0);
	else
	  drawWhichWeapon(this, false, ctx, 0);
	if (this.pickedUp) {
	  drawWhichWeapon(this, false, ctx, 1);
	}
  }
  if (this.boxes) {
	ctx.strokeStyle = "red";
	ctx.strokeRect(this.x, this.y, this.width, this.height);
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
	ctx.stroke();
  }
  Entity.prototype.draw.call(this);
};

function subtractDamage(weapon) {
  if (weapon.usingMelee) {
	if (weapon.meleeWeaponLevel === 0)
	  return weapon.meleeBasic_Damage;
	else if (weapon.meleeWeaponLevel === 1)
	  return weapon.meleeMiddle_Damage;
	else
	  return weapon.meleeBest_Damage;
  } else {
	if (weapon.bowWeaponLevel === 0)
	  return weapon.bowBasic_Damage;
	else if (weapon.bowWeaponLevel === 1)
	  return weapon.bowMiddle_Damage;
	else
	  return weapon.bowBest_Damage;
  }
}

function drawWhichWeapon(weapon, flipped, ctx, display) {
  if (weapon.usingMelee) {
	if (weapon.meleeWeaponLevel === 0) {
	  if (display) {
		weapon.meleeWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.meleeWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.meleeWeaponLeft_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	} else if (weapon.meleeWeaponLevel === 1) {
	  if (display) {
		weapon.meleeWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.meleeWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.meleeWeaponLeft_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	} else if (weapon.meleeWeaponLevel === 2) {
	  if (display) {
		weapon.meleeWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.meleeWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.meleeWeaponLeft_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	}
  } else {
	if (weapon.bowWeaponLevel === 0) {
	  if (display) {
		weapon.bowWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.bowWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.bowWeaponLeft_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	} else if (weapon.bowWeaponLevel === 1) {
	  if (display) {
		weapon.bowWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.bowWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.bowWeaponLeft_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	} else if (weapon.bowWeaponLevel === 2) {
	  if (display) {
		weapon.bowWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
	  } else if (flipped)
		weapon.bowWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	  else
		weapon.bowWeaponLeft_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
	}
  }
}

function setWidthHeight(weapon) {
  if (weapon.usingMelee) {
	if (weapon.meleeWeaponLevel === 0) {
	  weapon.width = 20;
	  weapon.height = 18;
	} else if (weapon.meleeWeaponLevel === 1 || weapon.meleeWeaponLevel === 2) {
	  weapon.width = 28;
	  weapon.height = 25;
	}
  } else {
	if (weapon.bowWeaponLevel === 0 || weapon.bowWeaponLevel === 1 || weapon.bowWeaponLevel === 2) {
	  weapon.width = 25;
	  weapon.height = 25;
	}
  }
}
;

function setXYOffset(weapon) {
  if (weapon.usingMelee) {
	if (weapon.meleeWeaponLevel === 0) {
	  weapon.weaponRightOffset_x = 21;
	  weapon.weaponLeftoffset_x = 7;
	  weapon.weaponoffset_y = 12;
	} else if (weapon.meleeWeaponLevel === 1 || weapon.meleeWeaponLevel === 2) {
	  weapon.weaponRightOffset_x = 21;
	  weapon.weaponLeftoffset_x = 15;
	  weapon.weaponoffset_y = 3;
	}
  } else {
	if (weapon.bowWeaponLevel === 0 || weapon.bowWeaponLevel === 1 || weapon.bowWeaponLevel === 2) {
	  weapon.weaponRightOffset_x = 22;
	  weapon.weaponLeftoffset_x = 2;
	  weapon.weaponoffset_y = 7;
	}
  }
}