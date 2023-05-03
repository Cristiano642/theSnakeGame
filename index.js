const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let food = {x: 0, y: 0};
let snake = {x: 5, y: 5};
let velocity = {x: 0, y: 0};
let snakeBody = [];
let setIntervalId;
let score = 0;

// guardar o High Score

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// passamos um numero random entre 1 e 30 para a posição da comida

const updateFoodPosition = () =>{
    food.x = Math.floor(Math.random() * 30) + 1;
    food.y = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to replay!!!");
    location.reload();
}

// mudar a o valor do Velocity

const changeDirection = e =>{
    switch(e.key){
        case "ArrowUp":
            if(velocity.y != 1){
                velocity.x = 0;
                velocity.y = -1;
            }
            break;
        case "ArrowDown":
            if(velocity.y != -1){
                velocity.x = 0;
                velocity.y = 1;
            }
            break;
        case "ArrowLeft":
            if(velocity.x != 1){
                velocity.x = -1;
                velocity.y = 0;
            }
            break;
        case "ArrowRight":
            if(velocity.x != -1){
                velocity.x = 1;
                velocity.y = 0;
            }
            break;
    }
}

// mudar a direção ao carregar na tecla

controls.forEach(button => button.addEventListener("click", () => changeDirection
({key: button.dataset.key})));




const initGame = () =>{
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`;

    //quando a snake come a comida
    if(snake.x === food.x && snake.y === food.y){
        updateFoodPosition();
        snakeBody.push({x: food.x, y: food.y}); // acresenta comida no array
        score++;
        highScore = score >= highScore ? score : highScore; // se o score > highscore, score = highscore

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // aumetar a snake

    snake.x += velocity.x;
    snake.y += velocity.y;

    // aletrar valores do corpo da snake por 1

    for(let i = snakeBody.length - 1; i>0 ;i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = {x: snake.x, y: snake.y};

    // ver se a cobra esta fora da grid

    if(snake.x <= 0 || snake.x > 30 || snake.y <= 0 || snake.y > 30){
        return gameOver = true;
    }

    // add a div para cada parte do snake body

    for(let i = 0; i < snakeBody.length; i++){
        html += `<div class="head" style="grid-area: ${snakeBody[i].y} / ${snakeBody[i].x}"></div>`;
        if(i !== 0 && snakeBody[0].y === snakeBody[i].y && snakeBody[0].x === snakeBody[i].x){
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

//https://sl.bing.net/6VDNEEk9im