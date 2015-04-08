var ships, obstacles, scoreText, score, numShips, shipObj;

var debug = false;                      // True if in debug mode
var width = 1024;                       // Game width
var height = 768;                       // Game height
var fontFace = "Future Thin";           // Font (choices are "Future" or "Future Thin")
var SHIP1_SPEED = 40;                   // How fast will a Ship (Class 1) be?
var SHIP2_SPEED = 60;                   // How fast will a Ship (Class 2) be?
var UFO_SPEED = 20;                     // How fast will a UFO be?
var OBSTACLE_MAX_SPEED = 25;            // Max speed of obstacles
var SPAWN_DELAY = 1.5;                  // How long between new ships/obstacles?
var IMAGE_SCALE = 0.33;                 // Image scaling factor
var gameOver = false;                   // True when the game is over
var gameOverDelay = 1.5;                // How many seconds before displaying "Game Over" screen
var RADIANS_TO_DEGREES = 57.2957795;    // 1 Radian = How many degrees?
var padding = 10;                       // Padding of UI elements (horizontal and vertical)

var SPEED_FACTOR = 1.5;                 // This is how fast the game speeds up/slows down when the slow/fast buttons are clicked
var gameSpeed = "normal";               // Will be "normal", "slow" or "fast"

var Game = function(game) {};

Game.prototype = {
  preload: function() {
    // Preload font
    this.game.add.text(0, 0, "fix", {font:"1px " + fontFace, fill:"#FFFFFF"});

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
    game.load.image('rewind','images/ui/rewind.png');
    game.load.image('forward','images/ui/forward.png');
    game.load.image('overlay','images/ui/overlay.png');

    this.game.state.add('gameOverState', gameOverState);

  },

  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    initUI();
    initGame();
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

function initGame() {
  ships = game.add.group();
  shipObj = game.add.group();
  obstacles = game.add.group();

  gameOver = false;
  score = 0;
  numShips = 0;

  // start spawn loop     
  game.time.events.loop(SPAWN_DELAY * 1000, spawn, game);

}

function initUI() {
  background = game.add.tileSprite(0, 0, width, height, 'background');

  var rewind = game.add.button(0,0,'rewind',slowSpeed,this.game);
  var play = game.add.button(50,0,'play',normalSpeed,this.game);
  var pause = game.add.button(90,0,'pause',gamePause,this.game);
  var forward = game.add.button(140,0,'forward',fastSpeed,this.game);

    // Score text 
  scoreText = game.add.text(width - 150,padding,"Score: 000", {
        font: "26px "  + fontFace,
        fill: "#ffffff", 
        align: "center"
  }); 
  scoreText.x = (width - scoreText.width - padding);

}

  var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
  game.state.add('game', Game);
  game.state.start('game');

  function spawn() {
     //spawnDelta;
     //console.log(timer.expired);
     if (!gameOver) {
      var r = randNum(4);
      if (r === 0) {
        newObstacle();
      }
      else {
      // Fix this later 
      var s = new Ship();
      // 
    ships.add(s);
      numShips++;
      } 
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

  game.time.events.add(gameOverDelay * 1000, goToGameOverState, this);

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

// TODO: Move these somewhere else
function slowSpeed() {
  adjustSpeed("slow");
}
function normalSpeed() {
  adjustSpeed("normal");
}

function fastSpeed() {
  adjustSpeed("fast");
}

