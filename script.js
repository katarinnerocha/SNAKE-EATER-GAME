// MAPEAMENTO DOS ELEMENTOS - MAPPING OF ELEMENTS
const mainMenu = document.getElementById('main-menu');
const gameScene = document.getElementById('game-scene');
const scoreElement = document.getElementById('score');
const msgElement = document.getElementById('message');
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

// CONFIGURAÇÕES GERAIS - GENERAL SETTINGS
const box = 20; 
let snake;
let direction;
let food;
let score;
let gameLoop; // Variável para guardar o setInterval - Variable to hold the setInterval

// INDICA AS SETAS PARA MOVER A COBRA - INDICATES THE ARROWS TO MOVE THE SNAKE
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// INICIAR O JOGO - START THE GAME
function startGame() {
    mainMenu.classList.add('hidden');
    gameScene.classList.remove('hidden');
    
    // Reinicia os dados - Resets the data
    snake = [{ x: 10 * box, y: 10 * box }];
    score = 0;
    scoreElement.innerText = score;
    direction = "RIGHT";
    generateFood();

    showMessage();

    // Limpa o loop anterior (se houver) e inicia um novo - Clears the previous loop (if any) and starts a new one
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(draw, 100);
}

// GERAR COMIDA EM LOCAL ALEATÓRIO PROPORCIONAL AO CANVAS - GENERATE FOOD IN A RANDOM LOCATION PROPORTIONAL TO THE CANVAS
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// INSTRUNÇÕES FIXAS NA TELA - FIXED INSTRUCTIONS ON THE SCREEN
function showMessage() {
    msgElement.classList.remove('hidden');
}

// BOTÃO DE SAIR E VOLTAR AO MENU - EXIT BUTTON AND RETURN TO MENU
function closeGame() {
    clearInterval(gameLoop); // Para a cobra - Stops the snake
    gameScene.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

// LÓGICA PRINCIPAL DE DESENHO E MOVIMENTAÇÃO - MAIN LOGIC FOR DRAWING AND MOVEMENT
function draw() {
    // LIMPA O RASTRO ANTERIOR - CLEARS THE PREVIOUS TRAIL
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // DESENHA A COMIDA - DRAWS THE FOOD
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // DESENHA A COBRA - DRAWS THE SNAKE
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // PEGA A POSIÇÃO DA CABEÇA ATUAL - GETS THE CURRENT HEAD POSITION
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // MOVE A CABEÇA - MOVES THE HEAD
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    

    // COLISÃO COM A PAREDE (GAME OVER) - COLLISION WITH THE WALL (GAME OVER)
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        alert("GAME OVER! final score : " + score);
        closeGame();
        return;
    }

    // COLISÃO COM O PRÓPRIO CORPO (GAME OVER) - COLLISION WITH THE OWN BODY (GAME OVER)
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            alert("GAME OVER! final score : " + score);
            closeGame();
            return;
        }
    }

    // LÓGICA PARA A COBRA CRESCER E PONTUAR - LOGIC FOR THE SNAKE TO GROW AND SCORE
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreElement.innerText = score;
        generateFood();
    } else {
        snake.pop();
    }

    // ADICIONA A NOVA CABEÇA - ADDS THE NEW HEAD
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}