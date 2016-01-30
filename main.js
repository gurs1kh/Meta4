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

function BoundingBox(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  
  this.left = x;
  this.top = y;
  this.right = this.left + width;
  this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (other) {
  if (this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top) {
    return true;
  }
  return false;
  
}

function ViewingCircle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}

ViewingCircle.prototype.collide = function (other) {
  //Check the distance from the center of the circle to the enemies four corners
  var distanceC1 = Math.sqrt(((other.left - this.x) * (other.left - this.x)) + ((other.top - this.y) * (other.top - this.y)));
  var distanceC2 = Math.sqrt(((other.right - this.x) * (other.right - this.x)) + ((other.top - this.y) * (other.top - this.y)));
  var distanceC3 = Math.sqrt(((other.left - this.x) * (other.left - this.x)) + ((other.bottom - this.y) * (other.bottom - this.y)));
  var distanceC4 = Math.sqrt(((other.right - this.x) * (other.right - this.x)) + ((other.bottom - this.y) * (other.bottom - this.y)));
  if (distanceC1 < this.radius || distanceC2 < this.radius || distanceC3 < this.radius || distanceC4 < this.radius) {
    return true;
  }
  return false;
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
    
    this.seesHero = false;
    this.atStarting = true;
    this.walkTowardX = 0;
    this.walkTowardY = 0;
    
    this.radius = 100;
    this.ground = 400;
    this.x = 200;
    this.y = 100;
    
    this.startingX = this.x;
    this.startingY = this.y;
    
    this.boxes = true;
    this.boundingBox = new BoundingBox(this.x + 5, this.y, this.animation.frameWidth + 8, this.animation.frameHeight + 15);
    
    Entity.call(this, game, this.x, this.y); 
}

Goblin.prototype = new Entity();
Goblin.prototype.constructor = Goblin;

Goblin.prototype.update = function () {
  this.wforward = false;
  this.wbackward = false;
  this.wleft = false;
  this.wright = false;
  //if the goblin is within the viewing circle
  if (this.seesHero || !this.atStarting) {
    //if the goblin and destination are on the same y axis
    if (this.walkTowardY === this.y) {
      //if the destination is to the left of the goblin
      if (this.walkTowardX < this.x) {
        this.wleft = true;
        this.x = this.x - 1;
        //if the destination is to the right of the goblin
      } else { 
        this.wright = true;
        this.x = this.x + 1;
      }
      //if the destination is below the goblin
    } else if (this.walkTowardY > this.y) {
      this.wforward = true;
      //if the destination and goblin are on the same x axis
      if (this.walkTowardX === this.x) {
        this.y = this.y + 1;
        //if the destination is to the left of the goblin
      } else if (this.walkTowardX < this.x) {
        this.y = this.y + .75;
        this.x = this.x - .75;
        //if the destination is to the right of the goblin
      } else {
        this.y = this.y + .75;
        this.x = this.x + .75;
      }
      //if the destination is above the goblin
    } else {
      this.wbackward = true;
      //if the destination and goblin are on the same x axis
      if (this.walkTowardX === this.x) {
        this.y = this.y - 1;
        //if the destination is to the left of the goblin
      } else if (this.walkTowardX < this.x) {
        this.y = this.y - .75;
        this.x = this.x - .75;
        //if the destination is to the right of the goblin
      } else {
        this.y = this.y - .75;
        this.x = this.x + .75;
      }
    }
  } 
  
  if ((this.startingX < this.x + 1 && this.startingX > this.x - 1) && (this.startingY < this.y + 1 && this.startingY > this.y - 1)) {
    this.atStarting = true;
    this.wforward = false;
    this.wbackward = false;
    this.wleft = false;
    this.wright = false;
  } 
  
  this.boundingBox = new BoundingBox(this.x + 5, this.y, this.animation.frameWidth + 8, this.animation.frameHeight + 15);
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
    if (this.boxes) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
    }

    Entity.prototype.draw.call(this);
}


function Hero(game) {
  
    this.animation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet5.png"), 94, 128, 33.3, 32, 0.02, 1, true, false);
    
    this.forwardAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet5.png"), 94, 128, 33.3, 32, 0.2, 3, true, false);
    this.backwardAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet5.png"), 94.5, 224, 33.3, 32, 0.2, 3, true, false);
    this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet5.png"), 94, 160, 33.3, 32, 0.2, 3, true, false);
    this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("enemyPractice/public_html/img/sheet5.png"), 94, 192, 33.3, 32, 0.2, 3, true, false);
    
    this.wforward = false;
    this.wbackward = false;
    this.wleft = false;
    this.wright = false;
    
    this.radius = 100;
    this.ground = 400;
    this.x = 400;
    this.y = 400;
    
    this.boxes = true;
    this.boundingBox = new BoundingBox(this.x + 5, this.y, this.animation.frameWidth + 8, this.animation.frameHeight + 15);
    
    this.viewingCircle = new ViewingCircle(this.boundingBox.x + this.boundingBox.width / 2, this.boundingBox.y + this.boundingBox.height / 2, 200);
    
    Entity.call(this, game, this.x, this.y);
}

Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
  
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
    
    for (var i = 0; i < this.game.enemies.length; i++) {
      var enemy = this.game.enemies[i];
      if(this.boundingBox.collide(enemy.boundingBox)) {
        this.removeFromWorld = true;
        enemy.seesHero = false;
        if (enemy.x !== enemy.startingX && enemy.y !== enemy.startingY) {
          enemy.walkTowardX = enemy.startingX;
          enemy.walkTowardY = enemy.startingY;
          enemy.atStarting = false;
        }
      }
      else if(this.viewingCircle.collide(enemy.boundingBox)) {
        enemy.seesHero = true;
        enemy.walkTowardX = this.x;
        enemy.walkTowardY = this.y;
      } else {
        enemy.seesHero = false;
        if (enemy.x !== enemy.startingX && enemy.y !== enemy.startingY) {
          enemy.walkTowardX = enemy.startingX;
          enemy.walkTowardY = enemy.startingY;
          enemy.atStarting = false;
        }
      }
    }
    
    this.boundingBox = new BoundingBox(this.x + 5, this.y, this.animation.frameWidth + 8, this.animation.frameHeight + 15);
    this.viewingCircle = new ViewingCircle(this.boundingBox.x + this.boundingBox.width / 2, this.boundingBox.y + this.boundingBox.height / 2, 200);
    Entity.prototype.update.call(this);
}

Hero.prototype.draw = function (ctx) {
  
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
    if (this.boxes) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
      ctx.strokeStyle = "green";
      ctx.beginPath()
      ctx.arc(this.viewingCircle.x, this.viewingCircle.y, this.viewingCircle.radius, 0, 2*Math.PI);
      ctx.stroke();
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/sheet2.png");
ASSET_MANAGER.queueDownload("img/sheet5.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var enemies = [];
    var bg = new Background(gameEngine);
    var hero = new Hero(gameEngine);
    var goblin = new Goblin(gameEngine);
    enemies.push(goblin);

    gameEngine.enemies = enemies;
    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    gameEngine.addEntity(goblin);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
