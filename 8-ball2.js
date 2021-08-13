

// Initialize global variables.
let magicNumber = -1;
let remainingGuesses = -1;
let winningGuess = 0;


/* Returns a random integer in the range 'min' through 'max' inclusive. 

   This can be taken directly from MDN documentation: 
     https://tinyurl.com/3jkxa8h3

*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  
}


function setupNewGame() {
  magicNumber = getRandomIntInclusive(0,100);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  hideAllMessages();
}

// Handles when the user makes a new guess.
function handleGuess() {
  // Check if remaining guesses is -1 and setup a new game if so.
  if(remainingGuesses == -1) {
    setupNewGame();
    remainingGuesses = 6;
  }

  // Check if the user has any remaining guesses and return if not.
  if(remainingGuesses == 0) {
    return alert("Sorry, you are out of guesses.");
  }

  // Retreive the user's newest guess.
  let guess = getGuessInput();

  // Check if the user has won. We should show a message, set remaining guesses to 0, and return from this function.
  if(guess == magicNumber) {
    remainingGuesses = 1;
    showMessage("win-message");
    confetti.start();
    setTimeout(function(){confetti.stop();},3000);
  }

  // Check if the guess is higher or lower and show appropriate message.
  if(guess > magicNumber) {
    showMessage("lower-message");
  } 

  if(guess < magicNumber) {
    showMessage("higher-message");
  }
  // The user has used a guess, decrement remainin guesses and show the new value.

  remainingGuesses--;
  showRemainingGuesses(remainingGuesses);

  // If the remaining guesses is 0, then the user has lost and that message should be shown.
  if(remainingGuesses == 0 && guess != magicNumber) {
    showMessage("lose-message");
  }
}

function handlePlayAgain() {
  setupNewGame();
  setGuessInput("");
}
