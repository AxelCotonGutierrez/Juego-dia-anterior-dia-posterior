// Axel Cotón Gutiérrez Copyright 2024
const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const questionElement = document.getElementById("question");
const resultElement = document.getElementById("result");
const options = [document.getElementById("option1"), document.getElementById("option2"), document.getElementById("option3")];

let correctAnswer = "";

function generateQuestion() {
    const dayIndex = Math.floor(Math.random() * daysOfWeek.length);
    const questionType = Math.random() > 0.5 ? "anterior" : "posterior";
    const correctDayIndex = questionType === "anterior" ? (dayIndex + 6) % 7 : (dayIndex + 1) % 7;
    correctAnswer = daysOfWeek[correctDayIndex];

    let wrongAnswers = daysOfWeek.filter(day => day !== correctAnswer);
    wrongAnswers = shuffleArray(wrongAnswers).slice(0, 2);
    
    questionElement.textContent = `¿Cuál es el día ${questionType} al ${daysOfWeek[dayIndex]}?`;
    setOptions([correctAnswer, ...wrongAnswers]);
}

function setOptions(answers) {
    answers = shuffleArray(answers);
    options.forEach((button, index) => {
        button.textContent = answers[index];
        button.onclick = () => checkAnswer(answers[index]);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
        resultElement.textContent = "¡Correcto!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Incorrecto. Intenta de nuevo.";
        resultElement.style.color = "red";
    }
    setTimeout(() => {
        resultElement.textContent = "";
        generateQuestion();
    }, 2000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Iniciar el juego con una pregunta
generateQuestion();

