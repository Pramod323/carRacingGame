class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    car1 = createSprite(180,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(380,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(580,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(780,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    passedFinish = false;

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = 200 +(index*200)+allPlayers[plr].xPos;

        //use data form the database to display the cars in y direction 
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          if (cars[index-1].isTouching(obstacles)) {
            s.play();
            yVel-=0.9;
          }
        }
      }
    }

    if (player.distance<3660) {
      if(keyIsDown(38) && player.index !== null){
        yVel+=0.9;
        if (keyIsDown(37)) {
          xVel-=1;
        }
        if (keyIsDown(39)) {
          xVel+=1;
        }
      }
      else if(keyIsDown(40) && yVel > 0 && player.index !== null){
        yVel -= 0.9;
        xVel -= 0.9;
      }
      
      //move the car
      player.distance+=yVel;
      yVel*=0.98;
      player.xPos+=xVel;
      xVel*=0.2;
      player.update();
    }else if(passedFinish === false){
      xVel*=0.99;
      yVel*=0.99;

      Player.updateFinishedPlayers();
      player.place= finishedPlayers;

      player.update();
      passedFinish = true;
    }

    drawSprites();
  }  
  
  displayRanks(){
    camera.position.x = 0;
    camera.position.y = 0;
    
    imageMode(CENTER);
    Player.getPlayerInfo();

    image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(gold_img, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);

    for(var plr in allPlayers){
      if(allPlayers[plr].place===1){
        text("1st: " + allPlayers[plr].name, 0, 85);
      }else if (allPlayers[plr].place === 2){
        text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }else if(allPlayers[plr].place === 3){
        text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
      }else{
        textSize(30);
        text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
      }
    }
  }
}
