var ships;
var obstacles;
var scoreText;
var score;

var width = 1024;
var height = 768;

var shipMaxSpeed = 100;
var obstacleMaxSpeed = 25;

var gameOver = false;

var RADIANS_TO_DEGREES = 57.2957795;

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
      scoreText = game.add.text(0, 0, ("Score: " + getScore()), {      
        font: "30px Arial", 
        fill: "#ff0044", 
        align: "center" 
      });

      newShip();
      newObstacle();

      game.input.onDown.add(newShip, this);
      
      
  }

function update() {
      checkCollisions();
      checkLanding();
      updateUI();


  }


function randNum(max) {
  return game.rnd.integerInRange(0,max);
}


/* add a ship at a random spot on screen */
function newShip() {
  var img;
  var r = randNum(1);

  switch(r) {
    case 0: img = 'ship1';
    break;
    case 1: img = 'ship2';
    break;
    default: img = 'ship1';
    break;
  }

// TODO: Add to group differently
// Start at one of four corners (0 = upper left, 1 = upper right, 2 = lower right, 3 = lower left)
// Random angle between 10 and 80
  var ship = game.add.sprite(game.world.randomX,game.world.randomY,img);
  game.physics.arcade.enable(ship);
  
  // angle 
  //ship.angle = randNum(80) + 10;

  var speed = randNum(shipMaxSpeed);

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
  
  

  //ship.input.onDown.add(moveBall, this);

  ship.body.moves = true;


  ships.add(ship);
 } 

/* add an obstacle at a random spot on screen */
function newObstacle() {
  var img;
  var r = randNum(2);

  switch(r) {
    case 0: img = 'ufo';
    break;
    case 1: img = 'meteorSmall';
    break;
    case 2: img = 'meteorLarge';
    break;
    default: img = 'ufo';

  }
  
//  obstacles.create(randNum(width),randNum(height), img);

var obs = game.add.sprite(game.world.randomX,game.world.randomY,img);
  

  game.physics.arcade.enable(obs);
  
 game.physics.arcade.gravity.x = 0;
 
  obs.body.collideWorldBounds = false;
  obs.body.rotation = randNum(180);
    
  obs.body.velocity.set(randNum(obstacleMaxSpeed), 0);

   obstacles.add(obs);
}



function moveBall(pointer) {

    ball.x = pointer.x;
    ball.y = pointer.y;
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

}

function updateUI() {  
  scoreText.setText("Score: " + getScore());
}

function getScore() {
  //return score;
  return ships.length;
}