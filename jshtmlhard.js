const questions = [ 
    {
        question: "Which of the following tag is used to embed css in html page?",
        answers: [
            { text: "css", correct: false},
            { text: " !DOCTYPE html", correct: false},
            { text: "script", correct: false},
            { text: "style", correct: true},
            ]
    
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        answers: [
            { text: "five", correct: false},
            { text: "one", correct: false},
            { text: "three", correct: false},
            { text: "six", correct: true},
            ] 
    },
    {
    question: "we enclose HTML tags within?",
    answers: [
        { text: "{ }", correct: false},
        { text: "! !", correct: false},
        { text: "< >", correct: true},
        { text: "( )", correct: false},
        ]
    },
    {
        question: "which of the following tags doesn't require a closing tag?",
    answers: [
        { text: " < br > ", correct: false},
        { text: " < hr > ", correct: false},
        { text: "both A and B.", correct: true},
        { text: "none of the above.", correct: false},
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