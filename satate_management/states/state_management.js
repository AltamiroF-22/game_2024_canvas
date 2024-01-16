import Player from "./Player.js";
import InputHandler from "./Input.js";
import { drawStatusText } from "./Utils.js";

/*** @type { HTMLCanvasElement} */
const loading = document.getElementById("loading");
loading.style.display = "none";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStatusText(ctx, input);

    player.draw(ctx);
    player.update(input.lastKey);

    requestAnimationFrame(animate);
  };

  animate();
});
