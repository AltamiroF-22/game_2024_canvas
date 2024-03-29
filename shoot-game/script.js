/*** @type { HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCanvasctx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
ctx.font = "40px Impact";

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.4 + 0.3;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = (Math.random() * canvas.height) / 2;
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "./images/raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = this.directionX * 10;
    this.randomColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ];
    this.color = `rgb(${this.randomColor[0]},${this.randomColor[1]},${this.randomColor[2]})`;
  }
  update(deltaTime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }

    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltaTime;

    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;

      if (this.directionX > 4.9) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particles(this.x, this.y, this.width, this.color));
        }
      }
    }
    if (this.x < 0 - this.width) gameOver = true;
  }

  draw() {
    collisionCanvasctx.fillStyle = this.color;
    collisionCanvasctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,

      this.width,
      this.height
    );
  }
}

let explosions = [];
class Explosions {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "./images/boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = "../sounds/boom.wav";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 100;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    if (this.frame === 0) this.sound.play();

    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.size / 4,
      this.y,
      this.size,
      this.size
    );
  }
}

let particles = [];
class Particles {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size / 1.4 + Math.random() * 50 - 25;
    this.y = y + this.size / 3 + Math.random() * 50 - 25;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.6;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    // ctx.fillStyle = this.color;
    ctx.fillStyle = "#181818";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const drawScore = () => {
  ctx.fillStyle = "#000";
  ctx.fillText(`Score: ${score}`, 58, 75);
};

const drawGameOver = () => {
  ctx.textAlign = "center";
  ctx.fillStyle = "#000";
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillStyle = "#fff";
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas.width / 2 + 2,
    canvas.height / 2 - 2
  );
};

window.addEventListener("click", (e) => {
  const detectPixelColor = collisionCanvasctx.getImageData(e.x, e.y, 1, 1);
  const pc = detectPixelColor.data;

  ravens.forEach((object) => {
    if (
      object.randomColor[0] === pc[0] &&
      object.randomColor[1] === pc[1] &&
      object.randomColor[2] === pc[2]
    ) {
      //collision by color
      object.markedForDeletion = true;
      score++;
      explosions.push(new Explosions(object.x, object.y, object.width));
    }
  });
});

const animate = (timestamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionCanvasctx.clearRect(0, 0, canvas.width, canvas.height);

  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort(function (a, b) {
      return a.width - b.width;
    });
  }
  drawScore();
  [...particles, ...ravens, ...explosions].forEach((object) =>
    object.update(deltaTime)
  );
  [...particles, ...ravens, ...explosions].forEach((object) => object.draw());
  ravens = ravens.filter((object) => !object.markedForDeletion);
  explosions = explosions.filter((object) => !object.markedForDeletion);
  particles = particles.filter((object) => !object.markedForDeletion);

  if (!gameOver) requestAnimationFrame(animate);
  else drawGameOver();
};

animate(0);
