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

Hero.prototype.update = function() {
  
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

Hero.prototype.draw = function(ctx) {
  
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