function Heart(game, x, y) {
    Entity.call(this, game, x, y);
    this.x = x;
    this.y = y;
    this.width = 15.5;
    this.height = 14.5;
    this.heartSheet = ASSET_MANAGER.getAsset("img/heartspritesheet.png");

    this.animation = new Animation(this.heartSheet, 0, 58, 62, 58, 0.2, 1, true, false);

    this.boxes = false;
    this.pickedUp = false;
}

Heart.prototype = new Item();
Heart.prototype.constructor = Heart;

Heart.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.25);

    if (this.boxes) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    Entity.prototype.draw.call(this);
};