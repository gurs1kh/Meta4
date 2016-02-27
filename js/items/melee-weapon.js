function MeleeWeapon(game, x, y, pickedUp) {
  Weapon.call(this, game, x, y, pickedUp);
  this.attackDelay = 1000;
  this.width = 28;
  this.height = 25;
  this.offX = 30;
  this.offY = 5;

}

MeleeWeapon.prototype = new Weapon();
MeleeWeapon.prototype.constructor = MeleeWeapon;

MeleeWeapon.prototype.update = function () {
  Weapon.prototype.update.call(this);
  if (this.attacking && this.pickedUp) {
    for (var i = 0; i < this.game.enemies.length; i++) {
      var enemy = this.game.enemies[i];
      if (this.collide(enemy)) {
        if (enemy instanceof DrDarkabolical) {          
          if (this.game.drDarkabolical.vulnerable && this.game.drDarkabolical.currentRound === 3) {
            	this.game.drDarkabolical.dead = true;
          }
          if (this.game.drDarkabolical.vulnerable) this.game.drDarkabolical.vulnerable = false;
        } else {
          enemy.hitpoints -= this.damage;
          enemy.attackedTime = 1000;
          if (enemy.hitpoints <= 0) {
            if (enemy instanceof Scarf || enemy instanceof Hood) {
              this.game.drDarkabolical.minionsAlive--;
              if (this.game.drDarkabolical.minionsAlive === 0)
                this.game.drDarkabolical.vulnerable = true;
            }
            this.game.enemies.splice(i, 1);
            i--;
            enemy.removeFromWorld = true;
          }
        }
      }
    }
  }
}