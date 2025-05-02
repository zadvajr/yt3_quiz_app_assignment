// constants and variable declarations

const quizData = [
    {
        question: "... is the Federal Capital of Nigeria",
        options: ["Lagos", "Borno", "Sokoto", "Abuja"],
        answer: "Abuja"
    },
    {
        question: "One of the following is not a political party in Nigeria",
        options: ["NLC", "APC", "PDP", "SDP"],
        answer: "NLC"
    },
    {
        question: "Who is the current President of Nigeria",
        options: ["Tinubu", "Buhari", "Jonathan", "Obasanjo"],
        answer: "Tinubu"
    },
    {
        question: "Nigeria has ..... states",
        options: [12, 36, 14, 15],
        answer: 36
    }
];

// variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let selectedAnswers = new Array(quizData.length).fill(null);

// constants storing elements
const timerEl = document.getElementById('time');
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const scoreEl = document.getElementById("score");
const restartBtn = document.querySelector(".restart-btn");
const nextButton = document.querySelector(".nextButton");
const prevButton = document.querySelector(".prevButton");

// function to load question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }

    clearInterval(timerInterval);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    startTimer();

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;

        // Restore previous selection
        if (selectedAnswers[currentQuestion] === option) {
            button.classList.add('selected');
        }

        button.onclick = () => {
            selectedAnswers[currentQuestion] = option;
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        };

        optionsEl.appendChild(button);
    });

    // Handle button visibility
    prevButton.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Submit' : 'Next';
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// End the quiz and show the results
function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.style.display = 'block';
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';

    // Calculate score
    score = 0;
    quizData.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.answer) {
            score++;
        }
    });
    scoreEl.textContent = score;
    restartBtn.style.display = 'block';
}

// Restart the quiz
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    selectedAnswers.fill(null);
    timerEl.textContent = timeLeft;

    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex';
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';
    nextButton.style.display = 'inline-block';

    loadQuestion();
});

// Next button click
nextButton.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

// Previous button click
prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

// Initialize the quiz
loadQuestion();
