var gameOverState =  {
	init: function() {
	},

	preload: function() {
	},

	create: function() {
	//game.stage.backgroundColor = '#6d94b5';

	var w = game.cache.getImage('overlay').width;
	var h = game.cache.getImage('overlay').height;
	var overlay = game.add.image((width - w)/2,(height - h)/2,'overlay');

	gameOverText = game.add.text(game.world.centerX, game.world.centerY, ("GAME OVER"), {      
		font: "60px Future", 
		fill: "#ff0044", 
		align: "center", 
		anchor: "center"
	});

	gameOverText.anchor.set(0.5);
},

update: function() {
}
};

function gamePause() {
	this.game.paused = true;

	var w = game.cache.getImage('overlay').width;
	var h = game.cache.getImage('overlay').height;
	var overlay = game.add.image((width - w)/2,(height - h)/2,'overlay');

	var pauseText = game.add.text(game.world.centerX, game.world.centerY, ("GAME PAUSED\nClick to continue"), 
		{   font: "35px Future", 
		fill: "#ffffff", 
		align: "center"});

	pauseText.anchor.set(0.5);

	this.input.onDown.add(function() {
		this.game.paused = false;
		// Destroy everything used to render pause overlay
		pauseText.destroy();
		overlay.destroy();
	},this); 
}


function gamePlay() {
	this.game.paused = false;
	pauseOverlay.destroy();

}

function updateUI() {  
	// TODO: change this back to score once testing is done 
	var s = numShips;

	scoreText.setText("Score: " + padNum(s));
//	console.log("width: " + scoreText.width);
//	scoreText.x = (width - scoreText.width);
}

function pad() {

}
