function Skeleton(game, x, y) {
  var sheet = ASSET_MANAGER.getAsset("img/sheet2.png");
  var frameWidth = 33.3;
  var frameHeight = 32;
  Enemy.call(this, game, x, y, frameWidth, frameHeight, 200);

  this.animation = new Animation(sheet, 192, 128, frameWidth, frameHeight, 0.02, 1, true, false);

  this.forwardAnimation = new Animation(sheet, 192, 128, frameWidth, frameHeight, 0.2, 3, true, false);
  this.backwardAnimation = new Animation(sheet, 190, 224, frameWidth, frameHeight, 0.2, 3, true, false);
  this.leftAnimation = new Animation(sheet, 190, 160, frameWidth, frameHeight, 0.2, 3, true, false);
  this.rightAnimation = new Animation(sheet, 190, 192, frameWidth, frameHeight, 0.2, 3, true, false);
}

Skeleton.prototype = new Enemy();
Skeleton.prototype.constructor = Skeleton;