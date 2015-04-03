var gameOverState =  {
	init: function() {
	},

	preload: function() {
	},

	create: function() {
		scoreText = game.add.text(400, (game.height/2), ("GAME OVER"), {      
			font: "60px Verdana", 
			fill: "#ff0044", 
			align: "center" 
		});
	},

	update: function() {
	}
};

var pause = {

	init: function() {
	},

	preload: function() {
	},

	create: function() {
		scoreText = game.add.text(400, (game.height/2), ("PAUSE"), {      
			font: "60px Verdana", 
			fill: "#ff0044", 
			align: "center" 
		});

		var play = game.add.button(0,0,'play',gamePlay,this,2,1,0)

    //game.state.add('play', game);
},

update: function() {
}
};

function gamePause() {
	console.log("PAUSE clicked");
	game.state.start('pause');
}

function gamePlay() {
	console.log("PLAY clicked");
	game.state.start('game');

}