import {
    FIELD_COLUMNS,
    FIELD_ROWS,
    FIGURES,
    FIGURE_COLORS,
    SCORES,
    CNT_LINES_FOR_LEVEL
} from "./constants.js";
import {rotateMatrix} from "./utils.js"


export class Game {
    score = 0;
    lines = 0;
    level = 1;
    isGameOver = false;
    playfield = new Array(FIELD_ROWS).fill()
        .map(() => new Array(FIELD_COLUMNS).fill(0));
    row = -2;

    constructor() {
        this.getRandomFigure();
    }

    getRandomFigure() {
        let index = Math.floor(Math.random() * FIGURES.length);
        this.activeFigure = FIGURES[index];
        this.color = FIGURE_COLORS[index];
        this.column = FIELD_COLUMNS / 2 - Math.floor(this.activeFigure.length / 2);
        this.row = -2;
    }

    getCellIndex(row, column) {
        return row * FIELD_COLUMNS + column;
    }

    moveFigureDown() {
        this.row += 1;
        if (this.isFigureOutOf()) {
            this.row -= 1;
            this.fixFigure();
        }
    }

    moveFigureLeft() {
        this.column -= 1;
        if (this.isFigureOutOf()) {
            this.column += 1;
        }
    }

    moveFigureRight() {
        this.column += 1;
        if (this.isFigureOutOf()) {
            this.column -= 1;
        }
    }

    rotateFigure() {
        const oldMatrix = this.activeFigure;
        const newMatrix = rotateMatrix(this.activeFigure);
        this.activeFigure = newMatrix;
        if (this.isFigureOutOf()) {
            this.activeFigure = oldMatrix
        }
    }

    isFigureOutOf() {
        const size = this.activeFigure.length;
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                if (!this.activeFigure[row][column]) continue;
                if (this.column + column < 0 ||
                    this.column + column >= FIELD_COLUMNS ||
                    this.row + row >= FIELD_ROWS) return true;
                if (this.playfield[this.row + row]?.[this.column + column]) return true
            }
        }
        return false
    }

    fixFigure() {
        const size = this.activeFigure.length;
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                if (!this.activeFigure[row][column]) continue;
                if (this.row + row < 0) {
                    this.isGameOver = true;
                    return;
                }
                this.playfield[this.row + row][this.column + column] = this.color;
            }
        }
        this.removeFilledRows();
        this.getRandomFigure();
    }

    removeFilledRows() {
        const filledRows = this.findFilledRows();
        filledRows.forEach(row => this.offsetRow(row));
    }

    findFilledRows() {
        const filledRows = [];
        for (let row = 0; row < FIELD_ROWS; row++) {
            if (this.playfield[row].every(cell => Boolean(cell))) {
                filledRows.push(row);
            }
        }
        const cntFilledRows = filledRows.length;
        if (cntFilledRows) {
            this.lines += cntFilledRows;
            this.score += SCORES[cntFilledRows - 1];
            if (this.lines - this.level * CNT_LINES_FOR_LEVEL >= 0) {
                this.level += 1;
            }
        }
        return filledRows;
    }

    offsetRow(deletedRow) {
        for (let row = deletedRow; row > 0; row--) {
            this.playfield[row] = this.playfield[row - 1]
        }
        this.playfield[0] = new Array(FIELD_COLUMNS).fill(0);
    }
}