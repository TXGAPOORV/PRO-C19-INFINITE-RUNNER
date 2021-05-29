 var bg,bgImg,diver,diverImg,diver1Img,ground;
var obstacle1,obstacle2,obstacle3,obstacle4,obstaclesGroup;

var PLAY =1;
var END =0;
var gameState = PLAY;
var die,gameover,restart,restartImg,gameoverImg,checkpoint;


function preload(){
  bgImg=loadImage("underwater.png");
  diverImg=loadAnimation("diver1.png","diver2.png");
  diver1Img=loadImage("diver1.png");
  gameoverImg=loadImage("images.png");
  restartImg=loadImage("restart.png");
  obstacle1=loadImage("shark.png");
  obstacle2=loadImage("stone1.png");
  obstacle3=loadImage("stone2.png");
  obstacle4=loadImage("whale.png");
  die=loadSound("die.mp3");

  
}

function setup(){
  createCanvas(1000,600)

  bg=createSprite(500,300);
  bg.addImage("bg",bgImg);
  bg.scale=0.9;

  diver=createSprite(800,400,50,50);
  diver.addImage("diver",diver1Img)
  diver.setCollider("rectangle",0,0,diver.width,diver.height);

  ground=createSprite(550,550,1000,50);
  
  
    gameOver = createSprite(500,300);
  gameOver.addImage(gameoverImg);
  
  restart = createSprite(500,450);
  restart.addImage(restartImg);
  

  
  obstaclesGroup=new Group();

  score=0;
}

function draw(){
  background("blue");
 
  
  createEdgeSprites();
  
  if(gameState === PLAY){

      gameOver.visible = false;
    restart.visible = false;
    
    bg.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      
    }
   
    if (bg.x <  0){
     bg.x = bg.width/6;
    }
    
  if(keyWentDown("space")&& diver.y >= 100) {
        diver.velocityY = -12;
        diver.addAnimation("diver1",diverImg)
        diver.changeAnimation("diver1");
    }
    
    //add gravity
    diver.velocityY = diver.velocityY +0.5             
  
  
 if(diver.isTouching(ground)){
   diver .velocityY=-8;
   diver.velocityY=diver.velocityY+0.5
   
 } 

  ground.y=550;   
  ground.visible=false;
  
  if(diver.y>560){
    diver.y=400;
     
  }
    spawnObstacles();
        
    if(obstaclesGroup.isTouching(diver)){

        gameState = END;
        die.play()
      
    }
  } else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
  
      diver.visible=false;
     
     
      bg.velocityX = 0;
      diver.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
 
     
     obstaclesGroup.setVelocityXEach(0);

   }
  
 

  
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}

function reset(){
  gameState=PLAY;
  diver.x=600; 
  diver.y=400
  gameOver.visible=false;
  restart.visible=false;
  diver.visible=true; 
  
 
  
  obstaclesGroup.destroyEach();
   
  score=0;  

}

  
  
  

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(100,100 ,10,40);
   obstacle.y = Math.round(random(80,420));
   obstacle.scale=2; 
   obstacle.velocityX = (6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);

   obstacle.setCollider("rectangle",0,0,1,2);
 }
}
