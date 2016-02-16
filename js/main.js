// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/sheet3.png");
ASSET_MANAGER.queueDownload("img/sheet5.png");
ASSET_MANAGER.queueDownload("img/META4map.gif");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	// ctx.scale(1.5,1.5);
	
	var game = new GameEngine();
	var enemies = [];
	game.map = new Map(game);
	game.hero = new Hero(game, 2520, 2420);
	// game.hero = new Hero(game, 3000, 3000);
	game.hero.speed = 50;
	game.camera = new Camera(game, canvas.width, canvas.height);
	var goblin = new Goblin(game, 500, 500);
	this.game = game;
	game.hero.boxes = false;
	
	enemies.push(goblin);
	console.log(game.hero);
	game.enemies = enemies;
	game.addEntity(game.map);
	game.addEntity(game.hero);
	game.addEntity(goblin);
	game.addEntity(game.camera);
	
	goblin.removeFromWorld = true;
	game.enemies = [];
	
	game.init(ctx);
	game.start();
});
