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
	game.gate = new Gate(game, 3170, 4010);
    game.map = new Map(game);
    game.hero = new Hero(game, 3180, 4100);
    game.camera = new Camera(game, canvas.width, canvas.height);
    game.playerInfo = new PlayerInfo(game);
	
    game.enemies = enemies;
    game.addEntity(game.map);
    game.addEntity(game.gate);
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
    game.addEntity(game.hero);
    
	game.addEntity(new PlaceEnemies(game, 3));
	
    game.init(ctx);
    game.start();
  });
}