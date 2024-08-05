/* Questions for quiz */
const quizData = [
    {
        question: "What is a spade used for?",
        options: ["Digging", "Strimming", "Hedgecutting", "Jetwashing"],
        answer: "Digging"
    },
    {
        question: "What is a rake used for?",
        options: ["Raking", "Strimming", "Hedgecutting", "Jetwashing"],
        answer: "Raking"
    },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
 /* Clear previous options */
    optionsElement.innerHTML = ""; 
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add('option-button');
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
    
    /* Disable buttons after selection */
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === answer) {
            button.classList.add("correct"); /* Highlight the correct answer */
             
        }
        if (button === selectedButton && button.innerText !== answer) {
            button.classList.add("wrong"); /* Highlight the wrong answer */
            
        }
    });

    if (selectedButton.innerText === answer) {
        score++;
    }

    currentQuestion++;

    
    /* Wait a moment before showing the next question*/
    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${quizData.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

showQuestion();