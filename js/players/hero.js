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

  this.speed = 1.75;
  this.boxes = false;
  this.lives = 3;
  this.invincible = false;
  this.timeBeingInvincible = 0;
  this.num = 0;
  document.getElementById('lives').innerHTML = "Lives: " + this.lives;

  this.weapon = new Weapon(this.game, x - 7, y + 12);
  
  this.keys = [];
}

Hero.prototype = new Player();
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {

  if (this.invincible) {
    if (this.timeBeingInvincible < 1000) {
      this.timeBeingInvincible += 20;
      this.num++;
    } else {
      this.invincible = false;
      this.timeBeingInvincible = 0;
      this.speed = 1.75;
    }
  }

  if (this.game.j) {
    this.weapon.usingMelee = !this.weapon.usingMelee;
    setXYOffset(this.weapon);
    this.game.j = false;
  }

  if (this.game.a) {
    this.wleft = true;
    this.x -= this.speed;
    this.weapon.meleeWeaponFlipped = false;
    this.weapon.bowWeaponFlipped = false;
    this.weapon.x = this.x - this.weapon.weaponLeftoffset_x;
  } else {
    this.wleft = false;
  }

  if (this.game.w) {
    this.wbackward = true;
    this.y -= this.speed;

  } else
    this.wbackward = false;

  if (this.game.s) {
    this.wforward = true;
    this.y += this.speed;
  } else
    this.wforward = false;

  if (this.game.d) {
    this.wright = true;
    this.x += this.speed;
    this.weapon.meleeWeaponFlipped = true;
    this.weapon.bowWeaponFlipped = true;
    this.weapon.x = this.x + this.weapon.weaponRightOffset_x;
  } else {
    this.wright = false;
  }

  this.weapon.y = this.y + this.weapon.weaponoffset_y;

  if (this.game.k && this.weapon.meleeWeaponSlashTime > 0 && this.weapon.meleeWeaponTimeAfterSlash >= 1000) {
    this.weapon.meleeWeaponSlashing = true;
  } else {
    this.weapon.meleeWeaponSlashing = false;
    this.weapon.meleeWeaponTimeAfterSlash += 100;
    this.game.k = false;
  }

  if (this.weapon.meleeWeaponSlashing) {
    this.weapon.meleeWeaponSlashTime -= 100;
  } else if (!this.weapon.meleeWeaponSlashing && this.weapon.meleeWeaponTimeAfterSlash >= 1000) {
    this.weapon.meleeWeaponSlashTime = 1000;
  }

  if (!this.game.a && !this.game.w && !this.game.s && !this.game.d) {
    this.weapon.meleeWeaponFlipped = false;
    this.weapon.bowWeaponFlipped = false;
    this.weapon.x = this.x - this.weapon.weaponLeftoffset_x;
  }

  if (this.game.left && !this.weapon.usingMelee && this.weapon.bowTimeAfterShot >= this.weapon.bowTimeBetweenShots) {
    var arrow = new Arrow(this.game, this.weapon.x, this.weapon.y);
    arrow.shootLeft = true;
    setWidthHeight_arrow(arrow, 0);
    this.game.addEntity(arrow);
    this.weapon.bowTimeAfterShot = 0;
  }

  if (this.game.up && !this.weapon.usingMelee && this.weapon.bowTimeAfterShot >= this.weapon.bowTimeBetweenShots) {
    var arrow = new Arrow(this.game, this.weapon.x, this.weapon.y);
    arrow.shootUp = true;
    setWidthHeight_arrow(arrow, 1);
    this.game.addEntity(arrow);
    this.weapon.bowTimeAfterShot = 0;
  }

  if (this.game.down && !this.weapon.usingMelee && this.weapon.bowTimeAfterShot >= this.weapon.bowTimeBetweenShots) {
    var arrow = new Arrow(this.game, this.weapon.x, this.weapon.y);
    arrow.shootDown = true;
    setWidthHeight_arrow(arrow, 1);
    this.game.addEntity(arrow);
    this.weapon.bowTimeAfterShot = 0;
  }

  if (this.game.right && !this.weapon.usingMelee && this.weapon.bowTimeAfterShot >= this.weapon.bowTimeBetweenShots) {
    var arrow = new Arrow(this.game, this.weapon.x, this.weapon.y);
    arrow.shootRight = true;
    setWidthHeight_arrow(arrow, 0);
    this.game.addEntity(arrow);
    this.weapon.bowTimeAfterShot = 0;
  }

  var bounds = this.game.map.bounds;
  var feetX = this.x + this.width / 2;
  var feetY = this.y + this.height;

  if (feetX < bounds.x1)
    feetX = bounds.x1;
  if (feetY < bounds.y1)
    feetY = bounds.y1;
  if (feetX > bounds.x2)
    feetX = bounds.x2;
  if (feetY > bounds.y2)
    feetY = bounds.y2;

  this.x = feetX - this.width / 2;
  this.y = feetY - this.height;

  for (var i = 0; i < this.game.map.boundRects.length; i++) {
    var rect = this.game.map.boundRects[i];
    while (collideCircleWithRotatedRectangle({x: this.x + this.width / 2, y: this.y + this.height, radius: 5}, rect)) {
      if (rect.top)
        this.y++;
      if (rect.bottom)
        this.y--;
      if (rect.left)
        this.x++;
      if (rect.right)
        this.x--;
    }
  }


  for (var i = 0; i < this.game.enemies.length; i++) {
    var enemy = this.game.enemies[i];
    if (!this.invincible && !enemy.removeFromWorld && this.collide(enemy)) {
      this.lives = this.lives - 0.5;
      this.invincible = true;
      this.speed = 3;
      this.num++;
      document.getElementById('lives').innerHTML = "Lives: " + this.lives;
      if (this.lives <= 0) {
        this.removeFromWorld = true;
        this.weapon.removeFromWorld = true;
        enemy.seesHero = false;
        if (enemy.x !== enemy.startingX && enemy.y !== enemy.startingY) {
          enemy.walkTowardX = enemy.startingX;
          enemy.walkTowardY = enemy.startingY;
          enemy.atStarting = false;
        }
      }
    } else if (this.canSee(enemy)) {
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
}
;


//from https://gist.github.com/snorpey/8134c248296649433de2 
function collideCircleWithRotatedRectangle(circle, rect) {

  var rectCenterX = rect.x;
  var rectCenterY = rect.y;


  var rectX = rectCenterX - rect.width / 2;
  var rectY = rectCenterY - rect.height / 2;


  var rectReferenceX = rectX;
  var rectReferenceY = rectY;

  // Rotate circle's center point back 
  var unrotatedCircleX = Math.cos(rect.rotation) * (circle.x - rectCenterX) - Math.sin(rect.rotation) * (circle.y - rectCenterY) + rectCenterX;
  var unrotatedCircleY = Math.sin(rect.rotation) * (circle.x - rectCenterX) + Math.cos(rect.rotation) * (circle.y - rectCenterY) + rectCenterY;


  // Closest point in the rectangle to the center of circle rotated backwards(unrotated) 
  var closestX, closestY;


  // Find the unrotated closest x point from center of unrotated circle 
  if (unrotatedCircleX < rectReferenceX) {
    closestX = rectReferenceX;
  } else if (unrotatedCircleX > rectReferenceX + rect.width) {
    closestX = rectReferenceX + rect.width;
  } else {
    closestX = unrotatedCircleX;
  }

  // Find the unrotated closest y point from center of unrotated circle 
  if (unrotatedCircleY < rectReferenceY) {
    closestY = rectReferenceY;
  } else if (unrotatedCircleY > rectReferenceY + rect.height) {
    closestY = rectReferenceY + rect.height;
  } else {
    closestY = unrotatedCircleY;
  }

  // Determine collision 
  var collision = false;
  var distance = getDistance(unrotatedCircleX, unrotatedCircleY, closestX, closestY);

  if (distance < circle.radius) {
    collision = true;
  } else {
    collision = false;
  }
  return collision;
}
function getDistance(fromX, fromY, toX, toY) {
  var dX = Math.abs(fromX - toX);
  var dY = Math.abs(fromY - toY);


  return Math.sqrt((dX * dX) + (dY * dY));
}






function setWidthHeight_arrow(arrow, which) {
  if (!which) { //0 if arrow left or arrow right
    arrow.width = 32;
    arrow.height = 11;
  } else { //1 if arrow down or arrow up
    arrow.width = 11;
    arrow.height = 29;
  }
}

function Arrow(game, x, y) {
  Entity.call(this, game, x, y);
  this.x = x;
  this.y = y;
  this.arrowSheet = ASSET_MANAGER.getAsset("img/arrow.png");

  this.arrowLeft = new Animation(this.arrowSheet, 0, 4, 32, 11, 0.2, 1, true, false);
  this.arrowDown = new Animation(this.arrowSheet, 38, 0, 11, 29, 0.2, 1, true, false);
  this.arrowUp = new Animation(this.arrowSheet, 53, 0, 11, 29, 0.2, 1, true, false);
  this.arrowRight = new Animation(this.arrowSheet, 71, 10, 32, 11, 0.2, 1, true, false);

  this.shootLeft = false;
  this.shootDown = false;
  this.shootUp = false;
  this.shootRight = false;
  this.timeShot = 0;


  this.boxes = false;
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;


Arrow.prototype.collide = function (other) {
  return (this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.height + this.y > other.y);
}

Arrow.prototype.update = function () {
  this.timeShot += 20;

  for (var i = 0; i < this.game.enemies.length; i++) {
    var enemy = this.game.enemies[i];
    if (this.collide(enemy) && !enemy.removeFromWorld) {
      enemy.hitpoints -= subtractDamage(this.game.hero.weapon);
      if (enemy.hitpoints <= 0)
        enemy.removeFromWorld = true;
      this.removeFromWorld = true;
      this.shootLeft = false;
      this.shootDown = false;
      this.shootUp = false;
      this.shootRight = false;
    }
  }

  if (this.timeShot >= 2000) {
    this.removeFromWorld = true;
  }

  if (this.shootLeft)
    this.x = this.x - 4;
  else if (this.shootDown)
    this.y = this.y + 4;
  else if (this.shootUp)
    this.y = this.y - 4;
  else if (this.shootRight)
    this.x = this.x + 4;

//  if (this.shootLeft || this.shootDown || this.shootUp || this.shootRight)
//    this.game.hero.weapon.bowTimeAfterShot += 20;

  Entity.prototype.update.call(this);
};

Arrow.prototype.draw = function (ctx) {
  if (this.shootLeft)
    this.arrowLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootDown)
    this.arrowDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootUp)
    this.arrowUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  else if (this.shootRight)
    this.arrowRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);

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

function setWidthHeight(weapon) {
  if (weapon.usingMelee) {
    if (weapon.meleeWeaponLevel === 0) {
      weapon.width = 20;
      weapon.height = 18;
    } else if (weapon.meleeWeaponLevel === 1 || weapon.meleeWeaponLevel === 2) {
      weapon.width = 28;
      weapon.height = 25;
    }
  } else {
    if (weapon.bowWeaponLevel === 0 || weapon.bowWeaponLevel === 1 || weapon.bowWeaponLevel === 2) {
      weapon.width = 25;
      weapon.height = 25;
    }
  }
}
;

function setXYOffset(weapon) {
  if (weapon.usingMelee) {
    if (weapon.meleeWeaponLevel === 0) {
      weapon.weaponRightOffset_x = 21;
      weapon.weaponLeftoffset_x = 7;
      weapon.weaponoffset_y = 12;
    } else if (weapon.meleeWeaponLevel === 1 || weapon.meleeWeaponLevel === 2) {
      weapon.weaponRightOffset_x = 21;
      weapon.weaponLeftoffset_x = 15;
      weapon.weaponoffset_y = 3;
    }
  } else {
    if (weapon.bowWeaponLevel === 0 || weapon.bowWeaponLevel === 1 || weapon.bowWeaponLevel === 2) {
      weapon.weaponRightOffset_x = 22;
      weapon.weaponLeftoffset_x = 2;
      weapon.weaponoffset_y = 7;
    }
  }
}

function Weapon(game, x, y) {
  Entity.call(this, game, x, y);
  this.x = x;
  this.y = y;
  this.weaponSheet = ASSET_MANAGER.getAsset("img/weaponsheet2.png");
  this.weaponSheetFlipped = ASSET_MANAGER.getAsset("img/weaponsheet2_flipped.png");
//  this.weaponSheet2 = ASSET_MANAGER.getAsset("img/weaponsheet1_flipped-rotated.png");
//  this.weaponSheet2Flipped = ASSET_MANAGER.getAsset("img/weaponsheet1_flipped-rotated_2.png");
  this.bowSheet = ASSET_MANAGER.getAsset("img/bows.png");

  this.meleeWeaponLeft_basic = new Animation(this.weaponSheet, 68, 40, 20, 18, 0.2, 1, true, false);
  this.meleeWeaponRight_basic = new Animation(this.weaponSheetFlipped, 296, 40, 20, 18, 0.2, 1, true, false);
  this.meleeBasic_Damage = 40;
  this.meleeWeaponLeft_middle = new Animation(this.weaponSheet, 0, 163, 28, 25, 0.2, 1, true, false);
  this.meleeWeaponRight_middle = new Animation(this.weaponSheetFlipped, 356, 163, 28, 25, 0.2, 1, true, false);
  this.meleeMiddle_Damage = 50;
  this.meleeWeaponLeft_best = new Animation(this.weaponSheet, 33, 163, 28, 25, 0.2, 1, true, false);
  this.meleeWeaponRight_best = new Animation(this.weaponSheetFlipped, 323, 163, 28, 25, 0.2, 1, true, false);
  this.meleeBest_Damage = 70;
  this.meleeWeaponFlipped = false;
  this.meleeWeaponSlashing = false;
  this.meleeWeaponSlashTime = 1000;
  this.meleeWeaponTimeAfterSlash = 0;
  this.meleeWeaponLevel = 0; //if 0: basic, if 1: middle, if 2: best

  this.bowWeaponLeft_basic = new Animation(this.bowSheet, 1, 2, 13, 33, 0.2, 1, true, false);
  this.bowWeaponRight_basic = new Animation(this.bowSheet, 18, 2, 13, 33, 0.2, 1, true, false);
  this.bowBasic_Damage = 20;
  this.bowWeaponLeft_middle = new Animation(this.bowSheet, 36, 0, 16, 36, 0.2, 1, true, false);
  this.bowWeaponRight_middle = new Animation(this.bowSheet, 54, 0, 16, 36, 0.2, 1, true, false);
  this.bowMiddle_Damage = 30;
  this.bowWeaponLeft_best = new Animation(this.bowSheet, 72, 3, 15, 32, 0.2, 1, true, false);
  this.bowWeaponRight_best = new Animation(this.bowSheet, 90, 4, 15, 32, 0.2, 1, true, false);
  this.bowBest_Damage = 50;
  this.bowWeaponFlipped = false;
  this.bowWeaponShooting = false;
  this.bowWeaponLevel = 0; //if 0: basic, if 1: middle, if 2: best
  this.bowTimeBetweenShots = 1000;
  this.bowTimeAfterShot = 1000;

  this.weaponRightOffset_x = 21;
  this.weaponLeftoffset_x = 7;
  this.weaponoffset_y = 12;

  this.usingMelee = true;

  this.boxes = false;

  this.pickedUp = true;
  setWidthHeight(this);
}

Weapon.prototype = new Entity();
Weapon.prototype.constructor = Weapon;

Weapon.prototype.collide = function (other) {
  return (this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.height + this.y > other.y);
}

Weapon.prototype.update = function () {
  if (!this.pickedUp && this.collide(this.game.hero)) {
    this.pickedUp = true;
    if (this.usingMelee)
      this.game.hero.weapon.meleeWeaponLevel = this.meleeWeaponLevel;
    else
      this.game.hero.weapon.bowWeaponLevel = this.bowWeaponLevel;
    setWidthHeight(this.game.hero.weapon);
    setXYOffset(this.game.hero.weapon);
    this.removeFromWorld = true;
  } else if (this.usingMelee && this.pickedUp) { //&& this.meleeWeaponSlashing) {
    for (var i = 0; i < this.game.enemies.length; i++) {
      var enemy = this.game.enemies[i];
      if (enemy.canBeHit && this.collide(enemy) && this.meleeWeaponSlashing) {
        console.log(enemy.hitpoints);
        enemy.canBeHit = 0;
        enemy.hitpoints -= subtractDamage(this);
        if (enemy.hitpoints <= 0)
          enemy.removeFromWorld = true;
      } else if (!this.meleeWeaponSlashing) {
        enemy.canBeHit = 1;
      }
    }
  }

  this.bowTimeAfterShot += 25;
  Entity.prototype.update.call(this);
};

function subtractDamage(weapon) {
  if (weapon.usingMelee) {
    if (weapon.meleeWeaponLevel === 0)
      return weapon.meleeBasic_Damage;
    else if (weapon.meleeWeaponLevel === 1)
      return weapon.meleeMiddle_Damage;
    else
      return weapon.meleeBest_Damage;
  } else {
    if (weapon.bowWeaponLevel === 0)
      return weapon.bowBasic_Damage;
    else if (weapon.bowWeaponLevel === 1)
      return weapon.bowMiddle_Damage;
    else
      return weapon.bowBest_Damage;
  }
}

function drawWhichWeapon(weapon, flipped, ctx, display) {
  if (weapon.usingMelee) {
    if (weapon.meleeWeaponLevel === 0) {
      if (display) {
        weapon.meleeWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.meleeWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.meleeWeaponLeft_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    } else if (weapon.meleeWeaponLevel === 1) {
      if (display) {
        weapon.meleeWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.meleeWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.meleeWeaponLeft_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    } else if (weapon.meleeWeaponLevel === 2) {
      if (display) {
        weapon.meleeWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.meleeWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.meleeWeaponLeft_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    }
  } else {
    if (weapon.bowWeaponLevel === 0) {
      if (display) {
        weapon.bowWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.bowWeaponRight_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.bowWeaponLeft_basic.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    } else if (weapon.bowWeaponLevel === 1) {
      if (display) {
        weapon.bowWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.bowWeaponRight_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.bowWeaponLeft_middle.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    } else if (weapon.bowWeaponLevel === 2) {
      if (display) {
        weapon.bowWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.game.hero.x + 325, weapon.game.hero.y - 230);
      } else if (flipped)
        weapon.bowWeaponRight_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
      else
        weapon.bowWeaponLeft_best.drawFrame(weapon.game.clockTick, ctx, weapon.x, weapon.y);
    }
  }
}

Weapon.prototype.draw = function (ctx) {
  if (this.usingMelee) {
    if (!this.pickedUp) {
      drawWhichWeapon(this, false, ctx, 0);
    } else if (!this.meleeWeaponFlipped && this.meleeWeaponSlashing) {
      drawWhichWeapon(this, false, ctx, 0);
    } else if (this.pickedUp && this.meleeWeaponFlipped && this.meleeWeaponSlashing) {
      drawWhichWeapon(this, true, ctx, 0);
    }
    if (this.pickedUp) {
      drawWhichWeapon(this, false, ctx, 1);
    }
  } else {
    if (this.bowWeaponFlipped)
      drawWhichWeapon(this, true, ctx, 0);
    else
      drawWhichWeapon(this, false, ctx, 0);
    if (this.pickedUp) {
      drawWhichWeapon(this, false, ctx, 1);
    }
  }
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