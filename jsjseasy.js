questions = [ 
    {
    question: "What is JavaScript?",
    answers: [
        { text: " JavaScript is a scripting language used to make the website interactive", correct: true},
        { text: "  JavaScript is an assembly language used to make the website interactive", correct: false},
        { text: " JavaScript is a compiled language used to make the website interactive", correct: false},
        { text: " none of the mentioned", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: [
            { text: "  It is an ordered list of values", correct:true},
            { text: " It is an ordered list of objects", correct: false},
            { text: "It is an ordered list of string", correct:false},
            { text: " It is an ordered list of functions", correct: false},
            ] 
    },
    {
    question: " Which of the following is not javascript data types?",
    answers: [
        { text: " Null type", correct: false},
        { text: "Undefined type", correct: false},
        { text: "Number type", correct: false},
        { text: " All of the mentioned", correct: true},
        ]
    },
    {
        question: "Where is Client-side JavaScript code is embedded within HTML documents?",

    answers: [
        { text: " A URL that uses the special javascript:code", correct: false},
        { text: "  A URL that uses the special javascript:protocol ", correct: true},
        { text: "  A URL that uses the special javascript:encoding", correct:false },
        { text: "A URL that uses the special javascript:stack ", correct: false},
        ]
    },
    {
        question: "  Which of the following can be used to call a JavaScript Code Snippet?",
    answers: [
        { text: "Function/Method", correct:  true},
        { text: " Preprocessor", correct: false},
        { text: "Triggering Event", correct: false},
        { text: " RMI", correct: false},
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