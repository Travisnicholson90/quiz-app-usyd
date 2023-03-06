const header = document.querySelector('header');
const quizContainer = document.querySelector('.quiz-container');
const question = document.querySelector('.question');
const answerButton = document.querySelectorAll('.answerButton');
const startButton = document.querySelector('.start-quiz');
const scores = document.querySelector('.scores');
const finalScore = document.querySelector('.score');
const clock = document.querySelector('.clock');
const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const submitButton = document.querySelector('.submit')
const highScores = document.querySelector('.high-scores')

let quiz = [
    {
        q: 'Which of the following is not a data type',
        a: ['Array', 'Boolean', 'String', 'Prompts'],
        correct: 'Prompts',
    }, {
        q: 'What is a string data type enclosed with',
        a: ['Parenthesis', 'Square brackets', 'Curly braces', 'Quotes'],
        correct: 'Quotes',
    }, {
        q: 'Which is the correct syntax to create a new element',
        a: ['document.set', 'setAttribute()', 'document.create()', 'element.style'],
        correct: 'document.create()', 
    }, {
        q: 'What is the JSON acronym. ',
        a: ['JavaScript System Object Noun', 'JavaScript Syntax Object Notation', 'JavaScript System Object Notation', 'JavaScript Object Notation'],
        correct: 'JavaScript Object Notation', 
    }, {
        q: 'What is JQuery. ',
        a: ['Javascript framework', 'Programming language', 'Alternative to CSS', 'Markup language'],
        correct: 'Javascript framework', 
    }
];

//start score at 0
let score = 0;

//set the currentQuestion to the quiz[0]
let quizIndex = 0;
let currentQuestion = quiz[quizIndex];
// store updated quiz.length
let quizLength = quiz.length

//timer variable
let timeStart = 120;
let setTimer;

function startQuiz() {
    // when start button clicked, header is hidden and quiz container is displayed
    startButton.addEventListener('click', function(e) {
        quizContainer.classList.remove('hide')
        header.classList.add('hide')
        highScores.classList.add('hide')
        let setTimer = setInterval(timer, 1000);
                
        function timer() {
            timeStart--;
            clock.textContent = timeStart;
            if(timeStart === 0 || quizIndex >= quiz.length) {
                gameOver();
                clearInterval(setTimer);
                clock.textContent = '⏰';
            };
        };    
    });
}
startQuiz();

function getQuestion() {
    // Reset existing questions and answers
    quizContainer.textContent = '';
    answerButton.textContent = '';
    
    // Display question
    let questionElement = document.createElement('h2');
    questionElement.className = 'question';
    questionElement.textContent = currentQuestion.q;
    quizContainer.appendChild(questionElement);

    // Display answer options
    for (let i = 0; i < currentQuestion.a.length; i++) {
        let answers = currentQuestion.a[i];
        let answerButton = document.createElement('button');
        quizContainer.appendChild(answerButton);
        answerButton.className = 'answer answerButton';
        answerButton.textContent = answers;
    
        

        answerButton.addEventListener('click', function(event) {
            let correctAnswer = event.target
            console.log(correctAnswer);
            
            //check for correct answer
            //start score counter
            if(correctAnswer.textContent === quiz[quizIndex].correct) {
                console.log('correct');
                score++;
                finalScore.textContent = `  ${score} / ${quizLength}`
                //set score to local storage
                localStorage.setItem("score", score);

            } else {
                //time penalty of 15 seconds for wrong answers
                timeStart -= 15;
                console.log('wrong');
            }
            
            //move to next question
            quizIndex++;
            if (quizIndex < quiz.length) {
                currentQuestion = quiz[quizIndex];
                getQuestion();
            } else {
                gameOver();
            }
        });
    }
}
getQuestion();


// set the game over screen
function gameOver() {
    quizContainer.classList.add('hide');
    scores.classList.remove('hide');
    clearInterval(setTimer);

}

// submit initials to save score to local storage. 
form.addEventListener('submit', function(e) {
   gameOver()
    let input = formInput.value.trim()
    //save initials to local storage
    localStorage.setItem("input", JSON.stringify(input));
    
    console.log('form submitted');

});


// ----------- high scores ------------------ //
//convert the saved high scores & initials to JSON and store in variable
let highScoresInitials = JSON.parse(localStorage.getItem("input"));
console.log(highScoresInitials);

let highScoresResults = JSON.parse(localStorage.getItem("score"));
console.log(highScoresResults);

    const list = document.querySelector('.list');
    if(highScoresInitials !== null) {
        const li = document.createElement('li')
        list.appendChild(li)
        li.className = 'list-item'
        li.textContent = highScoresInitials
    }
    
    if(highScoresResults !== null) {
        const li = document.createElement('li')
        list.appendChild(li)
        li.className = 'list-item'
        li.textContent = `Score ${highScoresResults}`
    }
    
