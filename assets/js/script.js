var startButtonEle = document.getElementById("startButton");
var resetButtonEle = document.getElementById("restartButton");
var questionBoxEle = document.getElementById("questionBox");
var timerCountEle = document.querySelector(".showTimer");
var questionsEle = document.getElementById("questionsId");
var answersEle = document.getElementById("answersId");
var displayEle = document.getElementById("display");
var fName = document.getElementById("finalName");
var fTime = document.getElementById("finalTime");
var answer1 = document.getElementById("B1");
var answer2 = document.getElementById("B2");
var answer3 = document.getElementById("B3");
var answer4 = document.getElementById("B4");
var timer;
var timerCount;
var endTimer;

startButton.addEventListener("click", startGame);

function startTimer() {
  clearInterval(timer);
  timer = setInterval(function () {
    timerCount--;
    timerCountEle.textContent = timerCount;
    if (timerCount === 0) {
      console.log("out of time");
      alert("out of time");
      window.location.reload(true);
      clearInterval(timer);
    } else console.log("game continues");
  }, 1000);
}

function startGame() {
  restartGame();
  timerCount = 30;
  displayEle.textContent = "";
  startTimer();
  askQuestion();
}

function askQuestion() {
  var askQ = questions[questionR];
  questionsId.textContent = askQ.question;
  B1.textContent = askQ.answer1;
  B2.textContent = askQ.answer2;
  B3.textContent = askQ.answer3;
  B4.textContent = askQ.answer4;
}

function checkAnswer(answer) {
  if (answer == questions[questionR].correct) {
    displayEle.textContent = "Correct!";
    console.log("Correct");
  } else {
    displayEle.textContent = "Wrong! -1 Second!";
    console.log("Wrong: Subtract 1 Second");
    timerCount--;
  }
  if (questionR < questionArray) {
    questionR++;
    askQuestion();
    console.log("Asking New Question");
  } else {
    fTime = timerCount;
    localStorage.setItem("fTime", JSON.stringify(fTime));
    clearInterval(timer);
    console.log("End of Questions");
    displayEle.textContent =
      "Thank you for playing, Click start to play again!";
    var userName = String(window.prompt("Enter your initials!"));
    localStorage.setItem("userName", JSON.stringify(userName));
    showHighscore();
  }
  return;
}

var questions = [
  {
    question: "Define HTML: Hypertext Markup _______",
    answer1: "Language",
    answer2: "Letter",
    answer3: "Latitude",
    answer4: "Longitude",
    correct: "B1",
  },
  {
    question: "Which of the following is a correct output for Boolean?",
    answer1: "98",
    answer2: "Yes",
    answer3: "No",
    answer4: "True",
    correct: "B4",
  },
  {
    question: "The <h1> tag?",
    answer1: "Is the smallest header tag",
    answer2: "prints h1 as a string",
    answer3: "Is the largest header tag",
    answer4: "starts a paragraph",
    correct: "B3",
  },
  {
    question: "Define CSS: Cascading ______ Sheets",
    answer1: "Simple",
    answer2: "Style",
    answer3: "Super",
    answer4: "Sun",
    correct: "B2",
  },
  {
    question: "How would you refer to an ID of <div id ='hello'> in CSS?",
    answer1: "hello.",
    answer2: ".hello",
    answer3: "hello#",
    answer4: "#hello",
    correct: "B4",
  },
];

var questionArray = questions.length - 1;
var questionR = 0;

function showHighscore() {
  var ffTime = JSON.parse(localStorage.getItem("fTime"));
  document.getElementById("finalTime").innerHTML = ffTime;
  console.log("Score = " + ffTime);

  var scoreName = JSON.parse(localStorage.getItem("userName"));
  document.getElementById("finalName").innerHTML = scoreName;
  console.log("User = " + scoreName);
}

function restartGame() {
  questionR = 0;
  questionArray = 4;
  fTime = 0;
}
