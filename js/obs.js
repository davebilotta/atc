/* Functions for adding obstacles */

function newObstacle() {
    var img;
    var r = randNum(1);

    switch (r) {
        case 0:
            img = 'meteorSmall';
            break;
        case 1:
            img = 'meteorLarge';
            break;
        default:
            img = 'meteorSmall';

    }

    var obs = game.add.sprite(game.world.randomX, game.world.randomY, img);

    game.physics.arcade.enable(obs);
    game.physics.arcade.gravity.x = 0;

    obs.body.collideWorldBounds = false;
    obs.body.rotation = randNum(180);
    obs.body.velocity.set(randNum(OBSTACLE_MAX_SPEED), 0);

    obstacles.add(obs);
}

function stopAllObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        obstacles.getAt(i).body.velocity.set(0, 0);
    }
}