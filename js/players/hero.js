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
    this.speed = 1;
	
	this.boxes = true;
}

Hero.prototype = new Player();
Hero.prototype.constructor = Hero;

Hero.prototype.update = function() {
    if (this.game.a) {
      this.wleft = true;
      this.x -= this.speed;
    } 
    else this.wleft = false;
    
    if (this.game.w) {
      this.wbackward = true;
      this.y -= this.speed;
    }
    else this.wbackward = false;
    
    if (this.game.s) {
      this.wforward = true;
      this.y += this.speed;
    }
    else this.wforward = false;
    
    if (this.game.d) {
      this.wright = true;
      this.x += this.speed;
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