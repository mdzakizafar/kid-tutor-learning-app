// =================================
// QUIZ QUESTIONS
// =================================


const quizzes = {


math: {

name: "Mathematics Quiz",

icon: "➕",

questions: [


{

question:

"What is 8 + 7?",

answers:

["12", "13", "15", "16"],

correct: 2

},


{

question:

"What is 9 × 6?",

answers:

["45", "54", "56", "64"],

correct: 1

},


{

question:

"What is 100 − 37?",

answers:

["53", "63", "67", "73"],

correct: 1

},


{

question:

"What is 72 ÷ 8?",

answers:

["7", "8", "9", "10"],

correct: 2

},


{

question:

"Which number is the largest?",

answers:

["89", "98", "79", "88"],

correct: 1

}


]

},



science: {

name: "Science Quiz",

icon: "🔬",

questions: [


{

question:

"Which planet is known as the Red Planet?",

answers:

[

"Earth",

"Mars",

"Jupiter",

"Venus"

],

correct: 1

},


{

question:

"Which gas do plants absorb from the air?",

answers:

[

"Oxygen",

"Hydrogen",

"Carbon dioxide",

"Nitrogen"

],

correct: 2

},


{

question:

"Which organ pumps blood around the human body?",

answers:

[

"Brain",

"Lungs",

"Heart",

"Kidney"

],

correct: 2

},


{

question:

"What do bees collect from flowers?",

answers:

[

"Water",

"Nectar",

"Leaves",

"Seeds"

],

correct: 1

},


{

question:

"Water freezes at what temperature?",

answers:

[

"0°C",

"10°C",

"50°C",

"100°C"

],

correct: 0

}


]

},



english: {

name: "English Quiz",

icon: "📖",

questions: [


{

question:

"Which word is a noun?",

answers:

[

"Quickly",

"Beautiful",

"School",

"Run"

],

correct: 2

},


{

question:

"What is the opposite of 'happy'?",

answers:

[

"Excited",

"Sad",

"Funny",

"Kind"

],

correct: 1

},


{

question:

"Choose the correctly spelled word.",

answers:

[

"Beautifull",

"Beutiful",

"Beautiful",

"Beautifal"

],

correct: 2

},


{

question:

"Which word is a verb?",

answers:

[

"Jump",

"Blue",

"Happy",

"Table"

],

correct: 0

},


{

question:

"What is the plural form of 'child'?",

answers:

[

"Childs",

"Children",

"Childes",

"Childrens"

],

correct: 1

}


]

},



gk: {

name:

"General Knowledge Quiz",

icon:

"🌍",

questions: [


{

question:

"What is the capital of India?",

answers:

[

"Mumbai",

"Kolkata",

"New Delhi",

"Chennai"

],

correct: 2

},


{

question:

"How many continents are there?",

answers:

[

"Five",

"Six",

"Seven",

"Eight"

],

correct: 2

},


{

question:

"Which is the largest ocean?",

answers:

[

"Indian Ocean",

"Atlantic Ocean",

"Pacific Ocean",

"Arctic Ocean"

],

correct: 2

},


{

question:

"Which animal is known as the King of the Jungle?",

answers:

[

"Tiger",

"Lion",

"Elephant",

"Bear"

],

correct: 1

},


{

question:

"Which country is famous for the pyramids?",

answers:

[

"India",

"Egypt",

"Japan",

"Canada"

],

correct: 1

}


]

}


};



// =================================
// GET SUBJECT
// =================================


const parameters =

new URLSearchParams(

window.location.search

);


let selectedSubject =

parameters.get(

"subject"

);


if (

!quizzes[selectedSubject]

) {


selectedSubject =

"math";


}


const selectedQuiz =

quizzes[selectedSubject];



// =================================
// VARIABLES
// =================================


let currentQuestion = 0;


let score = 0;


let answerSelected = false;



// =================================
// HTML ELEMENTS
// =================================


const subjectName =

document.getElementById(

"subjectName"

);


const questionCounter =

document.getElementById(

"questionCounter"

);


const progressBar =

document.getElementById(

"progressBar"

);


const questionIcon =

document.getElementById(

"questionIcon"

);


const questionText =

document.getElementById(

"questionText"

);


const answerContainer =

document.getElementById(

"answerContainer"

);


const answerMessage =

document.getElementById(

"answerMessage"

);


const nextButton =

document.getElementById(

"nextButton"

);


const quizContent =

document.getElementById(

"quizContent"

);


