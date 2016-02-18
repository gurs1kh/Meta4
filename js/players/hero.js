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
    this.speed = 2;
	
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
	
	var bounds = this.game.map.bounds;
	var feetX = this.x + this.width / 2;
	var feetY = this.y + this.height;
	
	if (feetX < bounds.x1) feetX = bounds.x1;
	if (feetY < bounds.y1) feetY = bounds.y1;
	if (feetX > bounds.x2) feetX = bounds.x2;
	if (feetY > bounds.y2) feetY = bounds.y2;
    
	this.x = feetX - this.width / 2;
	this.y = feetY - this.height;
	
	for (var i = 0; i < this.game.map.boundRects.length; i++) {
		var rect = this.game.map.boundRects[i];
		while (collideCircleWithRotatedRectangle({x:this.x + this.width / 2, y:this.y + this.height, radius:5}, rect)) {
			if (rect.top) this.y++;
			if (rect.bottom) this.y--;
			if (rect.left) this.x++;
			if (rect.right) this.x--;
		}
	}
	
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


//from http://jsfiddle.net/justin_c_rounds/Gd2S2/
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

//from https://gist.github.com/snorpey/8134c248296649433de2
function collideCircleWithRotatedRectangle ( circle, rect ) {
	
	var rectCenterX = rect.x;
	var rectCenterY = rect.y;

	var rectX = rectCenterX - rect.width / 2;
	var rectY = rectCenterY - rect.height / 2;

	var rectReferenceX = rectX;
	var rectReferenceY = rectY;
	
	// Rotate circle's center point back
	var unrotatedCircleX = Math.cos( rect.rotation ) * ( circle.x - rectCenterX ) - Math.sin( rect.rotation ) * ( circle.y - rectCenterY ) + rectCenterX;
	var unrotatedCircleY = Math.sin( rect.rotation ) * ( circle.x - rectCenterX ) + Math.cos( rect.rotation ) * ( circle.y - rectCenterY ) + rectCenterY;

	// Closest point in the rectangle to the center of circle rotated backwards(unrotated)
	var closestX, closestY;

	// Find the unrotated closest x point from center of unrotated circle
	if ( unrotatedCircleX < rectReferenceX ) {
		closestX = rectReferenceX;
	} else if ( unrotatedCircleX > rectReferenceX + rect.width ) {
		closestX = rectReferenceX + rect.width;
	} else {
		closestX = unrotatedCircleX;
	}
 
	// Find the unrotated closest y point from center of unrotated circle
	if ( unrotatedCircleY < rectReferenceY ) {
		closestY = rectReferenceY;
	} else if ( unrotatedCircleY > rectReferenceY + rect.height ) {
		closestY = rectReferenceY + rect.height;
	} else {
		closestY = unrotatedCircleY;
	}
 
	// Determine collision
	var collision = false;
	var distance = getDistance( unrotatedCircleX, unrotatedCircleY, closestX, closestY );
	
	if ( distance < circle.radius ) {
		collision = true;
	}
	else {
		collision = false;
	}

	return collision;
}
function getDistance( fromX, fromY, toX, toY ) {
	var dX = Math.abs( fromX - toX );
	var dY = Math.abs( fromY - toY );

	return Math.sqrt( ( dX * dX ) + ( dY * dY ) );
}
