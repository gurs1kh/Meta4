// the "main" code begins here
ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/sheet3.png");
ASSET_MANAGER.queueDownload("img/sheet5.png");
ASSET_MANAGER.queueDownload("img/META4map.gif");
ASSET_MANAGER.queueDownload("img/weaponsheet2.png");
ASSET_MANAGER.queueDownload("img/weaponsheet2_flipped.png");
ASSET_MANAGER.queueDownload("img/weaponsheet1_flipped-rotated.png");
ASSET_MANAGER.queueDownload("img/weaponsheet1_flipped-rotated_2.png");
ASSET_MANAGER.queueDownload("img/arrow.png");
ASSET_MANAGER.queueDownload("img/bows.png");
ASSET_MANAGER.queueDownload("img/keys.png");
ASSET_MANAGER.queueDownload("img/gate.png");

ASSET_MANAGER.downloadAll(function () {
	//	console.log("starting up da shield");
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	//	ctx.scale(1.5, 1.5);

	var game = new GameEngine();
	var enemies = [];
	game.map = new Map(game);
	game.hero = new Hero(game, 3180, 4100);
	game.camera = new Camera(game, canvas.width, canvas.height);
	var goblin = new Goblin(game, 2900, 4100);

	enemies.push(goblin);
	console.log(game.hero);
	game.enemies = enemies;
	game.addEntity(game.map);
	game.addEntity(game.hero);
	game.addEntity(game.hero.weapon);
	game.addEntity(goblin);
	game.addEntity(game.camera);

	var weapon = new Weapon(game, 3300, 4150);
	weapon.meleeWeaponLevel = 1;
	weapon.pickedUp = false;
	setWidthHeight(weapon);
	setXYOffset(weapon);
	game.addEntity(weapon);

	weapon = new Weapon(game, 3400, 4150);
	weapon.meleeWeaponLevel = 2;
	weapon.pickedUp = false;
	setWidthHeight(weapon);
	setXYOffset(weapon);
	game.addEntity(weapon);

	weapon = new Weapon(game, 3500, 4150);
	weapon.usingMelee = false;
	weapon.bowWeaponLevel = 1;
	weapon.pickedUp = false;
	setWidthHeight(weapon);
	setXYOffset(weapon);
	game.addEntity(weapon);

	weapon = new Weapon(game, 3600, 4150);
	weapon.usingMelee = false;
	weapon.bowWeaponLevel = 2;
	weapon.pickedUp = false;
	setWidthHeight(weapon);
	setXYOffset(weapon);
	game.addEntity(weapon);

	var key = new Key(game, 3300, 4300);
	key.whichKey = 1;
	game.addEntity(key);

	key = new Key(game, 3400, 4300);
	key.whichKey = 2;
	game.addEntity(key);

	key = new Key(game, 3500, 4300);
	key.whichKey = 3;
	game.addEntity(key);

	key = new Key(game, 3600, 4300);
	key.whichKey = 4;
	game.addEntity(key);

	this.gate = new Gate(game, 3170, 4010);
	game.addEntity(this.gate);

	game.init(ctx);
	game.start();
});