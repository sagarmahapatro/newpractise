import * as $ from "jquery";
class Cell {

    element: HTMLElement;
    constructor(public row: number, public column: number) {
        this.element = $("<div class='cell notBombed'></div>")[0];
    }

    cellLocation() {
        return "" + this.row + ", " + this.column;
    }

}

export default Cell;