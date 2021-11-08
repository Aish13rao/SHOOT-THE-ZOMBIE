var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombiesGrp, zombieImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life =3;
var gameState = "fighting";
var bullet, bulletsGrp;
var noOfBullets = 50;
var score = 0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  bgImg = loadImage("assets/bg.jpeg");
  winSound = loadSound("assets/win.mp3");
  lostSound = loadSound("assets/lose.mp3");
  explosion = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

   heart1 = createSprite(displayWidth-150, 50, 20, 20);
   heart1.addImage(heart1Img);
   heart1.visible = false; 
   heart1.scale = 0.3

   heart2 = createSprite(displayWidth-150, 50, 20, 20);
   heart2.addImage(heart2Img);
   heart2.visible = false;
   heart2.scale = 0.3

   heart3 = createSprite(displayWidth-150, 50, 20, 20);
   heart3.addImage(heart3Img);
   heart3.visible = true;
   heart3.scale = 0.3

   

   zombiesGrp = new Group();

   bulletsGrp = new Group();


   

}

function draw() {
  background(0); 

  if(gameState === "fighting"){
        zombies();

      if(life === 3){
        heart3.visible = true;
        heart2.visible = false;
        heart1.visible = false;
      }

      if(life === 2){
        heart2.visible = true;
        heart1.visible = false;
        heart3.visible = false;
      }

      if(life === 1){
        heart1.visible = true;
        heart2.visible = false;
        heart3.visible = false;
      }

      if(life === 0){
        gameState = "lost";
        lostSound.play();
      }

      if(score === 100){
        gameState = "won";
        winSound.play();
      }

      if(noOfBullets === 0){
        gameState = "bullet";
        lostSound.play();
      }

        //moving the player up and down and making the game mobile compatible using touches
      if(keyDown("UP_ARROW")||touches.length>0){
        player.y = player.y-30
      }
      if(keyDown("DOWN_ARROW")||touches.length>0){
      player.y = player.y+30
      }

      if(zombiesGrp.isTouching(player)){
        for(var i=0; i<zombiesGrp.length; i++ ){
          if(zombiesGrp[i].isTouching(player)){
            zombiesGrp[i].destroy();
            life = life-1;
            //life--
          }
        }
      }

      
      
      //release bullets and change the image of shooter to shooting position when space is pressed
      if(keyWentDown("space")){
      
        player.addImage(shooter_shooting)
        bullet = createSprite(player.x+80, player.y-30, 10, 5);
        bullet.velocityX = 10;
        bulletsGrp.add(bullet);
        noOfBullets = noOfBullets-1;  
      
      }
      //player goes back to original standing image once we stop pressing the space bar
      else if(keyWentUp("space")){
        player.addImage(shooterImg)
      }


      if(zombiesGrp.isTouching(bulletsGrp)){
        for(var i=0; i<zombiesGrp.length; i++)  {
          if(zombiesGrp[i].isTouching(bulletsGrp)){
            zombiesGrp[i].destroy();
            bulletsGrp.destroyEach();
            score = score+5;
            explosion.play();
          }
        }
      }

      


      drawSprites();

      textSize(30);
      fill("magenta");
      text("Score: "+ score, width/2-100, 80);
      fill("purple");
      text("Bullets: "+ noOfBullets, width/2-250, 80);


   }
   else if(gameState === "lost"){
     textSize(40);
     fill("red");
     text("YOU LOST", windowWidth/2-50, windowHeight/2-100);
     bulletsGrp.destroyEach();
     zombiesGrp.destroyEach();
     player.destroy();
   }

   else if(gameState === "bullet"){
    textSize(40);
    fill("green");
    text("YOU RAN OUT OF BULLETS", windowWidth/2-200, windowHeight/2-100);
    bulletsGrp.destroyEach();
    zombiesGrp.destroyEach();
    player.destroy();
   }

   else if(gameState === "won"){
    textSize(40);
    fill("turquoise");
    text("YOU WON", windowWidth/2-50, windowHeight/2-100);
    bulletsGrp.destroyEach();
    zombiesGrp.destroyEach();
    player.destroy();
   }
  
}

function zombies(){
   if(frameCount%150===0){
    var zombie = createSprite(displayWidth-50, displayHeight-300);
    zombie.y = Math.round(random(displayHeight/2+50, displayHeight-120));
    zombie.addImage(zombieImg);
    zombie.scale = 0.2;
    zombie.velocityX = -2;
    zombiesGrp.add(zombie);
    zombie.debug = true;
    zombie.setCollider("rectangle", 0,0,400,400);
   }
    
    

}
