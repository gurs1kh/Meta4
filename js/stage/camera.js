function Camera(game) {
	Entity.call(this, game, 0, 400);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function() {
}

Camera.prototype.draw = function(ctx) {
	
}