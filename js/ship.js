/* Ship-related functions */

var speeds =  [SHIP1_SPEED, SHIP2_SPEED, UFO_SPEED];
var images = ['ship1', 'ship2', 'ufo'];

var Ship = function () {
   
  num = randNum(2);

  this.speed = speeds[num];
  this.img = images[num];
  this.ship = game.add.sprite(game.world.randomX,game.world.randomY,this.img);

  this.ship.scale.x = IMAGE_SCALE;
  this.ship.scale.y = IMAGE_SCALE;
  game.physics.arcade.enable(this.ship);
  this.ship.body.velocity.set(this.speed,this.speed);

  var rot = game.physics.arcade.moveToXY(
    this.ship,
    randNum(1000),
    randNum(600),
    this.speed);
  
  // need to account for the different rotation of individual images
  if (this.img == "ship1") offset = -90;
  else  offset = 90;

  this.ship.angle = rot * RADIANS_TO_DEGREES - offset;

  // destination: is this needed? just act on collision with world bounds?
  this.ship.body.collideWorldBounds = false;
  game.physics.arcade.gravity.x = 0;
  this.ship.body.moves = true;

 return this;
}

Ship.prototype.stop = function() {
  this.velocity.x = 0;
  this.velocity.y = 0;
}

Ship.prototype.adjustSpeed = function(spd) {
  var gameSpeed = spd;
  log("Game speed is now " + spd);

  var s, speed, sSpeed;

  for (var i = 0; i< ships.length; i++) {
    var s = ships.getAt(i);
    var ship = shipObj[i];
    
    var velX = s.body.velocity.x;
    var velY = s.body.velocity.y;
    log("Original velocity: " + velX + "," + velY);

    switch(spd) {
      // TODO: Fix this 
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
    
    log("New velocity: " + speedX + "," + speedY);
    s.body.velocity.set(speedX, speedY);
  }
}

function changeSpeed(spd) {
  for (var i = 0; i<shipObj.length; i++) {
    shipObj[i].adjustSpeed(spd);
  } 
}

function stopAllShips() {
 for (var i = 0; i<ships.length; i++) {
      ships.getAt(i).body.velocity.set(0,0);
  }
}