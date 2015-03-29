/* Ship-related functions */
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

  numShips++;
  console.log("Ship created: total count is: " + numShips);
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

  //ship.angle = body.polygon.rotate(rot * RADIANS_TO_DEGREES - offset);

  // destination: is this needed? just act on collision with world bounds?
  
  ship.body.collideWorldBounds = false;
  game.physics.arcade.gravity.x = 0;
  ship.body.moves = true;

  ships.add(ship);
 } 