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
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        answers: [
            { text: " tag", correct: false},
            { text: "id", correct: false},
            { text: "class", correct:true },
            { text: "both class and tag", correct: false},
            ] 
    },
    {
    question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
    answers: [
        { text: "<track>", correct: false},
        { text: "<video>", correct: false},
        { text: "<slider>", correct: true},
        { text: "<source>", correct: false},
        ]
    },
    {
        question: "HTML is a subset of ?",
    answers: [
        { text: "HTML", correct: false},
        { text: "PHP ", correct: false},
        { text: "CSS", correct:true },
        { text: "Ajax", correct: false},
        ]
    },
    {
        question: "Which of the following CSS property is used to make the text bold?",
    answers: [
        { text: "text-decoration: bold ", correct: false},
        { text: "font-weight: bold", correct: true},
        { text: "font-style: bold", correct: false},
        { text: " text-align: bold", correct: false},
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