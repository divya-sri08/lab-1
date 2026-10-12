
const questions = [
    {
        question: "Which language is used to structure web pages?",
        options: ["CSS", "HTML", "Python", "Java"],
        answer: "HTML"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "C", "CSS", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to web pages?",
        options: ["JavaScript", "HTML", "CSS", "XML"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "let", "float", "define"],
        answer: "let"
    },
    {
        question: "Which method displays a message in the browser?",
        options: [
            "document.write()",
            "console.log()",
            "print()",
            "echo()"
        ],
        answer: "document.write()"
    }
];

let currentQuestion = 0;
let score = 0;
let submitted = false;

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const submitBtn = document.getElementById("submitBtn");
const messageElement = document.getElementById("message");

function showQuestion() {
    submitted = false;

    const current = questions[currentQuestion];

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = current.question;
    optionsElement.replaceChildren();
    messageElement.textContent = "";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Answer";

    current.options.forEach(option => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsElement.appendChild(label);
    });
}

function submitAnswer() {
    if (submitted) return;

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        messageElement.style.color = "red";
        messageElement.textContent = "Please select an option!";
        return;
    }

    submitted = true;

    if (selected.value === questions[currentQuestion].answer) {
        score++;
        messageElement.style.color = "green";
        messageElement.textContent = "Correct answer!";
    } else {
        messageElement.style.color = "red";
        messageElement.textContent =
            `Wrong! Correct answer: ${questions[currentQuestion].answer}`;
    }

    submitBtn.disabled = true;
    submitBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Show Result"
            : "Next Question";

    submitBtn.disabled = false;
    submitBtn.onclick = nextQuestion;
}

function nextQuestion() {
    if (!submitted) {
        submitAnswer();
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
        submitBtn.onclick = submitAnswer;
    } else {
        showResult();
    }
}

function showResult() {
    quiz.hidden = true;
    result.hidden = false;

    const previousHighScore =
        Number(localStorage.getItem("quizHighScore")) || 0;

    const highestScore = Math.max(previousHighScore, score);

    localStorage.setItem("quizHighScore", highestScore);

    document.getElementById("score").textContent =
        `Your score: ${score} / ${questions.length}`;

    document.getElementById("highScore").textContent =
        `Highest score: ${highestScore} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    result.hidden = true;
    quiz.hidden = false;

    submitBtn.onclick = submitAnswer;
    showQuestion();
}

submitBtn.onclick = submitAnswer;
document.getElementById("restartBtn").onclick = restartQuiz;

showQuestion();
