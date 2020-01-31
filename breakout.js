
var game = new Phaser.Game(530, 700, Phaser.AUTO, null, {
    preload: preload, create: create, update: update
});
var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var lifeLostText;
var playing = false;
var startButton;
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#000';
    // game.load.image("ball", "assets/ball.png");
    game.load.image('paddle', 'assets/paddlee.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.spritesheet('ball', 'assets/wobble.png', 20, 20);
    game.load.spritesheet('button', 'assets/start.png', 120, 50);
}
function create() {
    // using phisics arcade
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(game.world.width*0.5, game.world.height-70, 'ball');
    ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
    ball.anchor.set(0.5);
    paddle = game.add.sprite(game.world.width*0.5, game.world.height - 50, "paddle");
    paddle.anchor.set(0.5, 1);
    // add physics for ball and paddle
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    // when the ball collide game world, it will be bounce!
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1); // bounce

    // the paddle won't move when the ball hits it
    paddle.body.immovable = true;
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballLeaveScreen, this);
    initBricks();
    textStyle = { font: '18px Arial', fill: '#fff' };
    scoreText = game.add.text(15, 15, 'nCovs: ' + score, textStyle);
    textStyleS = { font: '30px Arial', fill: '#e01d2d' };
    livesText = game.add.text(game.world.width-15, 15, 'Face masks: '+lives, textStyle);
    livesText.anchor.set(1,0);
    lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Putang ina bobo, chơi lại ik', textStyleS);
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;

    startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
    startButton.anchor.set(0.5);


    
}
function update() {
    game.physics.arcade.collide(ball, paddle, ballHitPaddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if(playing) {
        paddle.x = game.input.x || game.world.width*0.5;
    }
}
function initBricks(){
    brickInfo = {
        width: 10,
        height: 7,
        count: {
            row: 22,
            col: 24
        },
        offset: {
            top: 70,
            left: 50
        },
        padding: 10
    }
    bricks = game.add.group();
    for (let i = 0; i < 3; i++) {
        newBrick = game.add.sprite(240, 212 + 17 * i, 'brick')
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(300, 212 + 17 * i, 'brick')
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 10; i++) {
        newBrick = game.add.sprite(260, 76 + 17 * i, 'brick')
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(280, 76 + 17 * i, 'brick')
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 15; i++) {
        newBrick = game.add.sprite(219, 178 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(319, 178 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 16; i++) {
        newBrick = game.add.sprite(199, 178 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(339, 178 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 17; i++) {
        newBrick = game.add.sprite(179, 178 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(359, 178 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 17; i++) {
        newBrick = game.add.sprite(159, 178 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(379, 178 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 17; i++) {
        newBrick = game.add.sprite(139, 195 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(399, 195 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 15; i++) {
        newBrick = game.add.sprite(119, 229 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(419, 229 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 15; i++) {
        newBrick = game.add.sprite(99, 246 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(439, 246 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 13; i++) {
        newBrick = game.add.sprite(79, 280 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(459, 280 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }
    for (let i = 0; i < 6; i++) {
        newBrick = game.add.sprite(59, 365 + 17 * i, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
        newBrickOp = game.add.sprite(479, 365 + 17 * i, 'brick');
        game.physics.enable(newBrickOp, Phaser.Physics.ARCADE);
        newBrickOp.body.immovable = true;
        newBrickOp.anchor.set(0.5);
        bricks.add(newBrickOp);
    }

}
function ballHitBrick(ball, brick) {
    var killTween = game.add.tween(brick.scale);
    killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function(){
        brick.kill();
    }, this);
    killTween.start();
    score++;
    scoreText.text = "nCovs: " + score;

    var count_brick = -1;
    for (i=0; i<bricks.children.length; i++){
        if (bricks.children[i].alive == true) {
		count_brick++;
	}
    }
	console.log(count_brick);
    if (count_brick == 0){
        alert("Uồi vãi l ghê nhờ!!");
        location.reload();
    }
}
function ballLeaveScreen(){
    lives--;
    playing = false;
    if(lives) {
        livesText.setText('Face masks: '+lives);
        lifeLostText.visible = true;
        ball.reset(game.world.width*0.5, game.world.height-70);
        paddle.reset(game.world.width*0.5, game.world.height-50);
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
            playing = true;
        }, this);
    }
    else {
        alert('Cука блять 🐻');
        location.reload();
    }
}
function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
    ball.body.velocity.x = -1*5*(paddle.x-ball.x);
}
function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
}
