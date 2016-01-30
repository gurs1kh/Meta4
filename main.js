function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
//    ctx.fillStyle = "SaddleBrown";
//    ctx.fillRect(0,500,800,300);
//    Entity.prototype.draw.call(this);
}

function Goblin(game) {
  
    this.animation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet2.png"), 94, 128, 33.3, 32, 0.02, 1, true, false);
    
    this.forwardAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet2.png"), 94, 128, 33.3, 32, 0.2, 3, true, false);
    this.backwardAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet2.png"), 94.5, 224, 33.3, 32, 0.2, 3, true, false);
    this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet2.png"), 94, 160, 33.3, 32, 0.2, 3, true, false);
    this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet2.png"), 94, 192, 33.3, 32, 0.2, 3, true, false);
    
    this.wforward = false;
    this.wbackward = false;
    this.wleft = false;
    this.wright = false;
    
    this.radius = 100;
    this.ground = 400;
    this.x = 400;
    this.y = 400;
    Entity.call(this, game, this.x, this.y);
}

Goblin.prototype = new Entity();
Goblin.prototype.constructor = Goblin;

Goblin.prototype.update = function () {
  
    if (this.game.a) {
      this.wleft = true;
      this.x = this.x - 1.5;
    }
    else this.wleft = false;
    
    if (this.game.w) {
      this.wbackward = true;
      this.y = this.y - 1.5;
    }
    else this.wbackward = false;
    
    if (this.game.s) {
      this.wforward = true;
      this.y = this.y + 1.5;
    }
    else this.wforward = false;
    
    if (this.game.d) {
      this.wright = true;
      this.x = this.x + 1.5;
    }
    else this.wright = false;
    
    Entity.prototype.update.call(this);
}

Goblin.prototype.draw = function (ctx) {
  
    if (this.wforward) {
      this.forwardAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }
    else if (this.wbackward) {
      this.backwardAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }
    else if (this.wleft) {
      this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }    
    else if (this.wright) {
      this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("enemyPractice/public_html/img/sheet2.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var goblin = new Goblin(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(goblin);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
