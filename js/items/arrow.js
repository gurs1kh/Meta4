function Arrow(game, x, y) {
  Entity.call(this, game, x, y);
  this.x = x;
  this.y = y;
  this.arrowSheet = ASSET_MANAGER.getAsset("img/arrow.png");

  this.arrowLeft = new Animation(this.arrowSheet, 0, 4, 32, 11, 0.2, 1, true, false);
  this.arrowDown = new Animation(this.arrowSheet, 38, 0, 11, 29, 0.2, 1, true, false);
  this.arrowUp = new Animation(this.arrowSheet, 53, 0, 11, 29, 0.2, 1, true, false);
  this.arrowRight = new Animation(this.arrowSheet, 71, 10, 32, 11, 0.2, 1, true, false);

  this.shootLeft = false;
  this.shootDown = false;
  this.shootUp = false;
  this.shootRight = false;
  this.timeShot = 0;


  this.boxes = false;
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

function setWidthHeight_arrow(arrow, which) {
  if (!which) { //0 if arrow left or arrow right
    arrow.width = 32;
    arrow.height = 11;
  } else { //1 if arrow down or arrow up
    arrow.width = 11;
    arrow.height = 29;
  }
}


Arrow.prototype.collide = function (other) {
  return (this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.height + this.y > other.y);
}

Arrow.prototype.update = function () {
  this.timeShot += 20;

  for (var i = 0; i < this.game.enemies.length; i++) {
    var enemy = this.game.enemies[i];
    if (this.collide(enemy) && !enemy.removeFromWorld) {
      enemy.hitpoints -= subtractDamage(this.game.hero.weapon);
      if (enemy.hitpoints <= 0)
        enemy.removeFromWorld = true;
      this.removeFromWorld = true;
      this.shootLeft = false;
      this.shootDown = false;
      this.shootUp = false;
      this.shootRight = false;
    }
  }

  if (this.timeShot >= 2000) {
    this.removeFromWorld = true;
  }

  if (this.shootLeft)
    this.x = this.x - 4;
  else if (this.shootDown)
    this.y = this.y + 4;
  else if (this.shootUp)
    this.y = this.y - 4;
  else if (this.shootRight)
    this.x = this.x + 4;

//  if (this.shootLeft || this.shootDown || this.shootUp || this.shootRight)
//    this.game.hero.weapon.bowTimeAfterShot += 20;

  Entity.prototype.update.call(this);
};

Arrow.prototype.draw = function (ctx) {
  if (this.shootLeft)
    this.arrowLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootDown)
    this.arrowDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootUp)
    this.arrowUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootRight)
    this.arrowRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);

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