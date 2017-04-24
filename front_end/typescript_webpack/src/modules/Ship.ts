class Ship {
    row: number;
    column: number;
    isVertical: boolean = true;
    element: HTMLElement;

    constructor(public size: number) {
        this.element = $("<div class='ship'></div>")[0];
    }

    updatePosition(row: number, column: number, isVertical: boolean) {
        this.row = row;
        this.column = column;
        this.isVertical = isVertical;
        this.updateLayout();
    }

    updateLayout() {
        var width = "9.9%";
        var height = "" + (this.size * 9.9) + "%";
        this.element.style.left = "" + (this.column * 10) + "%";
        this.element.style.top = "" + (this.row * 10) + "%";
        this.element.style.width = this.isVertical ? width : height;
        this.element.style.height = this.isVertical ? height : width;
    }

    flipShip() {
        this.isVertical = !this.isVertical;
        if (this.isVertical) {
            if (this.row + this.size > 10) {
                this.row = 10 - this.size;
            }
        } else {
            if (this.column + this.size > 10) {
                this.column = 10 - this.size;
            }
        }
        this.updateLayout();
    }

}

export default Ship;