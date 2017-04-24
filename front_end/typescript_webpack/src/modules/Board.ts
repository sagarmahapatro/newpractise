
import Cell from "./Cell";
import Ship from "./Ship";
import * as $ from "jquery";

class Board {
    ships: Ship[];
    cells: Cell[][];
    playerTurn: boolean = false;
    onEvent: Function;
    shipSizes = [5, 4, 3, 3, 2];

    private positioningEnabled: boolean;

    constructor(public element: HTMLElement, playerBoard: boolean = true) {
        this.positioningEnabled = playerBoard;
        this.ships = [];
        this.cells = [];

        let cell: Cell = null;

        for (var row = 0; row < 10; row++) {
            this.cells[row] = [];
            for (var column = 0; column < 10; column++) {
                cell = new Cell(row, column);
                this.cells[row][column] = cell;
                element.appendChild(cell.element);
                $(cell.element).data(cell.cellLocation());
                if (playerBoard) {
                    $(cell.element).droppable(
                        {
                            disabled: false,
                            drop: (event, ui) => {
                                var shipElement = <HTMLElement>ui.draggable[0];
                                var shipIndex: number = $(shipElement).data("shipIndex");
                                var ship = this.ships[shipIndex];
                                var shipX = Math.round(shipElement.offsetLeft / cell.element.offsetWidth);
                                var shipY = Math.round(shipElement.offsetTop / cell.element.offsetHeight);
                                ship.updatePosition(shipY, shipX, ship.isVertical);
                            }
                        }
                    );
                }
            }
        }

        var referenceCell = $(cell.element);
        for (var i = 0; i < this.shipSizes.length; i++) {
            var ship = new Ship(this.shipSizes[i]);
            this.ships[i] = ship;
            ship.updatePosition(i, 0, false);
            if (playerBoard) {
                this.element.appendChild(ship.element);
                ship.updateLayout();
                $(ship.element).data("shipIndex", i).draggable({
                    disabled: false,
                    containment: 'parent',
                    // Reduce size slightly to avoid overlap issues blocking the last cell
                    grid: [referenceCell.width() * 0.99 + 2, referenceCell.height() * 0.99 + 2],
                    cursor: 'crosshair'
                }).click((event: JQueryEventObject) => {
                    if (this.positioningEnabled) {
                        var shipIndex: number = $(event.target).data("shipIndex");
                        this.ships[shipIndex].flipShip();
                    }
                });
            }
        }

        $(window).resize((evt) => {
            $(this.element).children(".ship").draggable("option", "grid", [referenceCell.width() * 0.99 + 2, referenceCell.height() * 0.99 + 2]);
        });

        if (!playerBoard) {
            // Computer board, this is where the player clicks to bomb
            $(element).click((evt: JQueryEventObject) => this.onCellClick(evt));
        }

        console.log(" board ");
        console.dir(element);
    }

    onCellClick(evt: JQueryEventObject) {
        var x = <HTMLElement>evt.target;
        if ($(x).hasClass("cell") === false) {
            return;
        }
        if (!this.playerTurn) {
            this.onEvent.call(this, 'click');
        }
        if (this.playerTurn) {       // May be updated by prior onEvent call, so check again
            this.bombCell(x);
        }
    }
  
  bombCell(e:HTMLElement){
     var cellPos = Cell.parseCellLocation($(cellElem).data("cellLocation"));
        var cell = this.cells[cellPos.row][cellPos.column];

        if (cell.hasHit) {
            return;  // Already been clicked on
        }
  }

}
export default Board;
