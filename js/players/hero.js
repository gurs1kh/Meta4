function Hero(game, x, y) {
	var sheet = ASSET_MANAGER.getAsset("img/sheet5.png");
	var frameWidth = 33.3;
	var frameHeight = 32; 
	Player.call(this, game, x, y, frameWidth, frameHeight, 200); 
	
    this.animation = new Animation(sheet, 94, 128, frameWidth, frameHeight, 0.02, 1, true, false);
    
    this.forwardAnimation = new Animation(sheet, 94, 128, frameWidth, frameHeight, 0.2, 3, true, false);
    this.backwardAnimation = new Animation(sheet, 94.5, 224, frameWidth, frameHeight, 0.2, 3, true, false);
    this.leftAnimation = new Animation(sheet, 94, 160, frameWidth, frameHeight, 0.2, 3, true, false);
    this.rightAnimation = new Animation(sheet, 94, 192, frameWidth, frameHeight, 0.2, 3, true, false);
    
    this.boxes = true;
}

Hero.prototype = new Player();
Hero.prototype.constructor = Hero;

Hero.prototype.update = function() {
    if (this.game.a) {
      this.wleft = true;
      this.x--;
    } 
    else this.wleft = false;
    
    if (this.game.w) {
      this.wbackward = true;
      this.y--;
    }
    else this.wbackward = false;
    
    if (this.game.s) {
      this.wforward = true;
      this.y++;
    }
    else this.wforward = false;
    
    if (this.game.d) {
      this.wright = true;
      this.x++;
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
      } else if(this.canSee(enemy)) {
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
      this.forwardAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    } else if (this.wbackward) {
      this.backwardAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.wleft) {
      this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.wright) {
      this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
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