//declare sprite variables and their respective images
var bot, botRunning, botCollided;
var ground, groundImage;
var invisibleGround;

var grass1, grass2, grass3, grass4;
var candy;
var rock1, rock2, rock3;

var kangroo;

var gameOver, gameOverImage;
var restart, restartImage;

//declare score variable
var score = 0;

//declare sound variables
var checkPoint;
var jump;
var die;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  botRunning = loadAnimation("images/bot_run.jpg", "bot_collided.jpg");
  botCollided = loadImage("images/bot_collided.jpg");
  gameOverImage = loadImage("images/gameOver.jpg");
  restartImage = loadImage("images/restart.jpg");
  kangroo = loadImage("images/kangroo.jpg");
  checkPoint = loadSound('sounds/checkPoint.mp3');
  jump = loadSound('sounds/jump.mp3');
  die = loadSound('sounds/die.mp3');
}

function setup() {

  createCanvas(400, 400);

  //create a bot sprite, addImage and scale it
    bot = createSprite(50,350,20,50);
    bot.addAnimation("running", botRunning);
    bot.addAnimation("collided", botCollided);
    bot.scale = 0.6;

  //set collision radius for the bot
    bot.setCollider("rectangle",0,0,50, bot.height);
    bot.debug = true;

//create a ground sprite
  ground = new Ground(200,380,400,20);
  ground.addImage("ground2", groundImage);
  ground.x = ground.width /2;

//invisible Ground to support bot
  invisibleGround = new Ground(200,385,400,5);
  invisibleGround.visible = false;

//rock sprites
  rock1 = new Rock();
  rock2 = new Rock();
  rock3 = new Rock();

//grass sprites
  grass1 = new Grass();
  grass2 = new Grass();
  grass3 = new Grass();

//place gameOver and restart icon on the screen
  gameOver = createSprite(200,300);
  restart = createSprite(200,340);

  gameOver.addImage("gameOverImage");
  gameOver.scale = 0.5;
  restart.addImage("restartImage");
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

}

function draw() {
  background(220);

  //set text
    textSize(20);
    textFont("Georgia");
    textStyle(BOLD);

  //display score
  text("Score: "+ score, 250, 100);

  if(gameState === PLAY){

    if (score > 0 && score % 100 === 0){
      checkPoint.play();
    }
    
/*
    //move the ground
    ground.velocityX = -(6 + score/100);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
*/

    //scoring
    score++

     //jump when the space key is pressed
    if(keyDown("space") && bot.y >= 332){
       bot.velocityY = -16 ;
       jump.play();

      //change the bot animation
        bot.changeAnimation("collided", botCollided);
    }
    else {

      //change the bot animation
        bot.changeAnimation("runnning", botRunning);
    }

    //change the bot animation when in air
    if(bot.y <= 329){

      //change the bot animation
        bot.changeAnimation("collided", botCollided);
    }
    else if(bot.y >= 329){

      //change the bot animation
        bot.changeAnimation("runnning", botRunning);
    }

    //add gravity
    bot.velocityY = bot.velocityY + 0.8;

/*
    //spawn the rocks
    spawnRocks();

    //spawn the candies
    spawnCandy();

    //spawn grass
    spawnGrass();
*/

    //End the game when bot is touching a rock
    if(rock1.isTouching(bot) || rock2.isTouching(bot) || rock3.isTouching(bot)) {
      gameState = END;
      die.play();
    }
  }

  else if(gameState === END) {

    //reset the bot to its original place
    //bot.x = 50;
    //bot.y = 350;

    //change the bot animation
    bot.changeAnimation("bot_collided");

    gameOver.visible = true;
    restart.visible = true;

    //set lifetime of the game objects so that they are never destroyed
    grass1.setLifeTime = 0;
    grass2.setLifeTime = 0;
    grass3.setLifeTime = 0;
    grass4.setLifeTime = 0;

    rock1.setLifeTime = 0;
    rock2.setLifeTime = 0;
    rock3.setLifeTime = 0;

    candy.setLifeTime = 0;

  }

  if(mousePressedOver(restart)) {
    reset();
  }

  console.log(bot.y);

  //stop bot from falling down
  bot.collide(invisibleGround);

  drawSprite();
}

function reset(){

//Change the gameState back to play
  gameState = PLAY;

//Make the gameOver and restart sprites disappear
  gameOver.visible = false;
  restart.visible = false;

//Destroy the grass, rocks and candies
  grass1.destroy();
  grass2.destroy();
  grass3.destroy();
  grass4.destroy();

  rock1.destroy();
  rock2.destroy();
  rock3.destroy();

  candy.destroy();

//Reset the score
  score = 0;

//Change the bot animation
    bot.changeAnimation("bot_run");
}

function spawnCandy() {
  //write code here to spawn the candy
  if (frameCount % 70 === 0) {
    var candy = new Candy(400,randomNumber(150,250),40,10);
    candy.addAnimation("lollipop");
    candy.scale = 0.5;
    candy.velocityX = 0;

    //assign lifetime to the variable
    candy.lifetime = 134;

    //adjust the depth
    candy.depth = bot.depth;
    bot.depth = bot.depth + 1;

    //candy.debug = true;
  }
}

function spawnGrass() {
  if(frameCount % 50 === 0) {
    var grass = new Grass(400,350,10,40);
    grass.velocityX = 0;

    //generate random grass
    var rand = randomNumber(1,4);
    grass.setAnimation("grass" + rand);

    //assign scale and lifetime to the grass
    grass.scale = 0.5;
    grass.lifetime = 70;

    //adjust the depth
    grass.depth = bot.depth;
    bot.depth = bot.depth + 1;
  }
}

function spawnRocks() {
  if(frameCount % 110 === 0) {
    var rock = new Rock(400,350,10,40);
    rock.velocityX = 0;

    //generate random grass
    var rand = randomNumber(1,3);
    rock.setAnimation("rock" + rand);

    //assign scale and lifetime to the grass
    rock.scale = 0.5;
    rock.lifetime = 70;

    //adjust the depth
    rock.depth = bot.depth;
    bot.depth = bot.depth + 1;

    rock.setCollider("rectangle",0,0,90,50);
    rock.debug = true;

    //add each rock to the group
    RocksGroup.add(rock);
  }
}
