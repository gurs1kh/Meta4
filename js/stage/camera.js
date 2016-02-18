function Camera(game, width, height) {
  Entity.call(this, game, game.hero.x || 0, game.hero.y || 0);
  this.width = width;
  this.height = height;
}


Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;


Camera.prototype.update = function () {
  this.x = this.game.hero.x + this.game.hero.width / 2;
  this.y = this.game.hero.y + this.game.hero.height / 2;
};
