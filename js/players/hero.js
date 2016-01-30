function Hero(game, x, y) {
	Player.call(this, game, x, y, 34 * 1.5, 32 * 1.5, 200); 
	
	var sheet = ASSET_MANAGER.getAsset("img/sheet5.png");
    this.animation = new Animation(sheet, 94, 128, 33.3, 32, 0.02, 1, true, false);
    
    this.forwardAnimation = new Animation(sheet, 94, 128, 33.3, 32, 0.2, 3, true, false);
    this.backwardAnimation = new Animation(sheet, 94.5, 224, 33.3, 32, 0.2, 3, true, false);
    this.leftAnimation = new Animation(sheet, 94, 160, 33.3, 32, 0.2, 3, true, false);
    this.rightAnimation = new Animation(sheet, 94, 192, 33.3, 32, 0.2, 3, true, false);
    
    this.boxes = true;
}

Hero.prototype = new Player();
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
      if (this.collide(enemy)) {
        this.removeFromWorld = true;
        enemy.seesHero = false;
        if(enemy.x !== enemy.startingX && enemy.y !== enemy.startingY) {
          enemy.walkTowardX = enemy.startingX;
          enemy.walkTowardY = enemy.startingY;
          enemy.atStarting = false;
        }
      }
      else if(this.canSee(enemy)) {
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
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = "green";
      ctx.beginPath()
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.visualRadius, 0, 2*Math.PI);
      ctx.stroke();
    }
    Entity.prototype.draw.call(this);
}