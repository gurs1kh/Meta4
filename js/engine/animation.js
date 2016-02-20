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

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
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

	var locX = x;
	var locY = y;
	var drawW = Math.min(this.frameWidth * scaleBy, ctx.canvas.width);
	var drawH = Math.min(this.frameHeight * scaleBy, ctx.canvas.height);
	var cropW = drawW / scaleBy;
	var cropH = drawH / scaleBy;
	ctx.drawImage(this.spriteSheet,
		index * this.frameWidth + this.startX,
		this.startY,
		cropW, cropH,
		locX, locY, drawW, drawH);
}

Animation.prototype.currentFrame = function() {
	return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
	return (this.elapsedTime >= this.totalTime);
}