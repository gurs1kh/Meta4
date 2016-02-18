function Map(game) {
	Entity.call(this, game, 0, 0);
	this.sheet = ASSET_MANAGER.getAsset("img/META4map.gif");
	this.bounds = {x1:335, y1:335, x2:6065, y2:6065}
	// this.boundLines = [	{x1:330, y1:315, x2:330, y2:6085, left:true},
						// {x1:325, y1:6070, x2:6075, y2:6070, bottom:true},
						// {x1:6070, y1:6075, x2:6070, y2:325, right:true},
						// {x1:6085, y1:330, x2:315, y2:330, top:true},
						
						// {x1:2670, y1:2326, x2:2328, y2:2671, bottom:true, right:true},
						// {x1:2328, y1:2671, x2:2328, y2:3728, right:true},
						// {x1:2328, y1:3728, x2:2673, y2:4073, top:true, right:true},
						// {x1:2673, y1:4073, x2:3186, y2:4073, top:true},
						// {x1:3186, y1:4073, x2:3186, y2:3912, left:true},
						// {x1:3186, y1:3912, x2:2467, y2:3195, bottom:true, left:true},
						// {x1:2467, y1:3205, x2:3200, y2:2474, top:true, left:true},
						// {x1:3200, y1:2474, x2:3929, y2:3200, top:true, right:true},
						// {x1:3929, y1:3200, x2:3212, y2:3912, bottom:true, right:true},
						// {x1:3212, y1:3912, x2:3212, y2:4071, right:true},
						// {x1:3212, y1:4071, x2:3732, y2:4071, top:true},
						// {x1:3732, y1:4071, x2:4074, y2:3729, top:true, left:true},
						// {x1:4074, y1:3729, x2:4074, y2:2670, left:true},
						// {x1:4074, y1:2670, x2:3731, y2:2326, bottom:true, left:true},
						// {x1:3731, y1:2326, x2:2670, y2:2326, bottom:true},
					  // ];
					  
	this.boundRects = [ {x:2600, y:2600, width:490, height:280, rotation:Math.PI/4, bottom:true, right:true},
						{x:2600, y:3800, width:490, height:280, rotation:3 * Math.PI/4, top:true, right:true},
						{x:3800, y:3800, width:490, height:280, rotation:5 * Math.PI/4, top:true, left:true},
						{x:3800, y:2600, width:490, height:280, rotation:7 * Math.PI/4, bottom:true, left:true},
						
						{x:3200, y:2380, width:1060, height:100, rotation:0, bottom:true},
						{x:2380, y:3200, width:100, height:1060, rotation:0, right:true},
						{x:4020, y:3200, width:100, height:1060, rotation:0, left:true},
						{x:2925, y:4025, width:500, height:100, rotation:0, top:true},
						{x:3475, y:4025, width:500, height:100, rotation:0, top:true},
						
						{x:2800, y:2800, width:1090, height:100, rotation:Math.PI/4, top:true, left:true},
						{x:3600, y:2800, width:1090, height:100, rotation:7 * Math.PI/4, top:true, right:true},
						
						{x:2760, y:3560, width:1090, height:100, rotation:3 * Math.PI/4, bottom:true, left:true},
						{x:3640, y:3560, width:1090, height:100, rotation:5 * Math.PI/4, bottom:true, right:true},
						
						{x:3150, y:3990, width:70, height:165, rotation:0, left:true},
						{x:3250, y:3990, width:70, height:165, rotation:0, right:true},
						
						{x:3180, y:4075, width:10, height:5, rotation:0, top:true, left:true},
						{x:3220, y:4075, width:10, height:5, rotation:0, top:true, right:true},
					  ];
	
	this.debug = false;
	
	if (this.debug) {
		for (var i = 0; i < this.boundRects.length; i++) {
			this.boundRects[i].color =
				"rgb(" + Math.round(Math.random() * 255) + ", "
					   + Math.round(Math.random() * 255) + ", "
					   + Math.round(Math.random() * 255) + ")";
		}
	}
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.draw = function(ctx) {
	ctx.drawImage(this.sheet,
				  0, 0,
				  6400, 6400,
				  0, 0, 6400, 6400);
	// ctx.beginPath();
	// for (var i = 0; i < this.boundLines.length; i++) {
		// ctx.moveTo(this.boundLines[i].x1, this.boundLines[i].y1);
		// ctx.lineTo(this.boundLines[i].x2, this.boundLines[i].y2);
	// }
	// ctx.stroke();
	
	if (this.debug) {
		for (var i = 0; i < this.boundRects.length; i++) {
			var rect = this.boundRects[i];
			ctx.save();
			ctx.translate(rect.x, rect.y);
			ctx.fillStyle = rect.color;
			ctx.rotate(-rect.rotation);	
			ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
			ctx.restore();
		}
	}
}