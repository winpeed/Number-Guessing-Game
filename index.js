const minNumber = document.getElementById("min-number");
const maxNumber = document.getElementById("max-number");
const formSubmit = document.getElementById("form-submit");

const guessedBox = document.getElementById("guessed-box");
const guessedNumber = document.getElementById("guessed-number");
const guessedSection = document.querySelector(".guessed-section");
const inputSection = document.querySelector(".input-section");

const guessedButton = document.getElementById("guessed-button");
const guessedInput = document.getElementById("guessed-input");
const gNumber = document.getElementById("g-number");

let errorText = document.querySelector(".error");
const revealText = document.querySelector(".reveal-text");
const tryAgain = document.querySelector(".try-again");
let trialsNumber = document.getElementById("trials-number");

let guessForm = document.getElementById("guess-form");
const guessLabel = document.getElementById("guess-label");
const newgameSection = document.getElementById("newgame-section");
const revealAnswer = document.getElementById("reveal-answer");
const checkers = document.getElementById("checkers");
const finalMessage = document.getElementById("final-message");

const newGame = document.getElementById("new-game");

let demoRay = [];

let trial = 0;
let tryNumber = 5;

let trialChecker = () => {
  tryNumber--;
  trialsNumber.textContent = `(${tryNumber} guesses left)`;
  gNumber.value = "";
  trial++;

  if (trial == 5) {
    guessedSection.style.display = "none";
    revealAnswer.style.display = "block";
    checkers.style.display = "none";
    finalMessage.style.display = "block";
    newgameSection.style.display = "block";
  }
  revealText.textContent += `❌`;
};

let emptyInput = () => {
  minNumber.value = "";
  maxNumber.value = "";
};

// Prepare the addEventListener for the form

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  //Assign the minimum and maximum values to new variables
  let alpha = minNumber.value;
  let omega = maxNumber.value;

  if (Number(omega) < Number(alpha)) {
    emptyInput();
    errorText.style.display = "inline-block";
    guessedBox.style.display = "none";
  } else {
    errorText.style.display = "none";

    //Loop through alpha to omega then add to the demoRay array
    for (let i = Number(alpha); i <= omega; i++) {
      demoRay.push(i);
    }

    //Generate Random Number for demoRay array position
    let randomNumber = Math.floor(Math.random() * demoRay.length);

    emptyInput();
    guessedNumber.textContent = demoRay[randomNumber];
    formSubmit.style.display = "none";
    guessedInput.style.display = "inline-block";
    guessLabel.textContent = `Enter a guess between ${alpha} and ${omega}`;
    inputSection.style.display = "none";
    trialsNumber.textContent = `(${tryNumber} guesses left)`;
    demoRay = [];
  }
});

guessedBox.addEventListener("click", function () {
  guessedNumber.style.color = "white";
});

guessForm.addEventListener("submit", function (event) {
  event.preventDefault();
  trialsNumber.textContent = `(${tryNumber} guesses left)`;
  if (Number(gNumber.value) === Number(guessedNumber.textContent)) {
    tryAgain.textContent = "You're absolutely right! Kudos 👍";
    revealText.textContent = ``;
    guessedBox.style.display = "block";
    guessedNumber.style.color = "white";
    guessForm.style.display = "none";
    newgameSection.style.display = "block";
    guessedSection.style.display = "none";
    inputSection.style.display = "none";
    trialsNumber.style.display = `none`;
  } else if (Number(gNumber.value) > Number(guessedNumber.textContent)) {
    tryAgain.textContent = "Too high...Try Again.";
    trialChecker();
  } else if (Number(gNumber.value) < Number(guessedNumber.textContent)) {
    tryAgain.textContent = "Too low...Try Again.";
    trialChecker();
  }
});

revealAnswer.addEventListener("click", function () {
  guessedBox.style.display = "block";
  revealAnswer.style.display = "none";
  finalMessage.textContent = "Here's the right number!";
});

newGame.addEventListener("click", function () {
  history.go();
});
