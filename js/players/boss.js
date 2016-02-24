function Boss(game, x, y, frameWidth, frameHeight) {
  Enemy.call(this, game, x, y, frameWidth, frameHeight);

}

Boss.prototype = new Enemy();
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {
  Enemy.prototype.update.call(this);
  
  if (this.removeFromWorld) {
    var key = new Key(this.game, this.x, this.y, this.game.hero.keys.length);
    this.game.addEntity(key);
  }
  
  Entity.prototype.update.call(this);
}