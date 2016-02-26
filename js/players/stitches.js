function Stitches(game, x, y) {
  var sheet = ASSET_MANAGER.getAsset("img/sheet2.png");
  var frameWidth = 33.3;
  var frameHeight = 32;
  Enemy.call(this, game, x, y, frameWidth, frameHeight, 200);

  this.animation = new Animation(sheet, 290, 0, frameWidth, frameHeight, 0.02, 1, true, false);

  this.downAnimation = new Animation(sheet, 290, 0, frameWidth, frameHeight, 0.2, 3, true, false);
  this.upAnimation = new Animation(sheet, 290, 96, frameWidth, frameHeight, 0.2, 3, true, false);
  this.leftAnimation = new Animation(sheet, 290, 32, frameWidth, frameHeight, 0.2, 3, true, false);
  this.rightAnimation = new Animation(sheet, 290, 64, frameWidth, frameHeight, 0.2, 3, true, false);
}

Stitches.prototype = new Enemy();
Stitches.prototype.constructor = Stitches;