import {Game} from "./src/game.js"
import {FIELD_COLUMNS, FIELD_ROWS} from "./src/constants.js";

const game = new Game();
window.game = game;
console.log(game);
const cells = document.querySelectorAll(".game__field>div");
const score = document.querySelector(".score__value");
const lines = document.querySelector(".lines__value");
const level = document.querySelector(".level__value");

let requestId;
let timeoutId;

moveDown();
document.addEventListener("keydown", onKeydown);

function draw() {
    cells.forEach(cell => cell.removeAttribute("class"));
    const size = game.activeFigure.length;
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            if (!game.activeFigure[row][column]) continue;
            if (game.row + row < 0) continue;
            const cellIndex = game.getCellIndex(game.row + row, game.column + column);
            cells[cellIndex].classList.add(game.color)
        }
    }
    for (let row = 0; row < FIELD_ROWS; row++) {
        for (let column = 0; column < FIELD_COLUMNS; column++) {
            if (!game.playfield[row][column]) continue;
            const cellIndex = game.getCellIndex(row, column);
            cells[cellIndex].classList.add(game.playfield[row][column])
        }
    }
}

function onKeydown(event) {
    switch (event.key) {
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            rotate();
            break;
        default:
            break;
    }
}

function moveDown() {
    game.moveFigureDown();
    draw();
    stopLoop();
    startLoop();
    score.innerHTML = String(game.score);
    lines.innerHTML = String(game.lines);
    level.innerHTML = String(game.level);

    if (game.isGameOver) {
        gameOver();
    }

}

function moveLeft() {
    game.moveFigureLeft();
    draw();
}

function moveRight() {
    game.moveFigureRight();
    draw();
}

function rotate() {
    game.rotateFigure();
    draw();
}

function startLoop() {
    const timeout = 1000 / game.level;
    timeoutId = setTimeout(() => requestId = requestAnimationFrame(moveDown), timeout);
}

function stopLoop() {
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
}

function gameOver() {
    stopLoop();
    document.removeEventListener("keydown", onKeydown);
    gameOverAnimation();
}

function gameOverAnimation() {
    for (let i = 0; i < cells.length; i++) {
        const ind = cells.length - i - 1;
        setTimeout(() => {
            cells[ind].removeAttribute("class");
            cells[ind].classList.add("finish");
        }, 100 * (i ** 0.5));
    }
}