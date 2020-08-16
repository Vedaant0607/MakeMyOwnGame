var PLAY = 1;
var END = 0;
var SHOOT = 2;
var gameState = PLAY;

var trex,boss,bossImg;
var ground, invisibleGround, groundImage,backdrop,backgroundImg;
var heart1,heart2,heart3,heart4,heart5,heart6,heart7,heart8,heart9,heart10,heartImg,emptyHeartImg;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle;
var hero, hero1, shoot, bullet, bulletImg,enemyBullet;
var score = 0;
var particles = [];
var particle = 0;
var death = 0;
var gameOver, restart;

function preload() {

    cloudImage = loadImage("cloud.png");
    hero = loadAnimation("hero1.png", "hero2.png", "hero3.png", "hero4.png", "hero5.png", "hero6.png", "hero7.png", "hero8.png", "hero9.png", "hero10.png");
    hero1 = loadAnimation("hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png");

    shoot = loadImage("shoot.jpg");

    bulletImg = loadImage("bullet1.png");
    obstacle1 = loadAnimation("bigenemies.png", "bigenemies2.png", "bigenemies3.png", "bigenemies4.png", "bigenemies5.png");
    
    heartImg = loadImage("hearts.png");
    EmptyHeartImg = loadImage("Emptyhearts.png");

    backgroundImg = loadAnimation("bg.jpg","bg.jpg","bg.jpg","bg.jpg");
    bossImg = loadImage("boss.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(800,400);
    trex = createSprite(50, 320, 20, 50);
    trex.addAnimation("PC", hero);
    trex.addAnimation("Croutch", hero1);
    trex.debug = true;
    
     heart1 = createSprite(50,50,10,10);
     heart1.addImage("fullHealth",heartImg);
     heart1.addImage("noHealth",emptyHeartImg);

     /*heart2 = createSprite(70,50,10,10);
     heart2.addImage("fullHealth",heartImg);
     heart2.addImage("noHealth",emptyHeartImg);

     heart3 = createSprite(90,50,10,10);
     heart3.addImage("fullHealth",heartImg);
     heart3.addImage("noHealth",emptyHeartImg);

     heart4 = createSprite(110,50,10,10);
     heart4.addImage("fullHealth",heartImg);
     heart4.addImage("noHealth",emptyHeartImg);

     heart5 = createSprite(130,50,10,10);
     heart5.addImage("fullHealth",heartImg);
     heart5.addImage("noHealth",emptyHeartImg);

     heart6 = createSprite(150,50,10,10);
     heart6.addImage("fullHealth",heartImg);
     heart6.addImage("noHealth",emptyHeartImg);

     heart7 = createSprite(170,50,10,10);
     heart7.addImage("fullHealth",heartImg);
     heart7.addImage("noHealth",emptyHeartImg);

     heart8 = createSprite(190,50,10,10);
     heart8.addImage("fullHealth",heartImg);
     heart8.addImage("noHealth",emptyHeartImg);

     heart9 = createSprite(210,50,10,10);
     heart9.addImage("fullHealth",heartImg);
     heart9.addImage("noHealth",emptyHeartImg);

     heart10 = createSprite(230,50,10,10);
     heart10.addImage("fullHealth",heartImg);
     heart10.addImage("noHealth",emptyHeartImg);
*/
    backdrop = createSprite(400,200,800,400);
    backdrop.addAnimation("background",backgroundImg);
    backdrop.scale = 1.6;
    backdrop.x = backdrop.width / 2;
    backdrop.velocityX = -12;

   

   // ground = createSprite(400, 780, 800, 20);
  //  ground.addImage("ground", groundImage);

  bullet = createSprite(200, 310, 50, 50);
bullet.visible = false


    gameOver = createSprite(500, 400);
    gameOver.addImage("over",gameOverImg);

    restart = createSprite(550, 350);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(400, 330, 800, 10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

}

function draw() {
    background(0);


    if (gameState === PLAY) {
   //     score = score + Math.round(getFrameRate() / 60);
        backdrop.velocityX = -12;

        if (keyDown(UP_ARROW)  ) {
            trex.changeAnimation("PC")
          
        }

        trex.velocityY = trex.velocityY + 0.8

        if (backdrop.x < 0) {
            backdrop.x = backdrop.width / 2;
        }
        if (keyWentDown("R")) {
            spawnBullet();  
            
        }
        
        trex.collide(invisibleGround);
      //  spawnClouds();
        spawnObstacles();
        if (obstaclesGroup.isTouching(bullet)) {
            // console.log(obstaclesGroup)
            console.log("hi")
               obstaclesGroup.destroyEach();
               bullet.visible = false;
               score = score+10;
           }  
        if(score === 2000){
            spawnBoss();
        }

    }

    if(enemyBullet.x = trex.x && death<=1){
       heart1.changeImage("noHealth");
       death = death+1
    }/*
    if(enemyBullet.x = trex.x && death<=2){
        heart2.changeImage("no Health");
        death = death+1
     }
     if(enemyBullet.x = trex.x && death<=3){
        heart3.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=4){
        heart4.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=5){
        heart5.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=6){
        heart6.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=7){
        heart7.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=8){
        heart8.changeImage("no Health");
        death = death+1
     }
 
     if(enemyBullet.x = trex.x && death<=9){
        heart9.changeImage("no Health");
        death = death+1
     }
     if(enemyBullet.x = trex.x && death<=10){
        heart10.changeImage("no Health");
        death = death+1
        gameState = END;
     } */
     else if (gameState === END) {
       
        backdrop.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        enemyBullet.destroy();        
        
        obstaclesGroup.setLifetimeEach(-1);
        textSize(50);
        text("you lose",400,200);
     }  
    drawSprites();
    text("Score: " + score, 500, 50);
     
}

function spawnClouds() {
    if (frameCount % 60 === 0) {

        var cloud = createSprite(800, 120, 40, 10);
        cloud.y = Math.round(random(80, 120));

        cloud.addImage("clouds",cloudImage);
        cloud.scale = 0.5;

        cloud.velocityX = -3;

        cloud.lifetime = 200;

        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;

        cloudsGroup.add(cloud);
    }
}


function spawnObstacles() {
    if (frameCount % 60 === 0) {
        obstacle = createSprite(800, 280, 10, 100);

        obstacle.addAnimation("obstacle", obstacle1);
        obstacle.debug = true;
        //console.log(obstacle.depth)
       //obstacle.scale = 0.9;
       enemyBullet = createSprite(700,250,15,10);
       enemyBullet.velocityX = -30; 
       enemyBullet.shapeColor = color("yellow");
        obstacle.velocityX = -12;

       // obstacle.scale = 0.5;

        obstacle.lifetime = 300;

        obstaclesGroup.add(obstacle);
       
    }
}
function spawnBullet() {
    bullet.x = trex.x;
    bullet.visible = true;
    bullet.addImage("shoot",bulletImg);
    bullet.scale = 0.05
    bullet.velocityX= 50;
    bullet.y = trex.y -20;
    //console.log(bullet.depth)

   
}


function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();



    score = 0;

}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        trex.changeAnimation("Croutch")

    }
}
function spawnBoss(){
   boss = createSprite(650,180,10,10);
   boss.addImage(bossImg);
   boss.scale = 0.3;
}