const resultContainer =

document.getElementById(

"resultContainer"

);


const percentageScore =

document.getElementById(

"percentageScore"

);


const finalScore =

document.getElementById(

"finalScore"

);


const resultMessage =

document.getElementById(

"resultMessage"

);


const restartButton =

document.getElementById(

"restartButton"

);



// =================================
// DISPLAY QUESTION
// =================================


function displayQuestion() {


answerSelected = false;


nextButton.disabled = true;


answerMessage.textContent = "";


answerMessage.className =

"answer-message";


const questionData =

selectedQuiz

.questions[currentQuestion];



subjectName.textContent =

selectedQuiz.name;


questionIcon.textContent =

selectedQuiz.icon;


questionCounter.textContent =

`Question ${currentQuestion + 1}

of

${selectedQuiz.questions.length}`;


questionText.textContent =

questionData.question;



const progress =

(

(currentQuestion + 1)

/ selectedQuiz.questions.length

)

* 100;


progressBar.style.width =

`${progress}%`;



answerContainer.innerHTML = "";



questionData.answers.forEach(

function (

answer,

answerIndex

) {


const answerButton =

document.createElement(

"button"

);


answerButton.className =

"answer-button";


answerButton.textContent =

`${String.fromCharCode(

65 + answerIndex

)}. ${answer}`;



answerButton.addEventListener(

"click",

function () {


checkAnswer(

answerIndex,

answerButton

);


}

);


answerContainer.appendChild(

answerButton

);


}

);


}



// =================================
// CHECK ANSWER
// =================================


function checkAnswer(

selectedAnswer,

selectedButton

) {


if (

answerSelected

) {


return;


}


answerSelected = true;


const questionData =

selectedQuiz

.questions[currentQuestion];


const buttons =

document.querySelectorAll(

".answer-button"

);


buttons.forEach(

function (

button,

index

) {


button.disabled = true;


if (

index ===

questionData.correct

) {


button.classList.add(

"correct"

);


}


}

);



if (

selectedAnswer ===

questionData.correct

) {


score++;


selectedButton.classList.add(

"correct"

);


answerMessage.textContent =

"Excellent! Your answer is correct 🎉";


answerMessage.classList.add(

"correct-text"

);


}


else {


selectedButton.classList.add(

"wrong"

);


answerMessage.textContent =

"Good try! The green option is the correct answer.";


answerMessage.classList.add(

"wrong-text"

);


}


nextButton.disabled = false;


}



// =================================
// NEXT QUESTION
// =================================


nextButton.addEventListener(

"click",

function () {


currentQuestion++;


if (

currentQuestion

<

selectedQuiz.questions.length

) {


displayQuestion();


}


else {


showResult();


}


}

);



// =================================
// DISPLAY RESULT
// =================================


function showResult() {


quizContent.style.display =

"none";


resultContainer.style.display =

"block";


const percentage =

Math.round(

(

score

/

selectedQuiz.questions.length

)

*

100

);


percentageScore.textContent =

`${percentage}%`;


finalScore.textContent =

`You scored ${score}

out of

${selectedQuiz.questions.length}`;



if (

percentage === 100

) {


resultMessage.textContent =

"Perfect score! You are a learning superstar! 🌟";


}


else if (

percentage >= 80

) {


resultMessage.textContent =

"Excellent work! Keep learning and growing! 🎉";


}


else if (

percentage >= 60

) {


resultMessage.textContent =

"Good job! Practice a little more and you will improve! 👍";


}


else {


resultMessage.textContent =

"Keep practicing. Every quiz helps you learn something new! 💪";


}



// SAVE SCORE


saveQuizResult(

percentage

);


}



// =================================
// SAVE RESULT
// =================================


function saveQuizResult(

percentage

) {


const result = {


subject:

selectedQuiz.name,


score:

score,


total:

selectedQuiz.questions.length,


percentage:

percentage,


date:

new Date()

.toLocaleDateString()


};


const oldResults =

JSON.parse(

localStorage.getItem(

"kidTutorResults"

)

)

||

[];


oldResults.push(

result

);


localStorage.setItem(

"kidTutorResults",

JSON.stringify(

oldResults

)

);


}



// =================================
// RESTART QUIZ
// =================================


restartButton.addEventListener(

"click",

function () {


currentQuestion = 0;


score = 0;


resultContainer.style.display =

"none";


quizContent.style.display =

"block";


displayQuestion();


}

);



// START QUIZ


displayQuestion();