document.addEventListener('DOMContentLoaded', () => {
    // Elements
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
    const progressBar = document.getElementById('progress');

    // Quiz State
    let currentQuestionIndex, score, questions;

    // Function to start the quiz
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        questions = getQuestions();
        startOverlay.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        resultsOverlay.classList.add('hidden');
        showQuestion(questions[currentQuestionIndex]);
        updateProgressBar();
    }

    // Function to show a question
    function showQuestion(question) {
        questionElement.textContent = question.question;
        answerButtonsElement.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('answer-button');
            button.addEventListener('click', () => selectAnswer(answer.correct, index));
            answerButtonsElement.appendChild(button);
        });
    }

    // Function to handle answer selection
    function selectAnswer(correct, index) {
        if (correct) {
            score++;
        }
        Array.from(answerButtonsElement.children).forEach((button, buttonIndex) => {
            button.disabled = true;
            if (buttonIndex === index) {
                button.classList.add(correct ? 'correct-answer' : 'wrong-answer');
            }
        });
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion(questions[currentQuestionIndex]);
                updateProgressBar();
            }, 1000);
        } else {
            setTimeout(endQuiz, 1000);
        }
    }

    // Function to end the quiz
    function endQuiz() {
        quizContainer.classList.add('hidden');
        resultsOverlay.classList.remove('hidden');
        const percentage = (score / questions.length) * 100;
        scoreTextElement.textContent = `Score: ${score}/${questions.length}`;
        percentageTextElement.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    }

    // Function to update the progress bar
    function updateProgressBar() {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Sample questions (replace with your own)
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

    // Event Listeners
    startQuizButton.addEventListener('click', startQuiz);
    restartQuizButton.addEventListener('click', startQuiz);

    // Start the quiz
    startQuiz();
});