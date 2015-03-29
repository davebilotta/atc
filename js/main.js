var ships;
var obstacles;
var scoreText;
var score;
var numShips;

var width = 1024;
var height = 768;

// Ship/Obstacle speeds
var SHIP1_SPEED = 40;
var SHIP2_SPEED = 60;
var UFO_SPEED = 20;
var OBSTACLE_MAX_SPEED = 25;

var TIMER_DELAY = 3.5; // How long between new ships/obstacles?
var IMAGE_SCALE = 0.33; // Image scaling factor

var gameOver = false;

var RADIANS_TO_DEGREES = 57.2957795;

var scoreTextA, scoreTextB, scoreTextC;
var scoreTextA_num, scoreTextB_num, scoreTextC_num;

// offset of UI elements
var horizontalOffset = 20;
var verticalOffset = 15;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', 
  { preload: preload, 
    create: create, 
    update: update,
    render: render
  });


function preload() {
      game.load.image('ship1', 'images/player.png');  
      game.load.image('ship2', 'images/enemyShip.png');
      game.load.image('ufo','images/ufo.png');
      game.load.image('meteorSmall','images/meteorSmall.png');
      game.load.image('meteorLarge','images/meteorBig.png');

      game.load.image('background', 'images/bg/black.png');
      //game.load.image('background', 'images/bg/blue.png');
      //game.load.image('background', 'images/bg/darkPurple.png');
      //game.load.image('background', 'images/bg/purple.png');

      game.load.image('0', 'images/numbers/0.png');
      game.load.image('1', 'images/numbers/1.png');
      game.load.image('2', 'images/numbers/2.png');
      game.load.image('3', 'images/numbers/3.png');
      game.load.image('4', 'images/numbers/4.png');
      game.load.image('5', 'images/numbers/5.png');
      game.load.image('6', 'images/numbers/6.png');
      game.load.image('7', 'images/numbers/7.png');
      game.load.image('8', 'images/numbers/8.png');
      game.load.image('9', 'images/numbers/9.png');
   

  }

function create() {
      background = game.add.tileSprite(0, 0, width, height, 'background');

      ships = game.add.group();
      obstacles = game.add.group();

      score = 0;
      numShips = 0;

      scoreText = game.add.text(0, 0, ("Score: " + score), {      
        font: "30px Arial", 
        fill: "#ff0044", 
        align: "center" 
      });

      // score is 3 digits (2a, 2b, 2c left to right)
      // number images are 19x19
      var w = 20;
      scoreTextA = game.add.image(width - (horizontalOffset + (w * 3)),verticalOffset,'0');
      scoreTextB = game.add.image(width - (horizontalOffset + (w * 2)),verticalOffset,'0');
      scoreTextC = game.add.image(width - (horizontalOffset + w),verticalOffset,'0');
      scoreTextA_num = 0;
      scoreTextB_num = 0;
      scoreTextC_num = 0;

      // game.input.onDown.add(newShip, this);

      this.game.time.events.loop(TIMER_DELAY * 1000, spawn, this);

  }

  function update() {
      checkCollisions();
      checkLanding();
  }

   function render() {
   //    this.game.debug.body(this.bullet);
  //  this.game.debug.body(this.enemy);
    
    updateUI();
   }

  function spawn() {
     //spawnDelta;
     //console.log(timer.expired);
     if (!gameOver) {
     newShip();

     // TODO: Maybe create new obstacle?

   }
  } // end spawn function


//
function checkCollisions() {
  game.physics.arcade.overlap(ships, obstacles,shipObsCollision);
  //game.physics.arcade.overlap(ships, collision);
  game.physics.arcade.collide(ships,ships,shipShipCollision);
}

function shipShipCollision() {
  console.log("SHIP TO SHIP COLLISION");

  gameOver = true;
}

function shipObsCollision() {
  console.log("SHIP TO OBSTACLE COLLISION");

  gameOver = true;
}

function checkLanding() {

  var landed = false;
  if (landed) {
    // remove ship and increase score
    score++;
  }

} // end checkLanding

function updateUI() {  
  // TODO: Remove this once testing is done 
  var s = numShips;

  // 
  if (s > 999) s = 999;
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
 }

}

