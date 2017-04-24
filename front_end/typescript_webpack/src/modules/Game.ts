import Board from "./Board";
import * as $ from "jquery";

class Game {
    static gameState = { begin: 0, computerTurn: 1, playerTurn: 2, finished: 3 };
    static messsages = {
        gameStart: "Drag your ships to the desired location on your board (on the right), then bomb a square on the left board to start the game!",
        invalidPositions: "All ships must be in valid positions before the game can begin.",
        wait: "Wait your turn!",
        gameOn: "Game on!",
        hit: "Good hit!",
        shipSunk: "You sunk a ship!",
        lostShip: "You lost a ship :-(",
        lostGame: "You lost this time. Click anywhere on the left board to play again.",
        allSunk: "Congratulations!  You won!  Click anywhere on the left board to play again."
    };

    playerBoard: Board;
    computerBoard: Board;
    state = Game.gameState.begin;

    constructor() {
        this.updateStatus(Game.messsages.gameStart);
        this.playerBoard = new Board($("#playerBoard")[0]);
        this.computerBoard = new Board($("#computerBoard")[0]);
    }

    private computerTurn() {

    }

    private startGame() {

    }

    private updateStatus(msg: string) {
        $("#status").slideUp('fast', function () {  // Slide out the old text
            $(this).text(msg).slideDown('fast');  // Then slide in the new text
        });
    }

}
export default Game;