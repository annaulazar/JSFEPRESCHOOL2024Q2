import {Game} from "./src/game.js"

const game = new Game()
console.log(game)
const cells = document.querySelectorAll(".game__field>div")

draw();
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
        default:
            break;
    }
}

function moveDown() {
    game.moveFigureDown();
    draw();
}

function moveLeft() {
    game.moveFigureLeft();
    draw();
}

function moveRight() {
    game.moveFigureRight();
    draw();
}