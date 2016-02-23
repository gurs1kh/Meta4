function Eyepatch(game, x, y) {
 var sheet = ASSET_MANAGER.getAsset("img/sheet4.png");
 var frameWidth = 32;
 var frameHeight = 32;
 Enemy.call(this, game, x, y, frameWidth, frameHeight, 200);

 this.animation = new Animation(sheet, 0, 128, frameWidth, frameHeight, 0.02, 1, true, false);

 this.forwardAnimation = new Animation(sheet, 0, 128, frameWidth, frameHeight, 0.2, 3, true, false);
 this.backwardAnimation = new Animation(sheet, 0, 224, frameWidth, frameHeight, 0.2, 3, true, false);
 this.leftAnimation = new Animation(sheet, 0, 160, frameWidth, frameHeight, 0.2, 3, true, false);
 this.rightAnimation = new Animation(sheet, 0, 192, frameWidth, frameHeight, 0.2, 3, true, false);
}

Eyepatch.prototype = new Enemy();
Eyepatch.prototype.constructor = Eyepatch;