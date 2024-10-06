import {
    FIELD_COLUMNS,
    FIELD_ROWS,
    FIGURES,
    FIGURE_COLORS
} from "./constants.js";

export class Game {
    score = 0;
    lines = 0;
    level = 1;
    playfield = new Array(FIELD_ROWS).fill()
        .map(() => new Array(FIELD_COLUMNS).fill(0));
    // row = -2;
    row = 3;

    constructor() {
        const randomFigure = this.getRandomFigure();
        this.activeFigure = randomFigure.figure;
        this.color = randomFigure.color;
        this.column = FIELD_COLUMNS / 2 - Math.floor(this.activeFigure.length / 2);
    }

    getRandomFigure() {
        let index = Math.floor(Math.random() * FIGURES.length);
        return {
            figure: FIGURES[index],
            color: FIGURE_COLORS[index]
        }
    }

    getCellIndex(row, column) {
        return row * FIELD_COLUMNS + column;
    }

    moveFigureDown() {
        this.row += 1;
    }

    moveFigureLeft() {
        this.column -= 1;
    }

    moveFigureRight() {
        this.column += 1;
    }

    rotateFigure() {
        
    }
}