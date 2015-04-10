/* Ship-related functions */

var speeds =  [SHIP1_SPEED, SHIP2_SPEED, UFO_SPEED];
var images = ['ship1', 'ship2', 'ufo'];

function Ship(id) {

  num = randNum(2);

  this.speed = speeds[num];
  this.img = images[num];
  this.id = id;

  // Get spawnX, spawnY, destX, destY
  var spawnCoords = getSpawnCoordinates();

  this.ship = game.add.sprite(spawnCoords[0],spawnCoords[1],this.img);

  this.ship.scale.x = IMAGE_SCALE;
  this.ship.scale.y = IMAGE_SCALE;
  game.physics.arcade.enable(this.ship);

  var rot = game.physics.arcade.moveToXY(
    this.ship,
    spawnCoords[2],
    spawnCoords[3],
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

Ship.prototype.stop = function() {
  this.ship.body.velocity.x = 0;
  this.ship.body.velocity.y = 0;
}

Ship.prototype.adjustSpeed = function(spd) {
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

function getSpawnCoordinates() {
  // return array of:
  //   0: SpawnX
  //   1: SpawnY
  //   2: DestinationX
  //   3: DestinationY
  var n = randNum(3);     // 0 = North, 1 = East, 2 = South, 3 = West
  var r = new Array();
  var w = width;
  var h = height;
  var edgeOff = 25;  // border from edges (on either side) where we can spawn
  var offScrn = 25;  // offset from screen where we spawn or end up

  var sx,sy,dx,dy;
  switch(n) {
    case 0: sx = randN(edgeOff,(width - edgeOff));
            sy = -offScrn;
            dx = randN(edgeOff,(width - edgeOff));
            dy = height + offScrn;
            break;
    case 1: sx = width + offScrn;
            sy = randN(edgeOff,(height - edgeOff));
            dx = -offScrn;
            dy = randN(edgeOff,(height - edgeOff));
            break;
    case 2: sx = randN(edgeOff,(width - edgeOff));
            sy = height + offScrn;
            dx = randN(edgeOff,(width - edgeOff));
            dy = -offScrn;
    break;
    case 3: sx = -offScrn;
            sy = randN(edgeOff,(height - edgeOff));
            dx = width + offScrn;
            dy = randN(edgeOff,(height - edgeOff));
    break;
    default:
    log("***** Default, wasn't expecting this *****");
    break;
  }

  /* 
  r.push(game.world.randomX);
  r.push(game.world.randomY);
  r.push(randNum(1000));
  r.push(randNum(600)); */

  r.push(sx);
  r.push(sy);
  r.push(dx);
  r.push(dy);

log(r);
return r;
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