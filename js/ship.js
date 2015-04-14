/* Ship-related functions */

var speeds = [SHIP1_SPEED, SHIP2_SPEED, UFO_SPEED];
var images = ['ship1', 'ship2', 'ufo'];

function Ship(id) {

    num = randNum(2);

    this.speed = speeds[num];
    this.img = images[num];
    this.id = id;
    this.selected = false;
    this.inDanger = false;
    this.moveEvents = new Array();

    // Get spawnX, spawnY, destX, destY
    var spawnCoords = getSpawnCoordinates();

    this.ship = game.add.sprite(spawnCoords[0], spawnCoords[1], this.img);

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
    else offset = 90;

    this.ship.angle = rot * RADIANS_TO_DEGREES - offset;

    // Store original (normal speed velocity)
    var vel = this.ship.body.velocity;
    this.velX = vel.x;
    this.velY = vel.y;

    // Adjust velocity if game speed is altered
    var spd;
    switch (gameSpeed) {
        case "normal":
            spdX = this.velX;
            spdY = this.velY;
            break;
        case "slow":
            spdX = this.velX / SPEED_FACTOR;
            spdY = this.velY / SPEED_FACTOR;
            break;
        case "fast":
            spdX = this.velX * SPEED_FACTOR;
            spdY = this.velY * SPEED_FACTOR;
            break;
    }
    this.ship.body.velocity.set(spdX, spdY);

    // destination: is this needed? just act on collision with world bounds?
    this.ship.body.collideWorldBounds = false;
    game.physics.arcade.gravity.x = 0;
    this.ship.body.moves = true;
    this.ship.inputEnabled = true;


    // add touch event for ship
    this.ship.events.onInputDown.add(shipOnTouch, this);
    this.ship.events.onInputUp.add(shipOnRelease, this);
    //
    this.ship.events.enableDrag = true;
    this.ship.events.onDragStart.add(dragStart, this);
    this.ship.events.onDragStop.add(dragStop, this);


    log("ship's angle is " + this.ship.angle);
    // adjust offset of bounding box because it's rotated

    // 0-45 LU
    // 46-90 RU
    // 91-135 LD
    // 136-180 RD
    var a = Math.abs(this.ship.angle);

    if (a < 45) {
        xoff = 25;
        yoff = -25;
    }
    if (a < 90) {
        xoff = -25;
        yoff = -25;
    }
    if (a < 135) {
        xoff = 25;
        yoff = 25;
    } else {
        xoff = -25;
        yoff = 25;
    }
    //this.ship.body.setSize(40, 40, xoff,yoff);
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

    switch (spd) {
        case "normal":
            speedX = velX;
            speedY = velY;
            break;
        case "slow":
            speedX = velX / SPEED_FACTOR;
            speedY = velY / SPEED_FACTOR;
            break;
        case "fast":
            speedX = velX * SPEED_FACTOR;
            speedY = velY * SPEED_FACTOR;
            break;
        default:
            speedX = velX;
            speedY = velY;
            break;
    }

    // Now set new velocity on ship
    this.ship.body.velocity.set(speedX, speedY);

}

Ship.prototype.addMoveEvent = function(location) {
    this.moveEvents.push(location);
    log("have " + this.moveEvents.length + " move events queued");
}

function shipOnTouch() {
    // TODO: Maybe store off this ship's ID (and a var to say that a ship is currently
    //       selected) so we don't need to search every render?

    log("TOUCH EVENT");
    if (this.selected) {
        this.selected = true;
    } else {
        unSelectAll();
        this.selected = true;
    }
    // findSelectedShip();


    dragEnabled = true;
    log("x pos = " + game.input.x);

}

function shipOnRelease(s) {
    log("RELEASE");

    var pt = new Phaser.Point(game.input.x, game.input.y);

    log(pt.x);
    log(pt.y);

    this.addMoveEvent(pt);
    game.physics.arcade.moveToXY(
        this.ship,
        pt.x,
        pt.y,
        this.speed);

    dragEnabled = false;
}

function dragStart() {
    log("DRAG START");
}

function dragStop() {
    log("DRAG STOP");
}

function unSelectAll() {
    for (var i = 0; i < shipObj.length; i++) {
        shipObj[i].selected = false;
    }
}



function getSpawnCoordinates() {
    // return array of:
    //   0: SpawnX
    //   1: SpawnY
    //   2: DestinationX
    //   3: DestinationY
    var n = randNum(3); // 0 = North, 1 = East, 2 = South, 3 = West
    var r = new Array();
    var w = width;
    var h = height;
    var edgeOff = 25; // border from edges (on either side) where we can spawn
    var offScrn = 25; // offset from screen where we spawn or end up

    var sx, sy, dx, dy;
    switch (n) {
        case 0:
            sx = randN(edgeOff, (width - edgeOff));
            sy = -offScrn;
            dx = randN(edgeOff, (width - edgeOff));
            dy = height + offScrn;
            break;
        case 1:
            sx = width + offScrn;
            sy = randN(edgeOff, (height - edgeOff));
            dx = -offScrn;
            dy = randN(edgeOff, (height - edgeOff));
            break;
        case 2:
            sx = randN(edgeOff, (width - edgeOff));
            sy = height + offScrn;
            dx = randN(edgeOff, (width - edgeOff));
            dy = -offScrn;
            break;
        case 3:
            sx = -offScrn;
            sy = randN(edgeOff, (height - edgeOff));
            dx = width + offScrn;
            dy = randN(edgeOff, (height - edgeOff));
            break;
        default:
            log("***** Default, wasn't expecting this *****");
            break;
    }

    r.push(sx);
    r.push(sy);
    r.push(dx);
    r.push(dy);

    return r;
}

function changeSpeed(spd) {
    gameSpeed = spd;

    for (var i = 0; i < shipObj.length; i++) {
        shipObj[i].adjustSpeed(spd);
    }
}

function stopAllShips() {
    for (var i = 0; i < ships.length; i++) {
        ships.getAt(i).body.velocity.set(0, 0);
    }
}