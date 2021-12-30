function appendNewCard(parentElement) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML =
  ` <div class="card-down"></div>
    <div class="card-up"></div>`
  parentElement.appendChild(newCard);
  return newCard;
}

function shuffleCardImageClasses() {
  let cardImage = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3","image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
  return _.shuffle(cardImage);
}

function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];
    for (i = 0; i < 12; i++ ){
    let newElement = appendNewCard (parentElement);
    newElement.classList.add(shuffledImageClasses[i]);
    cardObjects.push ({
      index: i,
      element: newElement,
      imageClass: shuffledImageClasses[i]
    })
    }
  return cardObjects;
}

function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}

let counters = {};

function incrementCounter(counterName, parentElement) {
if (!counters.hasOwnProperty(counterName)) {
    counters[counterName] = 0;
  }
  counters[counterName]++
  parentElement.innerHTML = counters[counterName];
}

let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');

function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject);
    }, 500);
  };
}


/* The 'onCardFlipped' function below will be called each time the user flips a card.  This variable is used to remember the first card flipped while we wait for the user to flip another card. It should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;


/***  flipCardWhenClicked
OVERVIEW:
This is called each time the user flips a card and should handle and track the game mechanics like: "Is this the first or second card flipped in a sequence?", "Do the cards match", and "Is the game over?"

INPUT/OUPUT
The 'newlyFlippedCard' parameter is a custom card object that has just been flipped.
*/
function onCardFlipped(nextCardFlipped) {
  //Add one to the flip counter UI.
  incrementCounter("flips", document.getElementById("flip-count"));
  // Step 2: If this is the first card flipped, then remember that card using the 'lastCardFlipped' variable and return (nothing else to do).
  if(lastCardFlipped == null) {
    lastCardFlipped = nextCardFlipped;
    return;
  }
  // Otherwise, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard'.

  //If the cards don't match, then remove the "flipped" class from each, reset 'lastCardFlipped', and return.
  if (!doCardsMatch (lastCardFlipped, nextCardFlipped)) {
     lastCardFlipped.element.classList.remove("flipped");
     lastCardFlipped.element.classList.add("border-glow-fade");
     nextCardFlipped.element.classList.remove("flipped");
     nextCardFlipped.element.classList.add("border-glow-fade");
     lastCardFlipped = null;
     return;
  // Otherwise, we have two matching cards.
  //Increment the match counter and optionally add a "glow" effect to the matching cards.

   } else {
    incrementCounter("matches", document.getElementById("match-count"));
    lastCardFlipped.element.classList.remove("border-glow-fade");
    lastCardFlipped.element.classList.add("border-glow");
    nextCardFlipped.element.classList.remove("border-glow-fade");
    nextCardFlipped.element.classList.add("border-glow");
   } 
  // Play either the win audio or match audio based on whether the user has the number of matches needed to win.
  if (document.getElementById("match-count").innerHTML == "6") {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  // Step 6: Reset 'lastCardFlipped'.
  lastCardFlipped = null; 
}
  // Set up the game.
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}
