const questions = [ 
    {
        question: "Which of the following CSS property specifies the look and design of an outline?",
        answers: [
            { text: " outline-style", correct: true},
            { text: " outline-format", correct: false},
            { text: " outline-font", correct: false},
            { text: " none of the mentioned", correct: false},
            ]
    
    
    },
    {
        question: "Which of the following CSS property sets the shadow for a box element?",
        answers: [
            { text: " set-shadow", correct: false},
            { text: "box-shadow", correct: true},
            { text: "shadow", correct:false},
            { text: " canvas-shadow", correct: false},
            ]  
    },
    {
        question: " Which of the following CSS property is used to set the color of the text?",
        answers: [
            { text: " text-decoration", correct: false},
            { text: "pallet", correct: false},
            { text: "colour", correct: true},
            { text: "  color", correct: false},
            ]
    },
    {
        question: " Which of the following CSS selector selects the elements that are checked?",
    answers: [
        { text: ":checked ", correct:  true},
        { text: " E ~ F", correct: false},
        { text: "::after", correct: false},
        { text: "  none of the mentioned", correct: false},
        ]
    },
    {
        question: "which of the following properties is used to change the font of text?",
    answers: [
        { text: "font-style", correct: false},
        { text: "font", correct: false},
        { text: "font-align", correct: false},
        { text: "font-family", correct: true},
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button1");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button1");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("right");
        score++;
    }else{
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("right");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again ";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();