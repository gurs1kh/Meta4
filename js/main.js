// the "main" code begins here
window.onload = function () {
  ASSET_MANAGER = new AssetManager();
  ASSET_MANAGER.queueDownload("img/sheet2.png");
  ASSET_MANAGER.queueDownload("img/sheet3.png");
  ASSET_MANAGER.queueDownload("img/sheet4.png");
  ASSET_MANAGER.queueDownload("img/sheet5.png");
  ASSET_MANAGER.queueDownload("img/sheet6.png");
  ASSET_MANAGER.queueDownload("img/sheet7.png");
  ASSET_MANAGER.queueDownload("img/META4map.gif");
  ASSET_MANAGER.queueDownload("img/weaponsheet2.png");
  ASSET_MANAGER.queueDownload("img/arrow.png");
  ASSET_MANAGER.queueDownload("img/bows.png");
  ASSET_MANAGER.queueDownload("img/keys.png");
  ASSET_MANAGER.queueDownload("img/gate.png");
  ASSET_MANAGER.queueDownload("img/heartspritesheet.png");

  ASSET_MANAGER.downloadAll(function () {
    //	console.log("starting up da shield");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    //	ctx.scale(1.5, 1.5);

    game = new GameEngine();
    var enemies = [];
    game.map = new Map(game);
    game.hero = new Hero(game, 3180, 4100);
    game.camera = new Camera(game, canvas.width, canvas.height);
    game.playerInfo = new PlayerInfo(game);
//    var goblin = new ArmoredGoblin(game, 2900, 4100);

//    enemies.push(goblin);
    console.log(game.hero);
    game.enemies = enemies;
    game.addEntity(game.map);
    game.addEntity(game.hero);
    // game.addEntity(game.hero.weapon);
//    game.addEntity(goblin);
    game.addEntity(game.camera);
    game.addEntity(game.playerInfo);

    game.addEntity(new MeleeWeapon2(game, 3300, 4150));
    game.addEntity(new MeleeWeapon3(game, 3400, 4150));

    game.addEntity(new Bow2(game, 3500, 4150));
    game.addEntity(new Bow3(game, 3600, 4150));

    game.addEntity(new Key(game, 3300, 4300, 0));
    game.addEntity(new Key(game, 3400, 4300, 1));
    game.addEntity(new Key(game, 3500, 4300, 2));
    game.addEntity(new Key(game, 3600, 4300, 3));

    this.gate = new Gate(game, 3170, 4010);
    game.addEntity(this.gate);
    
   PlaceEnemies_Goblin(game, 10);
   // PlaceEnemies_Tomb(game, 10);
    // PlaceEnemies_Undead(game, 10);
     // PlaceEnemies_Basic(game, 10);
     // PlaceEnemies_Human(game, 10);

    var blackKnight = new BlackKnight(game, 2900, 4300);
    enemies.push(blackKnight);
    game.addEntity(blackKnight);

    var blackRat = new BlackRat(game, 2900, 4500);
    enemies.push(blackRat);
    game.addEntity(blackRat);

    var blondeZombie = new BlondeZombie(game, 2900, 4700);
    enemies.push(blondeZombie);
    game.addEntity(blondeZombie);

    var brownRat = new BrownRat(game, 2900, 4900);
    enemies.push(brownRat);
    game.addEntity(brownRat);

    var death = new Death(game, 2900, 5100);
    enemies.push(death);
    game.addEntity(death);

    var dog = new Dog(game, 2900, 5300);
    enemies.push(dog);
    game.addEntity(dog);

    var eyepatch = new Eyepatch(game, 2900, 5500);
    enemies.push(eyepatch);
    game.addEntity(eyepatch);

    var helmetGoblin = new HelmetGoblin(game, 2900, 5700);
    enemies.push(helmetGoblin);
    game.addEntity(helmetGoblin);

    var hood = new Hood(game, 2900, 5900);
    enemies.push(hood);
    game.addEntity(hood);


    var mummy = new Mummy(game, 3500, 4500);
    enemies.push(mummy);
    game.addEntity(mummy);

    var scarf = new Scarf(game, 3500, 4700);
    enemies.push(scarf);
    game.addEntity(scarf);

    var skeleton = new Skeleton(game, 3500, 4900);
    enemies.push(skeleton);
    game.addEntity(skeleton);

    var skeletonKing = new SkeletonKing(game, 3500, 5100);
    enemies.push(skeletonKing);
    game.addEntity(skeletonKing);

    var stitches = new Stitches(game, 3500, 5300);
    enemies.push(stitches);
    game.addEntity(stitches);

    var suburbanZombie = new SuburbanZombie(game, 3500, 5500);
    enemies.push(suburbanZombie);
    game.addEntity(suburbanZombie);

    var suitZombie = new SuitZombie(game, 3500, 5700);
    enemies.push(suitZombie);
    game.addEntity(suitZombie);

    var viking = new Viking(game, 3500, 5900);
    enemies.push(viking);
    game.addEntity(viking);
    
    var wizardGoblin = new WizardGoblin(game, 3500, 5990);
    enemies.push(wizardGoblin);
    game.addEntity(wizardGoblin);



    game.init(ctx);
    game.start();
  });
}