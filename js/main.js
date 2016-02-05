// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/sheet3.png");
ASSET_MANAGER.queueDownload("img/sheet5.png");
ASSET_MANAGER.queueDownload("img/META4map-min2.png");

ASSET_MANAGER.downloadAll(function () {
	console.log("starting up da shield");
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	ctx.scale(1.5, 1.5);
	
	var game = new GameEngine();
	var enemies = [];
	var map = new Map(game);
	game.hero = new Hero(game, 250, 250);
	var goblin = new Goblin(game, 100, 50);
	game.camera = new Camera(game);
	
	enemies.push(goblin);
	console.log(game.hero);
	game.enemies = enemies;
	game.addEntity(map);
	game.addEntity(game.hero);
	game.addEntity(goblin);
	game.addEntity(game.camera);
	
	game.init(ctx);
	game.start();
});
