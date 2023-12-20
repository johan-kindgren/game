document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz');
    const restartQuizButton = document.getElementById('restart-quiz');
    const submitAnswerButton = document.getElementById('submit-answer');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreTextElement = document.getElementById('score-text');
    const percentageTextElement = document.getElementById('percentage-text');
    const startOverlay = document.getElementById('start-overlay');
    const quizContainer = document.getElementById('quiz-container');
    const resultsOverlay = document.getElementById('results-overlay');

    let currentQuestionIndex, score, questions;

    function startQuiz() {
        questions = getQuestions();
        currentQuestionIndex = 0;
        score = 0;
        startOverlay.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        resultsOverlay.classList.add('hidden');
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.textContent = question.question;
        answerButtonsElement.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.addEventListener('click', () => selectAnswer(answer.correct));
            answerButtonsElement.appendChild(button);
        });
        submitAnswerButton.classList.add('hidden');
    }

    function selectAnswer(correct) {
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        });
        submitAnswerButton.classList.remove('hidden');
        submitAnswerButton.addEventListener('click', () => nextQuestion(correct));
    }

    function nextQuestion(correct) {
        if (correct) {
            score++;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(questions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quizContainer.classList.add('hidden');
        resultsOverlay.classList.remove('hidden');
        const percentage = (score / questions.length) * 100;
        scoreTextElement.textContent = `Score: ${score}/${questions.length}`;
        percentageTextElement.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    }

    function getQuestions() {
        return [
            {
                question: "What is the capital of Sweden?",
                answers: [
                    { text: "Gothenburg", correct: false },
                    { text: "Malmo", correct: false },
                    { text: "Uppsala", correct: false },
                    { text: "Stockholm", correct: true }
                ]
            },
            {
                question: "Which Swedish company is known for flat-pack furniture?",
                answers: [
                    { text: "Volvo", correct: false },
                    { text: "IKEA", correct: true },
                    { text: "H&M", correct: false },
                    { text: "Ericsson", correct: false }
                ]
            },
            {
                question: "What is the traditional Swedish festival celebrating the summer solstice?",
                answers: [
                    { text: "Valborg", correct: false },
                    { text: "Midsommar", correct: true },
                    { text: "Jul", correct: false },
                    { text: "Påsk", correct: false }
                ]
            },
            {
                question: "Which of these is a traditional Swedish dish?",
                answers: [
                    { text: "Köttbullar (meatballs)", correct: true },
                    { text: "Pizza", correct: false },
                    { text: "Sushi", correct: false },
                    { text: "Hamburger", correct: false }
                ]
            },
            {
                question: "Which city is known for its well-preserved medieval city center?",
                answers: [
                    { text: "Gothenburg", correct: false },
                    { text: "Uppsala", correct: false },
                    { text: "Visby", correct: true },
                    { text: "Lund", correct: false }
                ]
            }
             ];
    }

    startQuizButton.addEventListener('click', startQuiz);
    restartQuizButton.addEventListener('click', startQuiz);
});
        ];
    }
});
