// questions
const quizData = [
    {
        question: "What is the capital of Sweden?",
        a: "Gothenburg",
        b: "Malmo",
        c: "Uppsala",
        d: "Stockholm",
        correct: "d",
    },
    {
        question: "Which of these Swedish companies is known for its furniture?",
        a: "Ericsson",
        b: "H&M",
        c: "IKEA",
        d: "Volvo",
        correct: "c",
    },
    {
        question: "What is the currency used in Sweden?",
        a: "Euro",
        b: "Krone",
        c: "Swedish Krona",
        d: "Pound",
        correct: "c",
    },
    {
        question: "Which famous Swedish pop group sang 'Dancing Queen'?",
        a: "ABBA",
        b: "Ace of Base",
        c: "A*Teens",
        d: "Roxette",
        correct: "a",
    },
    {
        question: "Which Swedish city is famous for its canals and historical buildings?",
        a: "Helsingborg",
        b: "Gothenburg",
        c: "Lund",
        d: "Vasteras",
        correct: "b",
    },
    {
        question: "Which of these is a traditional Swedish dish?",
        a: "Croissant",
        b: "Bratwurst",
        c: "Köttbullar",
        d: "Pizza",
        correct: "c",
    },
    {
        question: "In which Swedish town can you visit the Icehotel?",
        a: "Luleå",
        b: "Jukkasjärvi",
        c: "Kiruna",
        d: "Umeå",
        correct: "b",
    },
    {
        question: "What's the name of the Swedish ceremony celebrating the longest day of the year?",
        a: "Midwinter",
        b: "Valborg",
        c: "Lucia",
        d: "Midsommar",
        correct: "d",
    },
    {
        question: "Which Swedish author is known for the 'Millennium' series, including 'The Girl with the Dragon Tattoo'?",
        a: "Henning Mankell",
        b: "Jonas Jonasson",
        c: "Stieg Larsson",
        d: "Karl Ove Knausgård",
        correct: "c",
    },
    {
        question: "Which of these Swedish lakes is the largest by surface area?",
        a: "Lake Siljan",
        b: "Lake Hjälmaren",
        c: "Lake Mälaren",
        d: "Lake Vänern",
        correct: "d",
    },
];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answersContainer = document.querySelectorAll('.answer');
const submitButton = document.getElementById('submit');
const startOverlay = document.getElementById('start-overlay');
const startButton = document.getElementById('start-quiz');
const resultsOverlay = document.getElementById('results-overlay');
const scoreValueElement = document.getElementById('score-value');
const percentageValueElement = document.getElementById('percentage-value');
const playAgainButton = document.createElement('button');
const quitButton = document.createElement('button');

// Quiz Data
const quizData = [
    // ... (your quizData array) ...
];

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    answersContainer.forEach((answerEl, idx) => {
        const label = document.querySelector(`label[for=${answerEl.id}]`);
        label.innerText = currentQuizData['a' + String.fromCharCode('a'.charCodeAt(0) + idx)];
    });
};

const deselectAnswers = () => {
    answersContainer.forEach(answerEl => answerEl.checked = false);
};

const getSelected = () => {
    let answer;
    answersContainer.forEach(answerEl => {
        if (answerEl.checked) answer = answerEl.id;
    });
    return answer;
};

const showFinalScreen = () => {
    // Hide quiz and show results
    quizContainer.style.display = 'none';
    resultsOverlay.style.display = 'flex';

    // Show score
    const percentage = (score / quizData.length) * 100;
    scoreValueElement.innerText = score;
    percentageValueElement.innerText = percentage.toFixed(2) + '%';

    // Create and style buttons
    playAgainButton.innerText = 'Test Again';
    playAgainButton.className = 'play-again-btn';
    playAgainButton.onclick = restartQuiz;

    quitButton.innerText = 'Go to Start Page';
    quitButton.className = 'quit-btn';
    quitButton.onclick = () => window.location.href = 'index.html';

    resultsOverlay.appendChild(playAgainButton);
    resultsOverlay.appendChild(quitButton);
};

const restartQuiz = () => {
    // Reset state
    score = 0;
    currentQuiz = 0;
    resultsOverlay.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuiz();
};

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) score++;
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showFinalScreen();
        }
    } else {
        // Implement what happens if no answer is selected
    }
});

// Start Quiz
startButton.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    loadQuiz();
});
