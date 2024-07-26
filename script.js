const canvas = document.getElementById('campoJogo');
const ctx = canvas.getContext('2d');

const size = 30;

const snake = [
    { x: 200, y: 300 },
    { x: 170, y: 300 }
];

const drawSnake = () => {
    ctx.fillStyle = "green";
    snake.forEach((position, index) => {//funciona basicamente como um for
        if (index == snake.length - 1) {
            ctx.fillStyle = "red"
        }
        ctx.fillRect(position.x, position.y, size, size);
    })
}

let direction = "up";
let loopId;
const moveSnake = () => {
    if (!direction) return;
    const head = snake[snake.length - 1];//.at(-1), acessa o último index do array

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
const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);
    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
        gameLoop();
    }, 300)
}

gameLoop();
