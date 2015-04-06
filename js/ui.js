var gameOverState =  {
	init: function() {
	},

	preload: function() {
	},

	create: function() {
		game.stage.backgroundColor = '#6d94b5';

		gameOverText = game.add.text(400, (game.height/2), ("GAME OVER"), {      
			font: "60px Future", 
			fill: "#ff0044", 
			align: "center" 
		});
	},

	update: function() {
	}
};

function gamePause() {
	this.game.paused = true;
	
	var pauseOverlay = game.add.text(400, (game.height/2), ("GAME PAUSED\nClick to continue"), 
    {      
			font: "60px Future", 
			fill: "#ffffff", 
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

  function updateUI() {  
    // TODO: change this back to score once testing is done 
    var s = numShips;

    // 
    /* if (s > 999) s = 999;
    var padScore = padNum(s) + "";
    //console.log("score = " + padScore)
    
    var a = padScore.substring(0,1);
    var b = padScore.substring(1,2);
    var c = padScore.substring(2,3);

    // Now update textures with new textures if necessary
    // TODO: Figure out a better way to get name of texture 
    if (scoreTextA_num != a) {
      scoreTextA.loadTexture(a);
      scoreTextA_num = a;
    }
    if (scoreTextB_num != b) {
      scoreTextB.loadTexture(b);
      scoreTextB_num = b;
    }
    if (scoreTextC_num != c) {
      scoreTextC.loadTexture(c);
      scoreTextC_num = c;
    } */

    scoreText.setText("Score: " + s);

  }
