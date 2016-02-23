/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function PlaceEnemies(game, numBasics, numHumans, numTombs, numUndeads, numGoblins, numDarks) {
  PlaceEnemies_Basic(game, numBasics);
  PlaceEnemies_Human(game, numHumans);
  PlaceEnemies_Tomb(game, numTombs);
  PlaceEnemies_Undead(game, numUndeads);
  PlaceEnemies_Goblin(game, numGoblins);
  PlaceEnemies_Dark(game, numDarks);

}

function PlaceEnemies_Basic(game, numBasics) {

  numBasics = numBasics / 4;
  
  PlaceEnemies_BasicLocation(game, numBasics, 1950, 4450, 4500, 6050); //Bottom
  PlaceEnemies_BasicLocation(game, numBasics, 1950, 4450, 350, 2300); //Top
  PlaceEnemies_BasicLocation(game, numBasics, 350, 2300, 1950, 4450); //Left
  PlaceEnemies_BasicLocation(game, numBasics, 4100, 6050, 1950, 4450); //Right

}

function PlaceEnemies_BasicLocation(game, numBasics, XMin, XMax, YMin, YMax) {
  for (var i = 0; i < numBasics; i++) {
    var location = getLocation(game, XMin, XMax, YMin, YMax);
    var basic;
    var which = getRandomNumber(0, 2);
    if (which === 0)
      basic = new Dog(game, location.x, location.y);
    else if (which === 1)
      basic = new BlackRat(game, location.x, location.y);
    else if (which === 2)
      basic = new BrownRat(game, location.x, location.y);
    game.enemies.push(basic);
    game.addEntity(basic);
  }   
  
}

function PlaceEnemies_Human(game, numHumans) {
  var blackKnight = new BlackKnight(game, 5820, 500);
  game.enemies.push(blackKnight);
  game.addEntity(blackKnight);

  for (var i = 0; i < numHumans; i++) {
    var location = getLocation(game, 400, 1900, 350, 1910);
    var human;
    var which = getRandomNumber(0, 2);
    if (which === 0)
      human = new Stitches(game, location.x, location.y);
    else if (which === 1)
      human = new Eyepatch(game, location.x, location.y);
    else if (which === 2)
      human = new Viking(game, location.x, location.y);
    game.enemies.push(human);
    game.addEntity(human);
  }

}

function PlaceEnemies_Tomb(game, numTombs) {
  var skeletonKing = new SkeletonKing(game, 500, 5900);
  game.enemies.push(skeletonKing);
  game.addEntity(skeletonKing);

  for (var i = 0; i < numTombs; i++) {
    var location = getLocation(game, 400, 1900, 4475, 6040);
    var tomb;
    var which = getRandomNumber(0, 1);
    if (!which)
      tomb = new Skeleton(game, location.x, location.y);
    else
      tomb = new Mummy(game, location.x, location.y);
    game.enemies.push(tomb);
    game.addEntity(tomb);
  }

}

function PlaceEnemies_Undead(game, numUndeads) {
  var death = new Death(game, 5820, 500);
  game.enemies.push(death);
  game.addEntity(death);

  for (var i = 0; i < numUndeads; i++) {
    var location = getLocation(game, 4475, 6040, 350, 1910);
    var undead;
    var which = getRandomNumber(0, 2);
    if (which === 0)
      undead = new SuitZombie(game, location.x, location.y);
    else if (which === 1)
      undead = new BlondeZombie(game, location.x, location.y);
    else if (which === 2)
      undead = new SuburbanZombie(game, location.x, location.y);
    game.enemies.push(undead);
    game.addEntity(undead);
  }

}

function PlaceEnemies_Goblin(game, numGoblins) {
  var armoredGoblin = new ArmoredGoblin(game, 5820, 5900);
  game.enemies.push(armoredGoblin);
  game.addEntity(armoredGoblin);

  for (var i = 0; i < numGoblins; i++) {
    var location = getLocation(game, 4475, 6040, 4475, 6040);
    var goblin;
    var which = getRandomNumber(0, 1);
    if (!which)
      goblin = new WizardGoblin(game, location.x, location.y);
    else
      goblin = new HelmetGoblin(game, location.x, location.y);
    game.enemies.push(goblin);
    game.addEntity(goblin);
  }

}

function PlaceEnemies_Dark(game, numDarks) {


}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1.0)) + min;
}

function getLocation(game, XMin, XMax, YMin, YMax) {
  var Location = {};
  var newX = true;
  var newY = true;
  while (1) {
      if (newX)
        Location.x = getRandomNumber(XMin, XMax);
      if (newY)
        Location.y = getRandomNumber(YMin, YMax);
      newX = false;
      newY = false;
      for (var j = 0; j < game.enemies.length; j++) {
        if (Math.abs(game.enemies[j].x - Location.x) <= 100) 
          newX = true;
        if (Math.abs(game.enemies[j].y - Location.y) <= 100) 
          newY = true;
      }
      if (!newX && !newY)
        break;
    }
  
  return Location;
}
