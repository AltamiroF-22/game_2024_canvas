export default class InputHandler {
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      ////////////// ARROW CONTROLS ////////////
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

      switch (e.key) {
        case "ArrowDown":
          this.lastKey = "PRESS down";
          break;
      }
      switch (e.key) {
        case "ArrowUp":
          this.lastKey = "PRESS up";

          break;
      }

      ////////////// W-A-S-D CONTROLS ////////////
      switch (e.key.toLowerCase()) {
        case "a":
          this.lastKey = "PRESS left";

          break;
      }

      switch (e.key.toLowerCase()) {
        case "d":
          this.lastKey = "PRESS right";

          break;
      }

      switch (e.key.toLowerCase()) {
        case "s":
          this.lastKey = "PRESS down";
          break;
      }

      switch (e.key.toLowerCase()) {
        case "w":
          this.lastKey = "PRESS up";

          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      
      ////////////// ARROW CONTROLS ////////////
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
      switch (e.key) {
        case "ArrowDown":
          this.lastKey = "RELEASE down";

          break;
      }
      switch (e.key) {
        case "ArrowUp":
          this.lastKey = "RELEASE up";

          break;
      }

      ////////////// W-A-S-D CONTROLS ////////////
      switch (e.key.toLowerCase()) {
        case "a":
          this.lastKey = "RELEASE left";

          break;
      }

      switch (e.key.toLowerCase()) {
        case "d":
          this.lastKey = "RELEASE right";

          break;
      }

      switch (e.key.toLowerCase()) {
        case "s":
          this.lastKey = "RELEASE down";

          break;
      }
      switch (e.key.toLowerCase()) {
        case "w":
          this.lastKey = "RELEASE up";

          break;
      }
    });
  }
}
