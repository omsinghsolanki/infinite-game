var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, man_image,man_collide;
var ground, invisibleGround, groundImage;


var aliensGroup, alien1, alien2, alien3, alien4;

var score;

var gameOverImg,restartImg



function preload(){
  man_image = loadAnimation("man3.png","man2.png");
  man_collide = loadImage("man3.png");
  
  groundImage = loadImage("ground.jpg");
  

  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  alien3 = loadImage("alien3.png");
  alien4 = loadImage("alien4.png");

  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  

}

function setup() {
  createCanvas(500, 220);
  
  ground = createSprite(200,100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  man = createSprite(100,100,20,50);
  man.addAnimation("running", man_image);
  man.addImage("stop",man_collide);

  man.scale = 0.5;
  

  
   gameOver = createSprite(250,90);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(250,160);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.1;
  restart.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create alien and Cloud Groups
  aliensGroup = createGroup();

  

  
  man.setCollider("circle",0,0,40);
  man.debug = false;
  
  score = 0;

  
}

function draw() {
  
  background(180);
  //displaying score
  
  text("Score: "+ score, 400,210);
 
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 250){
      ground.x = ground.width/2
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& man.y >= 150) {
        man.velocityY = -12;
      
    }

    if (score %100==0 && score > 0 ) {
      

    }
    
    //add gravity
    man.velocityY = man.velocityY + 0.8
  
    //spawn the clouds
   
  
    //spawn aliens on the ground
    spawnaliens();
    
    if(aliensGroup.isTouching(man)){
        gameState = END;
       
        
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      man.velocityY = 0
     
      //change the man animation
      man.changeImage("stop",man_collide);
     
      //set lifetime of the game objects so that they are never destroyed
    aliensGroup.setLifetimeEach(-1);
  
     
     aliensGroup.setVelocityXEach(0);
   
     if(mousePressedOver(restart)){
        reset()
     }
   }
  
 
  //stop man from falling down
  man.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnaliens(){
 if (frameCount % 60 === 0){
   var alien = createSprite(400,165,10,40);
   alien.velocityX = -6;
   
    //generate random aliens
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
      case 3: alien.addImage(alien3);
              break;
      case 4: alien.addImage(alien4);
              break;

      default: break;
    }
   
    //assign scale and lifetime to the alien           
    alien.scale = 0.1;
    alien.lifetime = 300;
   
   //add each alien to the group
    aliensGroup.add(alien);
 }
}



function reset() {
  man.changeAnimation("running",man_image);
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  gameState = PLAY;
  aliensGroup.destroyEach();
 
}