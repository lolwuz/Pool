class Player{
    constructor(name){
        this.name = name;
        this.myBalls = null;
        this.ballsPocketed = [];
        this.isMyTurn = false;
    };

    pocketBall(Ball){
        this.ballsPocketed.push(Ball);
    };

    win(){
        // When player wins a game.
    }
}
