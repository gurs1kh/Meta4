function Map(game) {
	Entity.call(this, game, 0, 400);
	this.sheet = ASSET_MANAGER.getAsset("img/META4map.gif");
	this.bounds = {x: 330, y: 330, width: 6070, height: 6070}
	this.boundLines = [	{x1:330, y1:315, x2:330, y2:6085, left:true},
						{x1:325, y1:6070, x2:6075, y2:6070, bottom:true},
						{x1:6070, y1:6075, x2:6070, y2:325, right:true},
						{x1:6085, y1:330, x2:315, y2:330, top:true},
						{x1:320, y1:350, x2:350, y2:320, top:true, left:true},
						
						{x1:2670, y1:2326, x2:2328, y2:2671, bottom:true, right:true},
						{x1:2328, y1:2671, x2:2328, y2:3728, right:true},
						{x1:2328, y1:3728, x2:2673, y2:4073, top:true, right:true},
						{x1:2673, y1:4073, x2:3186, y2:4073, top:true},
						{x1:3186, y1:4073, x2:3186, y2:3912, left:true},
						{x1:3186, y1:3912, x2:2467, y2:3195, bottom:true, left:true},
						{x1:2467, y1:3205, x2:3200, y2:2474, top:true, left:true},
						{x1:3200, y1:2474, x2:3929, y2:3200, top:true, right:true},
						{x1:3929, y1:3200, x2:3212, y2:3912, bottom:true, right:true},
						{x1:3212, y1:3912, x2:3212, y2:4071, right:true},
						{x1:3212, y1:4071, x2:3732, y2:4071, top:true},
						{x1:3732, y1:4071, x2:4074, y2:3729, top:true, left:true},
						{x1:4074, y1:3729, x2:4074, y2:2670, left:true},
						{x1:4074, y1:2670, x2:3731, y2:2326, bottom:true, left:true},
						{x1:3731, y1:2326, x2:2670, y2:2326, bottom:true},
					  ];
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.draw = function(ctx) {
	ctx.drawImage(this.sheet,
				  0, 0,
				  6400, 6400,
				  0, 0, 6400, 6400);
	ctx.beginPath();
	for (var i = 0; i < this.boundLines.length; i++) {
		ctx.moveTo(this.boundLines[i].x1, this.boundLines[i].y1);
		ctx.lineTo(this.boundLines[i].x2, this.boundLines[i].y2);
	}
	ctx.stroke();
}