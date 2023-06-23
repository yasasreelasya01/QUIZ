const questions = [ 
    {
    question: "Arguments received by a function in C language are called ___ arguments?",
    answers: [
        { text: "  Definite arguments", correct: false},
        { text: "   Formal arguments", correct: true},
        { text: "  Actual arguments", correct: false},
        { text: "Ideal arguments", correct: false},
        ]
    },
  {
        question: "What is the default return value of a C function if not specified explicitly?",
        answers: [
            { text: " -1", correct: false},
            { text: "0", correct: true},
            { text: "1", correct:false},
            { text: " None of the above", correct: false},
            ] 
    },
  {
    question: " It is necessary to declare the type of a function in the calling program if the function?",
    answers: [
        { text: " Is not defined in the same file", correct: false},
        { text: "Returns a non-integer value", correct: false},
        { text: "Both A and B", correct: true},
        { text: " None of the above", correct: false},
        ]
    },
 {
        question: ". The function that actually created from a call to a template function is called?",
        answers: [
            { text: "Generated", correct:false},
            { text: " Inherited", correct: false},
            { text: "Spawned", correct: true},
            { text: " Declassified", correct: false},
            ] 
    },
{
        question: " The function fprintf is used in a program?",
        answers: [
            { text: " When too many printf calls have been alrady used in the program", correct: false},
            { text: " When output i to be printed on to a file", correct: true},
            { text: "  In place of printf, since printf uses more memory", correct: false},
            { text: "All of above", correct: false},
            ] 
    },
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