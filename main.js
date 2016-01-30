// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/sheet2.png");
ASSET_MANAGER.queueDownload("img/sheet5.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da shield");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var enemies = [];
    var bg = new Background(gameEngine);
    var hero = new Hero(gameEngine);
    var goblin = new Goblin(gameEngine);
    enemies.push(goblin);

    gameEngine.enemies = enemies;
    gameEngine.addEntity(bg);
    gameEngine.addEntity(hero);
    gameEngine.addEntity(goblin);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
