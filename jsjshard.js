const questions = [ 
    {
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    answers: [
        { text: " Position", correct: false},
        { text: "  Window", correct: true},
        { text: " Standard", correct: false},
        { text: " Location", correct: false},
        ]
    },
    {
        question: "Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine?",
        answers: [
            { text: " will work perfectly well on a Windows Machine", correct:true},
            { text: " will be displayed as JavaScript text on the browser", correct: false},
            { text: " will throw errors and exceptions", correct:false},
            { text: " must be restricted to a Unix Machine only", correct: false},
            ] 
    },
    {
    question: " Which of the following scoping type does JavaScript use?",
    answers: [
        { text: " Sequential", correct: false},
        { text: "Segmental", correct: false},
        { text: "Lexical", correct: true},
        { text: " Literal", correct: false},
        ]
    },
    {
        question: " What is the basic difference between JavaScript and Java?",

    answers: [
        { text: " Functions are considered as fields", correct: false},
        { text: "   Functions are values, and there is no hard distinction between methods and fields", correct: true},
        { text: " Variables are specific", correct:false },
        { text: "There is no difference", correct: false},
        ]
    },
    {
        question: " Why JavaScript Engine is needed?",
    answers: [
        { text: "Both Compiling & Interpreting the JavaScript", correct:  false},
        { text: " Parsing the javascript", correct: false},
        { text: "Interpreting the JavaScript", correct: true},
        { text: " Compiling the JavaScript", correct: false},
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