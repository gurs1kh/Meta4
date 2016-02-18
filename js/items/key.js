function Key(game, x, y) {
  Entity.call(this, game, x, y);
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 25;
  this.keySheet = ASSET_MANAGER.getAsset("img/keys.png");

//  this.meleeWeaponLeft_basic = new Animation(this.weaponSheet, 68, 40, 20, 18, 0.2, 1, true, false);
  this.key1 = new Animation(this.keySheet, 0, 0, 20, 21, 0.2, 1, true, false);
  this.key2 = new Animation(this.keySheet, 20, 0, 24, 24, 0.2, 1, true, false);
  this.key3 = new Animation(this.keySheet, 44, 0, 21, 20, 0.2, 1, true, false);
  this.key4 = new Animation(this.keySheet, 65, 0, 22, 24, 0.2, 1, true, false);

  this.whichKey = 1;

  this.boxes = false;

  this.pickedUp = false;
}

Key.prototype = new Entity();
Key.prototype.constructor = Key;

Key.prototype.collide = function (other) {
  return (this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.height + this.y > other.y);
};

Key.prototype.update = function () {
  if (!this.pickedUp && this.collide(this.game.hero)) {
    this.pickedUp = true;
    this.game.hero.keys.push(this);
  }

  if (this.pickedUp) {
    this.x = this.game.hero.x + 325;
    this.y = (this.game.hero.y - 225) + (this.whichKey * 40) ;
  }

  Entity.prototype.update.call(this);
};

Key.prototype.draw = function (ctx) {
  if (this.whichKey === 1)
    this.key1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.whichKey === 2)
    this.key2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.whichKey === 3)
    this.key3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.whichKey === 4)
    this.key4.drawFrame(this.game.clockTick, ctx, this.x, this.y);

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
