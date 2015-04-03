/* Ship-related functions */

var speeds =  [SHIP1_SPEED, SHIP2_SPEED, UFO_SPEED];
var images = ['ship1', 'ship2', 'ufo'];

function Ship() {
   
  num = randNum(2);

  this.speed = speeds[num];
  this.img = images[num];
  this.ship =  game.add.sprite(game.world.randomX,game.world.randomY,this.img);

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

 return this.ship; 
}

function stopAllShips() {
 for (var i = 0; i<ships.length; i++) {
      ships.getAt(i).body.velocity.set(0,0);
  }
}