const h1 = document.getElementById('score');
let points = 0;
const canvas = document.getElementById('campoJogo');
const ctx = canvas.getContext('2d');

const size = 30;

const snake = [
    { x: 180, y: 300 },
    { x: 150, y: 300 }
];

let direction;
let loopId;

const randomNumber = () => {
    return Math.round(Math.random() * 19) * size;//20 serve para controlar a quantidade de colunas contabilizadas
}

const food = {
    x: randomNumber(),
    y: randomNumber(),
    color: "red"
}

const drawSnake = () => {
    ctx.fillStyle = "gray";
    snake.forEach((position, index) => {//funciona basicamente como um for
        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size);
    })
}

const moveSnake = () => {
    if (!direction) return;
    const head = snake[snake.length - 1];

    snake.shift();//apaga o primeiro elemento do array

    switch (direction) {
        case "right":
            snake.push({ x: head.x + size, y: head.y });
            break;
        case "left":
            snake.push({ x: head.x - size, y: head.y });
            break;
        case "up":
            snake.push({ x: head.x, y: head.y - size });
            break;
        case "down":
            snake.push({ x: head.x, y: head.y + size });
            break;
    }

}

const drawFood = () => {
    ctx.fillStyle = food.color;
    ctx.shadowColor = food.color;
    ctx.shadowBlur = 10;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + 30; i += 30) {//linhas verticais
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
}

const eatVerification = () => {
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {
        snake.push(head);

        let x = randomNumber();
        let y = randomNumber();

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomNumber();
            y = randomNumber();
        }
        food.x = x;
        food.y = y;
        points += 10;
        h1.innerText = points;
    }
}

const checkColision = () => {
    const head = snake[snake.length - 1];
    const neckIndex = snake.length - 2;
    const canvasLimit = canvas.width;

    const wallColision =
        head.x == -30 || head.x == 600 || head.y == -30 || head.y == 600;
        //lado esquerdo    //lado direito

    const selfColision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    })

    if (wallColision || selfColision) {
        gameOver();
    }
}

const gameOver = () => {
    window.location.reload();
}
const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);
    moveSnake();
    drawSnake();
    drawGrid();
    drawFood();
    eatVerification();
    checkColision();

    loopId = setTimeout(() => {
        gameLoop();
    }, 80)
}

gameLoop();

document.addEventListener('keydown', function (tecla) {
    switch (tecla.keyCode) {
        case 39:
            if (direction != "left") {
                direction = "right";
            }
            break;
        case 37:
            if (direction != "right") {
                direction = "left";
            }
            break;
        case 38:
            if (direction != "down") {
                direction = "up";
            }
            break;
        case 40:
            if (direction != "up") {
                direction = "down";
            }
            break;
    }
});
