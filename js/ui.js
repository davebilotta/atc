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

		//var play = game.add.button(0,0,'play',gamePlay,this,2,1,0)

    //game.state.add('play', game);
},

update: function() {
}
};


 

function gamePause() {
	console.log("PAUSE clicked");
	
	//game.state.start('pause');

	this.game.paused = true;
	
	//this.game.hide();
//	this.pauseOverlay.show();
    /*var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
    this.input.onDown.add(function(){
        pausedText.destroy();
        this.game.paused = false;
    }, this);
    */

    var pauseOverlay = game.add.text(400, (game.height/2), ("PAUSE"), 
    {      
			font: "60px Verdana", 
			fill: "#ff0044", 
			align: "center"});

   // var playImage = game.add.button(100,0,'play',gamePlay, this);
    
    this.input.onDown.add(function() {
    		//playImage.destroy();
    		this.game.paused = false;
    		pauseOverlay.destroy();
    	
    },this); 
	
}

function gamePlay() {
	console.log("PLAY clicked");
	this.game.paused = false;
	pauseOverlay.destroy();
	
}