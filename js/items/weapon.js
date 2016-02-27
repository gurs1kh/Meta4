function Weapon(game, x, y, pickedUp) {
  Entity.call(this, game, x, y);
  this.attacking = false;
  this.attackingTime = 0;
  this.boxes = false;
  this.pickedUp = pickedUp;
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;

Weapon.prototype.update = function () {
  Item.prototype.update.call(this);

  if (this.pickedUp) {
    this.x = this.game.hero.x;
    this.y = this.game.hero.y;
  }
};

Weapon.prototype.draw = function (ctx) {
  if (!this.pickedUp) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  } else if (this.attacking || this instanceof Bow) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.game.hero.x - this.width, this.game.hero.y);
  }
  if (this.boxes) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
};