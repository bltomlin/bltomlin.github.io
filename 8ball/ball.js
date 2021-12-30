
let check = [""];
let response = [""];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function answerQuestion() {
  let answer = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Don't count on it.", "Ask again later.", "Yes definitely.", "You may rely on it. ", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Outlook not so good.", "My reply is no.", "My sources say no.", "Very doubtful."];
  response = answer[getRandomIntInclusive(0, 19)];
  while(response == check) {
    response = answer[getRandomIntInclusive(0, 19)];
  }
  makeAnswerAppear(response);
  check = response;
}

function makeAnswerAppear(answerText) {
  // Adds "hidden" CSS class to the '8'.
  document.getElementById("eight").classList.add("hidden");

  // Find the answer element, change the text, and remove the CSS "hidden" class.
  document.getElementById("answer-text").innerText = answerText;

  document.getElementById("answer-text").classList.add("hidden");
  document.getElementById("triangle").classList.add("hidden");

  // Allow 1/1000th of a second to pass in order for the above changes to take effect.  Then remove the elements
  setTimeout(() => {
    document.getElementById("answer-text").classList.remove("hidden");
    document.getElementById("triangle").classList.remove("hidden");
  }, 1);
}