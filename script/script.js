let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = "Created by Yazami";

// Game Options
let tries       = 6;
let lettersNum  = 6;
let currentTry  = 1;
let numHint     = 2;

// Manage Words
let guessWord = "";
const words   = [
    "table",
    "mother",
    "father", 
    "terminal", 
    "debug", 
    "output", 
    "problem"
  ];
guessWord     = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(guessWord);
let msgArea   = document.querySelector(".msg");

// Manage hints
document.querySelector(".hint span").innerHTML = numHint;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);

function generateInputs(){
  const inputsContainer = document.querySelector(".inputs");
  for(i=1; i <= tries; i++){
    const tryDiv = document.createElement('div');
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled");
    for (let j = 1; j <= lettersNum; j++) {
      const input     = document.createElement("input");
      input.type      = "text";
      input.id        = `guess-${i}-letter${j}`;
      input.maxLength = "1";
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  // Disable all inputs expect first one
  const disableInputs = document.querySelectorAll(".disabled input");
  disableInputs.forEach((input)=> (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener( "input", function(){
      this.value = this.value.toUpperCase();
      const nxtInput = inputs[index + 1];
      if (nxtInput) nxtInput.focus();
    });
    input.addEventListener( "keydown", function(event){
      // console.log(event);
      const currentIdx = Array.from(inputs).indexOf(event.target/*Or this*/);
      //console.log(currentIdx);
      if (event.key === "ArrowRight") {
        const nxtInput = currentIdx + 1;
        if (nxtInput < inputs.length) inputs[nxtInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const previousInput = currentIdx - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      }
    });
  });
}
let guessBtn = document.querySelector(".check-word");
guessBtn.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= lettersNum; i++) {
    const inputField    = document.querySelector(`#guess-${currentTry}-letter${i}`);
    const letter        = inputField.value.toLowerCase();
    const actualLetter  = guessWord[i - 1];
    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if(guessWord.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }
  if (successGuess) {
    msgArea.innerHTML = `Congrats! the word is <span>${guessWord}</span>`;
    let allTries      = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled"));
    guessBtn.disabled = true;
    hintBtn.disabled  = true;
  } else {
    msgArea.innerHTML = `Try again!`;
    document.querySelector(`.try-${currentTry}`).classList.add("disabled");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => input.disabled = true);
    currentTry ++;
    
    const nxtTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nxtTryInputs.forEach((input) => input.disabled = false);
    let ele = document.querySelector(`.try-${currentTry}`);
    if (ele) {
      ele.classList.remove("disabled");
      ele.children[1].focus();
    } else {
      msgArea.innerHTML = `Game Over!`;
      guessBtn.disabled = true;
      hintBtn.disabled  = true;
    }
  }
}

function getHint() {
  if (numHint > 0) {
    numHint--;
    document.querySelector(".hint span").innerHTML = numHint;
  }
  if (numHint == 0) {
    hintBtn.disabled = true;
  }

  const enableInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enableInputs)
  const emptyEnableInputs = Array.from(enableInputs).filter((input) => input.value === "");
  // console.log(emptyEnableInputs);
  if (emptyEnableInputs.length > 0) {
    const randomIndx  = Math.floor(Math.random() * emptyEnableInputs.length);
    const randomInput = emptyEnableInputs[randomIndx];
    const indexToFill = Array.from(enableInputs).indexOf(randomInput);
    if (randomIndx !== -1) {
      randomInput.value = guessWord[indexToFill].toUpperCase();
    }
  }
}

// Handle back spaces
function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs      = document.querySelectorAll("input:not([disabled])");
    const currentIdx  =  Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIdx)
    if (currentIdx > 0) {
      const currentInput  = inputs[currentIdx];
      const prevInput     = inputs[currentIdx - 1];
      currentInput.value  = "";
      prevInput.value  = "";
      prevInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackspace);

window.onload = function(){
  generateInputs();
}