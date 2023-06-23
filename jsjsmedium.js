const questions = [ 
    {
    question: "Which of the following methods/operation does javascript use instead of == and !=?",
    answers: [
        { text: "  JavaScript uses equalto()", correct: false},
        { text: "   JavaScript uses equals() and notequals() instead", correct: false},
        { text: "  JavaScript uses bitwise checking", correct: false},
        { text: "JavaScript uses === and !== instead", correct: true},
        ]
    },
    {
        question: "Why event handlers is needed in JS?",
        answers: [
            { text: "  Allows JavaScript code to alter the behaviour of windows", correct:true},
            { text: " Adds innerHTML page to the code", correct: false},
            { text: "Change the server location", correct:false},
            { text: " Performs handling of exceptions and occurrences", correct: false},
            ] 
    },
    {
    question: " Which of the following is not a framework?",
    answers: [
        { text: " JavaScript .NET", correct: false},
        { text: "JavaScript", correct: false},
        { text: " Cocoa JS", correct: true},
        { text: "  jQuery", correct: false},
        ]
    },
    {
        question: " Which of the following is the property that is triggered in response to JS errors?",

    answers: [
        { text: "  onclick", correct: false},
        { text: "   onerror", correct: true},
        { text: "  onmessage", correct:false },
        { text: "onexception", correct: false},
        ]
    },
    {
        question: "  Which of the following is not an error in JavaScript?",
    answers: [
        { text: " Missing of Bracket", correct:  false},
        { text: " Division by zero", correct: true},
        { text: "Syntax error", correct: false},
        { text: "  Missing of semicolons", correct: false},
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