class Player{
    constructor(name, myBalls){
        this.name = name;
        this.myBalls = myBalls;
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
