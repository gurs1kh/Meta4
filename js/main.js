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
	ASSET_MANAGER.queueDownload("img/META4map-mini.gif");
	ASSET_MANAGER.queueDownload("img/weaponsheet2.png");
	ASSET_MANAGER.queueDownload("img/arrow.png");
	ASSET_MANAGER.queueDownload("img/bows.png");
	ASSET_MANAGER.queueDownload("img/keys.png");
	ASSET_MANAGER.queueDownload("img/gate.png");
	ASSET_MANAGER.queueDownload("img/heartspritesheet.png");
	ASSET_MANAGER.queueDownload("img/startscreen.png");
	ASSET_MANAGER.queueDownload("img/game-over-screen.png");
	ASSET_MANAGER.queueDownload("img/win-screen.png");
	ASSET_MANAGER.queueDownload("img/sheetTree.png");
	ASSET_MANAGER.queueDownload("img/sheetSnowTree.png");
	ASSET_MANAGER.queueDownload("img/sheetTombstone.png");
	ASSET_MANAGER.queueDownload("img/sheetRock.png");

	ASSET_MANAGER.downloadAll(function() {
		newGame();
		var music = new Audio('audio/meta4-theme.wav');
		music.loop = true;
		music.play();
	});
}

function newGame() {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	game = new GameEngine();
	var enemies = [];
	var terrain = []; 
	game.map = new Map(game);
	game.gate = new Gate(game, 3170, 4010);
	game.hero = new Hero(game, 3180, 4100);
	game.camera = new Camera(game, canvas.width, canvas.height);
	game.playerInfo = new PlayerInfo(game);

	game.enemies = enemies;
	game.terrain = terrain; 
	game.addEntity(game.map);
	game.addEntity(game.gate); 
	game.addEntity(game.camera);

	game.bossesKilled = 0;
	game.addEntity(game.hero);

	new PlaceEnemies(game, 30);
	new PlaceTerrain(game, 20);
	
	game.init(ctx);
	game.start();
}