//ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./shadow_dog.png";
const sprideWidth = 575;
const sprideHeight = 523;

let grameFrame = 0;
const staggerFrames = 4;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: "7"
  },
  {
    name: "jump",
    frames: "7"
  },
  {
    name: "fall",
    frames: "7"
  },
  {
    name: "run",
    frames: "9"
  },
  {
    name: "dizzy",
    frames: "11"
  },
  {
    name: "sit",
    frames: "5"
  },
  {
    name: "roll",
    frames: "7"
  },
  {
    name: "bite",
    frames: "7"
  },
  {
    name: "ko",
    frames: "12"
  },
  {
    name: "getHit",
    frames: "4"
  }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };

  for (let j = 0; j < state.frames; j++) {
    let positioX = j * sprideWidth;
    let positionY = index * sprideHeight;
    frames.loc.push({ x: positioX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(grameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;

  let frameX = sprideWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    sprideWidth,
    sprideHeight,
    0,
    0,
    sprideWidth,
    sprideHeight
  );

  grameFrame++;

  requestAnimationFrame(animate);
};
animate();
