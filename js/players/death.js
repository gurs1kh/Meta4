function Death(game, x, y) {
  var sheet = ASSET_MANAGER.getAsset("img/sheet6.png");
  var frameWidth = 32;
  var frameHeight = 32;
  Enemy.call(this, game, x, y, frameWidth, frameHeight, 200);

  this.animation = new Animation(sheet, 288, 0, frameWidth, frameHeight, 0.02, 1, true, false);

  this.forwardAnimation = new Animation(sheet, 288, 0, frameWidth, frameHeight, 0.2, 3, true, false);
  this.backwardAnimation = new Animation(sheet, 288, 96, frameWidth, frameHeight, 0.2, 3, true, false);
  this.leftAnimation = new Animation(sheet, 288, 32, frameWidth, frameHeight, 0.2, 3, true, false);
  this.rightAnimation = new Animation(sheet, 288, 64, frameWidth, frameHeight, 0.2, 3, true, false);
}

Death.prototype = new Enemy();
Death.prototype.constructor = Death;