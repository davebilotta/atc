/* Ship-related functions */

var speeds =  [SHIP1_SPEED, SHIP2_SPEED, UFO_SPEED];
var images = ['ship1', 'ship2', 'ufo'];

function MyShip(id) {

  num = randNum(2);

  this.speed = speeds[num];
  this.img = images[num];
  this.id = id;
  this.ship = game.add.sprite(game.world.randomX,game.world.randomY,this.img);

  this.ship.scale.x = IMAGE_SCALE;
  this.ship.scale.y = IMAGE_SCALE;
  game.physics.arcade.enable(this.ship);

  var rot = game.physics.arcade.moveToXY(
    this.ship,
    randNum(1000),
    randNum(600),
    this.speed);

// need to account for the different rotation of individual images
if (this.img == "ship1") offset = -90;
else  offset = 90;

this.ship.angle = rot * RADIANS_TO_DEGREES - offset;

// Store original (normal speed velocity)
var vel = this.ship.body.velocity;
this.velX = vel.x;
this.velY = vel.y;

// Adjust velocity if game speed is altered
var spd;
switch (gameSpeed) { 
  case "normal": spdX = this.velX;
                 spdY = this.velY;
      break;
  case "slow": spdX = this.velX / SPEED_FACTOR;
               spdY = this.velY / SPEED_FACTOR;
      break;
  case "fast": spdX = this.velX * SPEED_FACTOR;
               spdY = this.velY * SPEED_FACTOR;
        break;
}
this.ship.body.velocity.set(spdX, spdY);

// destination: is this needed? just act on collision with world bounds?
this.ship.body.collideWorldBounds = false;
game.physics.arcade.gravity.x = 0;
this.ship.body.moves = true;

log("ship created with velocity " + this.velX + ", " + this.velY + " at " + this.ship.x + "," + this.ship.y);

return this;
}

MyShip.prototype.stop = function() {
  this.ship.body.velocity.x = 0;
  this.ship.body.velocity.y = 0;
}

MyShip.prototype.adjustSpeed = function(spd) {
  log("********** Game speed is now " + spd + " **********");

  var speedX, speedY;
// Original velocities when ship was created 
var velX = this.velX; 
var velY = this.velY;

switch(spd) {
  case "normal": speedX = velX;
                 speedY = velY;
                 break;
  case "slow": speedX = velX / SPEED_FACTOR;
               speedY = velY / SPEED_FACTOR; 
               break;
  case "fast": speedX = velX * SPEED_FACTOR;
               speedY = velY * SPEED_FACTOR;
               break;
  default: speedX = velX;
           speedY = velY; 
          break;
} 

// Now set new velocity on ship
this.ship.body.velocity.set(speedX, speedY);

}

function changeSpeed(spd) {
  gameSpeed = spd;

  for (var i = 0; i < shipObj.length; i++) {
    shipObj[i].adjustSpeed(spd);
  } 
}

function stopAllShips() {
  for (var i = 0; i<ships.length; i++) {
    ships.getAt(i).body.velocity.set(0,0);
  }
}