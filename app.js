const canvas = document.querySelector("#MyCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = [];
function creatsnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawfruit() {
    ctx.fillStyle = "#EDF1D6";
    ctx.shadowColor = "#EDF1D6";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(this.x, this.y, unit, unit);
  }
  pick() {
    let check = false;
    let newx;
    let newy;

    function checkover(newx, newy) {
      for (i = 0; i < snake.length; i++) {
        if (newx == snake[i].x && newy == snake[i].y) {
          check = true;
        } else {
          check = false;
        }
      }
    }

    do {
      newx = Math.floor(Math.random() * column) * unit;
      newy = Math.floor(Math.random() * row) * unit;
      checkover(newx, newy);
    } while (check);
    this.x = newx;
    this.y = newy;
  }
}
creatsnake();
let myfruit = new Fruit();
console.log(myfruit.x);

let d = "right";

function change(e) {
  if (e.key == "ArrowLeft" && d != "right") {
    d = "left";
  } else if (e.key == "ArrowRight" && d != "left") {
    d = "right";
  } else if (e.key == "ArrowUp" && d != "down") {
    d = "up";
  } else if (e.key == "ArrowDown" && d != "up") {
    d = "down";
  }
  window.removeEventListener("keydown", change);
}
window.addEventListener("keydown", change);

function highterScore() {
  if (localStorage.getItem("hightScore") == null) {
    hightScore = 0;
  } else {
    hightScore = Number(localStorage.getItem("hightScore"));
  }
}

function sethighterScore(score) {
  if (score > hightScore) {
    localStorage.setItem("hightScore", score);
    hightScore = score;
  }
}
let sum = 0;
let hightScore;
highterScore();
document.getElementById("score").innerHTML = `目前分數為：${sum}`;
document.getElementById("score2").innerHTML = `最高分數為：${hightScore}`;
function draw() {
  for (i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(game);
      alert("遊戲結束");
      return;
    }
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myfruit.drawfruit();
  for (i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "#EDF1D6";
      ctx.shadowColor = "#EDF1D6";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.fillStyle = "#9DC08B";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    ctx.strokeStyle = "#609966";
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  let snakex = snake[0].x;
  let snakey = snake[0].y;
  if (d == "right") {
    snakex += unit;
  } else if (d == "left") {
    snakex -= unit;
  } else if (d == "up") {
    snakey -= unit;
  } else if (d == "down") {
    snakey += unit;
  }
  let newhead = {
    x: snakex,
    y: snakey,
  };

  if (newhead.x == myfruit.x && newhead.y == myfruit.y) {
    myfruit.pick();
    snake.push(snake);
    sum++;
    sethighterScore(sum);
    document.getElementById("score").innerHTML = `目前分數為：${sum}`;
    document.getElementById("score2").innerHTML = `最高分數為：${hightScore}`;
  }
  snake.pop();
  snake.unshift(newhead);
  if (newhead.x == canvas.width) {
    newhead.x = 0;
  } else if (newhead.x == 0 - unit) {
    newhead.x = canvas.width;
  } else if (newhead.y == canvas.height) {
    newhead.y = 0;
  } else if (newhead.y == 0 - unit) {
    newhead.y = canvas.height;
  }
  window.addEventListener("keydown", change);
}
let game = setInterval(draw, 100);
