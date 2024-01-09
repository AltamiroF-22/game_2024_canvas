window.addEventListener("load", () => {
  /*** @type { HTMLCanvasElement} */

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1400;
  canvas.height = 720;

  let enemies = [];
  let score = 0;
  let gameOver = false;
  const fullScreenBtn = document.getElementById("fullScreenBtn");

  class InputHandle {
    constructor() {
      this.keys = [];
      this.touchY = "";
      this.touchX = "";
      this.touchTreshold = 30;
      this.maxWidth = window.innerWidth;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        } else if (e.key === "Enter" && gameOver) {
          restartGame();
        }
      });
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });

      window.addEventListener("touchstart", (e) => {
        this.touchY = e.changedTouches[0].pageY;
        this.touchX = e.changedTouches[0].pageX;
      });
      window.addEventListener("touchmove", (e) => {
        const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
        const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
        if (
          swipeDistanceY < -this.touchTreshold &&
          this.keys.indexOf("swipe up") === -1
        ) {
          this.keys.push("swipe up");
        } else if (
          swipeDistanceY > this.touchTreshold &&
          this.keys.indexOf("swipe down") === -1
        ) {
          this.keys.push("swipe down");
          if (gameOver) restartGame();
        } else if (
          swipeDistanceX > this.touchTreshold &&
          this.keys.indexOf("swipe right") === -1
        ) {
          this.keys.push("swipe right");
        } else if (
          swipeDistanceX < -this.touchTreshold &&
          this.keys.indexOf("swipe left") === -1
        ) {
          this.keys.push("swipe left");
        }
      });

      window.addEventListener("touchend", (e) => {
        this.keys.splice(this.keys.indexOf("swipe up"), 1);
        this.keys.splice(this.keys.indexOf("swipe down"), 1);
        this.keys.splice(this.keys.indexOf("swipe right"), 1);
        this.keys.splice(this.keys.indexOf("swipe left"), 1);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 100;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImage");
      this.frameX = 0;
      this.maxFrame = 8;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.gravity = 1.2;
    }
    restart() {
      this.x = 100;
      this.y = this.gameHeight - this.y;
      this.maxFrame = 8;
      this.frameY = 0;
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(input, deltaTime, enemies) {
      //collision detection
      enemies.forEach((enemy) => {
        const dx = enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2 + 20);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < enemy.width / 3 + this.width / 3) {
          gameOver = true;
        }
      });

      //sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //controlls
      if (
        input.keys.indexOf("ArrowRight") > -1 ||
        input.keys.indexOf("swipe right") > -1
      ) {
        this.speed = 5;
      } else if (
        input.keys.indexOf("ArrowLeft") > -1 ||
        input.keys.indexOf("swipe left") > -1
      ) {
        this.speed = -5;
      } else if (
        (input.keys.indexOf("ArrowUp") > -1 ||
          input.keys.indexOf("swipe up") > -1) &&
        this.onGround()
      ) {
        this.vy -= 32;
      } else {
        this.speed = 0;
      }

      //horizontal movement
      this.x += this.speed;
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }

      //vertical movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.maxFrame = 5;
        this.vy += this.gravity;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.maxFrame = 8;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("brackground");
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 10;
    }

    restart() {
      this.x = 0;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }

    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("enemyImage");
      this.width = 160;
      this.height = 119;
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 8;
      this.markedToDelete = false;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      this.x -= this.speed;

      if (this.x < 0 - this.width) {
        this.markedToDelete = true;
        score++;
      }
    }
  }

  const handleEnemies = (deltaTime) => {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }

    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });

    enemies = enemies.filter((enemy) => !enemy.markedToDelete);
  };

  const displayStatusText = (context) => {
    context.textAlign = "left";
    context.font = "40px Helvetica";
    context.fillStyle = "#000";
    context.fillText(`Score: ${score < 10 ? "0" + score : score}`, 20, 50);
    context.fillStyle = "#fff";
    context.fillText(`Score: ${score < 10 ? "0" + score : score}`, 22, 52);
    if (gameOver) {
      context.textAlign = "center";
      context.font = "40px Helvetica";
      context.fillStyle = "#000";
      context.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 200);

      context.fillStyle = "#fff";
      context.fillText(
        `Game Over`,
        canvas.width / 2 + 3,
        canvas.height / 2 - 198
      );
      context.font = "30px Helvetica";
      context.fillStyle = "#000";

      context.fillText(
        `Press Enter or Swipe Dowm`,
        canvas.width / 2,
        canvas.height / 2 - 140
      );
      context.fillStyle = "#fff";

      context.fillText(
        `Press Enter or Swipe Down`,
        canvas.width / 2,
        canvas.height / 2 - 138
      );
    }
  };

  const restartGame = () => {
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  };

  const toggleFullscreen = () => {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch((err) => {
        alert(`Ops, can't enable full-screen mode :${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  fullScreenBtn.addEventListener("click", () => {
    toggleFullscreen();
  });

  const input = new InputHandle();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime, enemies);
    handleEnemies(deltaTime);
    displayStatusText(ctx);

    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  };
  animate(0);
});
