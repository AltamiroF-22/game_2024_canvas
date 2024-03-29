/*** @type { HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 700);
const CANVAS_HEIGHT = (canvas.height = 500);
// let CANVAS_WIDTH = (canvas.width = window.innerWidth);
// let CANVAS_HEIGHT = (canvas.height = window.innerHeight);

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "./boom.png";
    this.frame = 0;
    this.time = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "../sounds/boom.wav";
  }

  update() {
    if (this.frame === 0) this.sound.play();
    this.time++;
    if (this.time % 8 === 0) {
      this.frame++;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", (e) => {
  createAnimation(e);
});

// window.addEventListener("mousemove", (e) => {
//   createAnimation(e);
// });

const createAnimation = (e) => {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
};

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
};

animate();
