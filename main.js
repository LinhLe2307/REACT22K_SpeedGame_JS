const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let startSound = new sound("friendly-melody.mp3");
let endSound = new sound("bass-drop.mp3");
// let playPromise;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  } 
};

const startGame = () => {
  startButton.style.display = "none";
  endButton.style.display = "inline";
  startSound.loop = true;
  startSound.play();

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 1) {
    endGame();
  }

  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

function startSoundStop() {
  startSound.stop();
}

function endSoundPlay() {
  endSound.play();
}

const endGame = () => {
  clearTimeout(timer);
  overlay.style.visibility = "visible";

  if (score == 0) {
    resultText.textContent = `Your score is ${score}. Oh come on, you can do better than this!`;
  } else if (score > 1 && score < 10) {
    resultText.textContent = `Your score is ${score}, not bad, not bad at all`;
  } else if (score > 11) {
    resultText.textContent = `Your score is ${score}, now we are talking!`;
  }
  startSoundStop();
  endSoundPlay();
};

const reloadGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);
