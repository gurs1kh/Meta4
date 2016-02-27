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
  ASSET_MANAGER.queueDownload("img/startscreen.png");
  ASSET_MANAGER.queueDownload("img/game-over-screen.png");
  ASSET_MANAGER.queueDownload("img/win-screen.png");

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

    game.bossesKilled = 0;
    game.addEntity(game.hero);

    new PlaceEnemies(game, 30);
    game.addEntity(game.playerInfo);

    game.init(ctx);
    game.start();
  });
}