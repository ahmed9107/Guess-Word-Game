let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = "Created by Yazami";

// Game Options
let tries       = 6;
let lettersNum  = 6;
let currentTry  = 1;

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
      this.value =this.value.toUpperCase();
      const nxtInput = inputs[index + 1];
      if (nxtInput) nxtInput.focus();
    });
    input.addEventListener( "keydown", function(event){
      //console.log(event);
      const currentIdx = Array.from(inputs).indexOf(event.target/*Or this*/);
      console.log(currentIdx);
      if (event.key === "ArrowRight") {
        const nxtInput = currentIdx + 1;
        if (nxtInput < inputs.length) inputs[nxtInput].focus();
      };
      if (event.key === "ArrowLeft") {
        const previousInput = currentIdx - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      };
    });
  });
}

window.onload = function(){
  generateInputs();
}