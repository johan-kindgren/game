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
const startOverlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-quiz");
const quizHeader = document.querySelector(".quiz-header");
const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const resultsOverlay = document.getElementById("results-overlay");
const scoreValueElement = document.getElementById("score-value");
const percentageValueElement = document.getElementById("percentage-value");
const closeResultsButton = document.getElementById("close-results");
const messageOverlay = document.getElementById("message-overlay");
const closeMessageButton = document.getElementById("close-message");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
    if (currentQuiz < quizData.length) {
        deselectAnswers();

        const currentQuizData = quizData[currentQuiz];
        questionElement.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;

        // Enable the answer options for the current question
        enableAnswers();
    } else {
        const percentage = (score / quizData.length) * 100;

        scoreValueElement.innerText = score;
        percentageValueElement.innerText = percentage.toFixed(2);
        resultsOverlay.style.display = "flex";
    }
};

const deselectAnswers = () => {
    answerElements.forEach(answerEl => {
        answerEl.checked = false;
    });
};

const getSelected = () => {
    let answer;

    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
};

const enableAnswers = () => {
    answerElements.forEach(answerEl => {
        answerEl.disabled = false;
    });
    submitButton.disabled = false;
};

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) score++;
        currentQuiz++;

        // Close the message window when an answer is selected
        messageOverlay.style.display = "none";

        loadQuiz();
    } else {
        // Display the message window when there's no selected answer
        messageOverlay.style.display = "flex";
    }
});

closeMessageButton.addEventListener("click", () => {
    // Close the message window
    messageOverlay.style.display = "none";
});

const disableAnswers = () => {
    answerElements.forEach(answerEl => {
        answerEl.disabled = true;
    });
};

closeResultsButton.addEventListener("click", () => {
    resultsOverlay.style.display = "none";
});

// Initial load
startButton.addEventListener("click", () => {
    startOverlay.style.display = "none";
    loadQuiz();
});