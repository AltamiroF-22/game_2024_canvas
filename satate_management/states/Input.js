export default class InputHandler {
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = "PRESS left";

          break;
      }
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = "PRESS right";

          break;
      }
      /*
      switch (e.key) {
        case "ArrowUp":
          this.lastKey = "PRESS up";

          break;
      }
      switch (e.key) {
        case "ArrowDown":
          this.lastKey = "PRESS down";

          break;
      }
      */
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = "RELEASE left";

          break;
      }
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = "RELEASE right";

          break;
      }
      /*
      switch (e.key) {
        case "ArrowUp":
          this.lastKey = "RELEASE up";

          break;
      }
      switch (e.key) {
        case "ArrowDown":
          this.lastKey = "RELEASE down";

          break;
      }
      */
    });
  }
}
