const questions = [ 
    {
        question: "Which of the following are the CSS Extension Prefixes for Webkit?",
        answers: [
            { text: "-chrome", correct: false},
            { text: "  -web", correct: false},
            { text: " -o-", correct: false},
            { text: " -webkit", correct: true},
            ]
    
    },
    {
        question: "Which of the following CSS framework is used to create a responsive design?",
        answers: [
            { text: " django", correct: false},
            { text: "rails", correct: false},
            { text: "larawell", correct:false},
            { text: " bootstrap", correct: true},
            ] 
    },
    {
        question: " Which of the following is the first CSS specification to become an official W3C Recommendation?",
        answers: [
            { text: "CSS level 2", correct: false},
            { text: "(X)HTML CSS", correct: false},
            { text: "CSS level 1", correct: true},
            { text: " CSS level 2.1", correct: false},
            ]
    },
    {
        question: "Which of the following function defines a linear gradient as a CSS image?",
    answers: [
        { text: "gradient()", correct: false},
        { text: " linear-gradient() ", correct: true},
        { text: "grayscale()", correct:false },
        { text: "image()", correct: false},
        ]
    },
    {
        question: "Which of the following is not the property of the CSS box model?",
    answers: [
        { text: "margin ", correct: false},
        { text: "color", correct: true},
        { text: "width", correct: false},
        { text: "  height", correct: false},
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