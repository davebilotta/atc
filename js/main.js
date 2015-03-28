var ships;
var obstacles;
var scoreText;
var score;

var width = 1024;
var height = 768;

var SHIP1_SPEED = 40;
var SHIP2_SPEED = 60;
var UFO_SPEED = 20;
var OBSTACLE_MAX_SPEED = 25;

var TIMER_DELAY = 3.5; // How long between new ships/obstacles?
var IMAGE_SCALE = 0.33; // Image scaling factor

var gameOver = false;

var RADIANS_TO_DEGREES = 57.2957795;

var timer;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', 
  { preload: preload, 
    create: create, 
    update: update
  });


function preload() {
      game.load.image('ship1', 'images/player.png');  
      game.load.image('ship2', 'images/enemyShip.png');
      game.load.image('ufo','images/ufo.png');
      game.load.image('meteorSmall','images/meteorSmall.png');
      game.load.image('meteorLarge','images/meteorBig.png');

      game.load.image('background', 'images/starBackground.png');

    

  }

function create() {
      background = game.add.tileSprite(0, 0, width, height, 'background');

      ships = game.add.group();
      obstacles = game.add.group();

      score = 0;
      scoreText = game.add.text(0, 0, ("Score: " + score), {      
        font: "30px Arial", 
        fill: "#ff0044", 
        align: "center" 
      });

      // game.input.onDown.add(newShip, this);

      this.game.time.events.loop(TIMER_DELAY * 1000, spawn, this);

  }

  function update() {
      checkCollisions();
      checkLanding();
      updateUI();
      // Maybe spawn new objects if we've hit threshold
     //spawn();

     //console.log(game.timer.seconds);
  }

  function spawn() {
     //spawnDelta;
     //console.log(timer.expired);
     
     newShip();

     // TODO: Maybe create new obstacle?
  }

function randNum(max) {
  return game.rnd.integerInRange(0,max);
}

/* add a ship at a random spot on screen */
function newShip() {
  var img;
  var r = randNum(2);

  var speed;

  switch(r) {
    case 0: img = 'ship1';
            speed = SHIP1_SPEED;
            break;
    case 1: img = 'ship2';
            speed = SHIP2_SPEED;
            break;
    case 2: img = 'ufo';
            speed = UFO_SPEED;
            break;
    default: img = 'ship1';
             speed = SHIP1_SPEED;
             break;
  }

// TODO: Add to group differently
// Start at one of four corners (0 = upper left, 1 = upper right, 2 = lower right, 3 = lower left)
// Random angle between 10 and 80
  var ship = game.add.sprite(game.world.randomX,game.world.randomY,img);

  ship.scale.x = IMAGE_SCALE;
  ship.scale.y = IMAGE_SCALE;

  game.physics.arcade.enable(ship);
  
  // angle 
  //ship.angle = randNum(80) + 10;

//  var speed = randNum(shipMaxSpeed);

  ship.body.velocity.set(speed,speed);

  var rot = game.physics.arcade.moveToXY(
    ship,
    randNum(1000),
    randNum(600),
    speed);
  // returns result in radians

  console.log("Rotation is " + rot);
  console.log("DEGREES is " +rot * RADIANS_TO_DEGREES);
  //if (rot < 0) { 
   // ship.angle = rot * RADIANS_TO_DEGREES + 90;
  //}
  //else {
 //  ship.angle = rot * RADIANS_TO_DEGREES - 90;
//  }

// need to account for the different rotation of individual images
if (img == "ship1") {
  offset = -90;
}
else {
  var offset = 90;
}
  ship.angle = rot * RADIANS_TO_DEGREES - offset;
  // destination: is this needed? just act on collision with world bounds?
  
  ship.body.collideWorldBounds = false;
  game.physics.arcade.gravity.x = 0;
  ship.body.moves = true;

  ships.add(ship);
 } 

/* add an obstacle at a random spot on screen */
function newObstacle() {
  var img;
  var r = randNum(1);

  switch(r) {
    case 0: img = 'meteorSmall';
    break;
    case 1: img = 'meteorLarge';
    break;
    default: img = 'meteorSmall';

  }
  
  var obs = game.add.sprite(game.world.randomX,game.world.randomY,img);
  
  game.physics.arcade.enable(obs);
  game.physics.arcade.gravity.x = 0;
 
  obs.body.collideWorldBounds = false;
  obs.body.rotation = randNum(180);
  obs.body.velocity.set(randNum(OBSTACLE_MAX_SPEED), 0);

  obstacles.add(obs);
}


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
  scoreText.setText("Score: " + score);
}

