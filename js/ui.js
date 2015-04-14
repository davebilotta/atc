var gameOverState = {
    init: function() {},

    preload: function() {},

    create: function() {
        //game.stage.backgroundColor = '#6d94b5';

        var w = game.cache.getImage('overlay').width;
        var h = game.cache.getImage('overlay').height;
        var overlay = game.add.image((width - w) / 2, (height - h) / 2, 'overlay');

        gameOverText = game.add.text(game.world.centerX, game.world.centerY, ("GAME OVER"), {
            font: "60px " + fontFace,
            fill: "#ff0044",
            align: "center",
            anchor: "center"
        });

        gameOverText.anchor.set(0.5);
    },

    update: function() {}
};

function gamePause() {
    game.paused = true;

    var w = game.cache.getImage('overlay').width;
    var h = game.cache.getImage('overlay').height;
    var overlay = game.add.image((width - w) / 2, (height - h) / 2, 'overlay');

    var pauseText = game.add.text(game.world.centerX, game.world.centerY, ("GAME PAUSED\nClick to continue"), {
        font: "35px " + fontFace,
        fill: "#ffffff",
        align: "center"
    });

    pauseText.anchor.set(0.5);

    game.input.onDown.add(function() {
        game.paused = false;
        // Destroy everything used to render pause overlay
        pauseText.destroy();
        overlay.destroy();
    }, this);
}

function updateUI() {
    // TODO: change this back to score once testing is done 
    var s = numShips;

    scoreText.setText("Score: " + pad(s));
    //	log("width: " + scoreText.width);
    //	scoreText.x = (width - scoreText.width);
}

function highlightSelectedShip(id) {
    var s = shipObj[id].ship;

    selCircle = new Phaser.Circle(s.body.x, s.body.y, Math.max(s.body.width, s.body.height));
    selCircle.angle = s.angle;

    game.debug.geom(selCircle, '#ffffff');


}

// Can this be stored when the touch event occurs so it doesn't need to be found every time?
function findSelectedShip() {
    var r = -1;
    var done = false;

    for (var i = 0;
        (i < shipObj.length & (!done)); i++) {
        if (shipObj[i].selected) {
            r = shipObj[i].id;
            done = true;
        }
    }

    return r;
}