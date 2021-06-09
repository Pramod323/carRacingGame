var database;
var gameState = 0;
var playerCount;
var form, player, game;
var allPlayers;
var display_position;
var passedFinish;
var cars, car1, car2, car3, car4;
var track, car1_img, car2_img, car3_img, car4_img;
var bronze_img, silver_img, gold_img;
var f1,f2,s;
var finishedPlayers = 0;

function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  f1 = loadImage("images/f1.png");
  s = loadSound("sounds/sliding.mp3");
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
}

function setup(){
    createCanvas(displayWidth-20, displayHeight-30);
    database = firebase.database();

    game = new Game();
    yVel = 0;
    xVel = 0;
    obstacles = createGroup();
    game.getState();
    game.start();
    for (let i = 0; i < 5; i++) {
        w = random(200,950);
        h = random(-height*4,height-300);
        f2 = createSprite(w,h);
        f2.addImage(f1);
        obstacles.add(f2);
    }
}

function draw(){
    background(200, 200, 255);
    if(playerCount===4&&finishedPlayers===0){
        game.update(1);
    }

    if(gameState===1){
        clear();
        game.play();
    }

    if (finishedPlayers===4) {
        game.update(2);
    }
    
    if(gameState === 2 && finishedPlayers===4){
        game.displayRanks();
    }
}
