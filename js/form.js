class Form{
    constructor(){
        this.input = createInput("").attribute("placeHolder", "Name ");
        this.button = createButton('Play');
        this.title = createElement('h2');
        this.greeting = createElement('h2');
        this.reset = createButton('Reset');
    }

    hide(){
        this.button.hide();
        this.greeting.hide();
        this.input.hide();
        this.title.hide();  
    }

    display(){
        this.title.html("Car Racing Game");
        this.title.position(displayWidth/500*150,0);

        this.input.position(displayWidth/500*150, displayHeight/500*160);
        this.button.position(displayWidth/500*300, displayHeight/500*200);
        this.reset.position(displayWidth-100,20);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();

            this.greeting.html("Hello "+ player.name);
            this.greeting.position(displayWidth/500*200, displayHeight/500*190)
            playerCount += 1;
            player.index = playerCount
            player.updateCount(playerCount);
            player.update();
        })

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);

            database.ref('/').update({
                players: null,
                finishedPlayers: 0
            })
        })
    }
}