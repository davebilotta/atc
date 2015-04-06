var ships;
var obstacles;
var scoreText;
var score;
var numShips;

var debug = false;

var width = 1024;
var height = 768;

// Ship/Obstacle speeds
var SHIP1_SPEED = 40;
var SHIP2_SPEED = 60;
var UFO_SPEED = 20;
var OBSTACLE_MAX_SPEED = 25;

var SPAWN_DELAY = 2.5; // How long between new ships/obstacles?
var IMAGE_SCALE = 0.33; // Image scaling factor

var gameOver = false;
var gameOverDelay = 1.5;  //  How many seconds before displaying "Game Over" screen

var RADIANS_TO_DEGREES = 57.2957795;

var scoreTextA, scoreTextB, scoreTextC;
var scoreTextA_num, scoreTextB_num, scoreTextC_num;

// offset of UI elements
var horizontalOffset = 20;
var verticalOffset = 15;

var Game = function(game){};

Game.prototype = {
  preload: function() {
    console.log("GAME PRELOAD");
    // Preload font
    this.game.add.text(0, 0, "fix", {font:"1px Future", fill:"#FFFFFF"});

    game.load.image('ship1', 'images/player.png');  
    game.load.image('ship2', 'images/enemyShip.png');
    game.load.image('ufo','images/ufo.png');
    game.load.image('meteorSmall','images/meteorSmall.png');
    game.load.image('meteorLarge','images/meteorBig.png');
    game.load.image('background', 'images/bg/blue.png');

    game.load.image('0', 'images/ui/numbers/0.png');
    game.load.image('1', 'images/ui/numbers/1.png');
    game.load.image('2', 'images/ui/numbers/2.png');
    game.load.image('3', 'images/ui/numbers/3.png');
    game.load.image('4', 'images/ui/numbers/4.png');
    game.load.image('5', 'images/ui/numbers/5.png');
    game.load.image('6', 'images/ui/numbers/6.png');
    game.load.image('7', 'images/ui/numbers/7.png');
    game.load.image('8', 'images/ui/numbers/8.png');
    game.load.image('9', 'images/ui/numbers/9.png');

    game.load.image('pause','images/ui/pause.png');
    game.load.image('play','images/ui/play.png');

    this.game.state.add('gameOverState', gameOverState);

  },

  create: function() {
    console.log("GAME CREATE");
    background = game.add.tileSprite(0, 0, width, height, 'background');

    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    gameOver = false;

    ships = game.add.group();
    obstacles = game.add.group();

    score = 0;
    numShips = 0;

       // start spawn loop     
       this.game.time.events.loop(SPAWN_DELAY * 1000, spawn, this);

      // Show pause image
      var pause = game.add.button(0,0,'pause',gamePause,this);

      scoreText = game.add.text(width - 150,5,"Score: 0", {
        font: "26px Future",     
        //font_family: "Future",
        fill: "#ff0044", 
        align: "center"
      });

    },

    update: function() {
      checkCollisions();
      checkLanding();
      maybeToggleDebug();
    },

    render: function() {
      if (debug) {
        this.debugShips();
        this.debugObstacles();
      }

      updateUI();
    },

    debugShips: function() {
      for (var i = 0; i<ships.length; i++) {
        this.game.debug.body(ships.getAt(i));
      }
    },

    debugObstacles: function() {
      for (var i = 0; i<obstacles.length; i++) {
        this.game.debug.body(obstacles.getAt(i));
      }
    }

  };

  var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
  game.state.add('game', Game);
  game.state.start('game');

  function spawn() {
     //spawnDelta;
     //console.log(timer.expired);
     if (!gameOver) {
    // newShip();

    ships.add(new Ship());

    numShips++;
//      newObstacle();

}
  } // end spawn function

// Collision detection
function checkCollisions() {
  // Check collision between ships and obstacles
  if (!gameOver) {
    game.physics.arcade.collide(ships, ships, collisionEvent);
    game.physics.arcade.overlap(ships, obstacles, collisionEvent);
    //game.physics.arcade.overlap(obstacles, obstacles, collisionEvent);
  }
}

function collisionEvent() {
  console.log("COLLISION");
  levelEnd();
}

function levelEnd() {
  gameOver = true;
  stopAllShips();
  stopAllObstacles();

  game.time.events.add(gameOverDelay * 1000, goToGameOverState, this);;

  this.game.state.start('gameOverState');
} // end levelEnd

function goToGameOverState() {
  this.game.state.start('gameOverState');
}

// Landings
function checkLanding() {

  var landed = false;
  if (landed) {
    // remove ship and increase score
    score++;
  }

} // end checkLanding

// debug
function maybeToggleDebug() {
  // toggle debug
  if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    if (debug) {
      debug = false;
      console.log("Debug is OFF");
      return;
    }
    else {
      debug = true;
      console.log("Debug is ON");
      return;
    }
  }
}

