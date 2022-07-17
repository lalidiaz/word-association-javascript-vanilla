const scoreDisplay = document.getElementById("score-display");
const questionDisplay = document.getElementById("question-display");
const app = document.getElementById("app");

// Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}%`;
  ball.style.top = `${Math.floor(Math.random() * 100)}%`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12,
  };

  let anim = el.animate(
    [{ transform: "translate(0, 0)" }, { transform: `translate(${to.x}rem, ${to.y}rem)` }],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

const questions = [
  {
    correct: 2,
    options: ["jury", "assess"],
    quiz: ["value", "estimate", "evaluate"],
  },
  {
    correct: 2,
    options: ["trace", "adjacent"],
    quiz: ["close", "near", "next"],
  },
  {
    correct: 2,
    options: ["mad", "exotic"],
    quiz: ["foreign", "national", "ethnic"],
  },
  {
    correct: 1,
    options: ["forecast", "sustainable"],
    quiz: ["assume", "insight", "weather"],
  },
  {
    correct: 2,
    options: ["charity", "rapid"],
    quiz: ["fast", "quick", "prompt"],
  },
  {
    correct: 2,
    options: ["charity", "rapid"],
    quiz: ["fast", "quick", "prompt"],
  },
  {
    correct: 2,
    options: ["par", "intermediate"],
    quiz: ["center", "middle", "average"],
  },
  { correct: 1, options: ["vendor", "adjust"], quiz: ["seller", "employee", "merchant"] },
  {
    correct: 2,
    options: ["banking", , "thesis"],
    quiz: ["college", "degree", "learning"],
  },
  { correct: 2, options: ["compile", "bass"], quiz: ["fishing", "guitar", "sea"] },
  { correct: 1, options: ["transparent", "differently"], quiz: ["clear", "liquid", "plain"] },
];

let score = 0;
scoreDisplay.textContent = score;
let clicked = [];

function populateQuestions() {
  questions.forEach((question) => {
    const questionBox = document.createElement("div");
    questionBox.classList.add("question-box");

    question.quiz.forEach((tip) => {
      const tipText = document.createElement("p");
      tipText.textContent = tip;
      questionBox.append(tipText);
    });

    const questionButtons = document.createElement("div");
    questionButtons.classList.add("questions-buttons");
    questionBox.append(questionButtons);

    question.options.forEach((option, optionIndex) => {
      const questionButton = document.createElement("button");
      questionButton.classList.add("question-button");
      questionButton.textContent = option;

      questionButton.addEventListener("click", () =>
        checkAnswer(questionBox, questionButton, option, optionIndex + 1, question.correct)
      );

      questionButtons.append(questionButton);
    });

    const answerDisplay = document.createElement("div");
    answerDisplay.classList.add("answer-display");
    questionBox.append(answerDisplay);

    questionDisplay.append(questionBox);
  });
}

populateQuestions();

function checkAnswer(questionBox, questionButton, option, optionIndex, correct) {
  if (optionIndex == correct) {
    score++;
    scoreDisplay.textContent = score;
    addResults(questionBox, "Correct answer 🎉", "correct");
  } else {
    if (score !== 0) {
      score--;
      scoreDisplay.textContent = score;
      addResults(questionBox, "Wrong answer 🙈", "wrong");
    } else {
      scoreDisplay.textContent = 0;
      addResults(questionBox, "Wrong answer 🙈", "wrong");
    }
  }
  clicked.push(option);
  questionButton.disabled = clicked.includes(option);
}

function addResults(questionBox, answer, className) {
  const answerDisplay = questionBox.querySelector(".answer-display");
  questionBox.classList.remove("wrong");
  questionBox.classList.remove("correct");
  questionBox.classList.add(className);
  answerDisplay.textContent = answer;
}
