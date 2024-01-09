const howToPlay = document.getElementById("howToPlay");
const howToPlayDiv = document.getElementById("howToPlayDiv");
const closeBtn = document.getElementById("closeBtn");

howToPlay.addEventListener("click", () => {
  howToPlayDiv.style.display = "flex";
  howToPlay.classList.remove("activeBtn");
});
closeBtn.addEventListener("click", () => {
  howToPlayDiv.style.display = "none";
});
