// =================================
// AI QUIZ SETUP
// =================================


const aiQuizForm =

document.getElementById(

    "aiQuizForm"

);


const topicInput =

document.getElementById(

    "quizTopic"

);


const topicButtons =

document.querySelectorAll(

    ".topic-chip"

);


const aiFormMessage =

document.getElementById(

    "aiFormMessage"

);



// =================================
// POPULAR TOPIC BUTTONS
// =================================


topicButtons.forEach(

function (

    button

) {


button.addEventListener(

"click",

function () {


topicInput.value =

button.dataset.topic;


topicInput.focus();


}

);


}

);



// =================================
// START AI QUIZ
// =================================


aiQuizForm.addEventListener(

"submit",

function (

event

) {


event.preventDefault();



// GET TOPIC


const topic =

topicInput

.value

.trim();



// GET DIFFICULTY


const difficulty =

document.querySelector(

'input[name="difficulty"]:checked'

)

.value;



// GET QUESTION COUNT


const questionCount =

Number(

document.getElementById(

"questionAmount"

)

.value

);



// GET ADAPTIVE MODE


const adaptiveMode =

document.getElementById(

"adaptiveMode"

)

.checked;



// VALIDATE TOPIC


if (

topic.length < 2

) {


showAIMessage(

"Please enter a valid quiz topic.",

"error"

);


return;


}



// SAVE QUIZ SETTINGS


const quizSettings = {


topic:

topic,


difficulty:

difficulty,


questionCount:

questionCount,


adaptive:

adaptiveMode


};



sessionStorage.setItem(

"aiQuizSettings",

JSON.stringify(

quizSettings

)

);



// SHOW SUCCESS


showAIMessage(

`Preparing your ${topic} quiz... ✨`,

"success"

);



// OPEN ADAPTIVE QUIZ


setTimeout(

function () {


window.location.href =

"adaptive-quiz.html";


},

800

);


}

);



// =================================
// DISPLAY MESSAGE
// =================================


function showAIMessage(

message,

type

) {


aiFormMessage.textContent =

message;


aiFormMessage.className =

"form-message";


if (

type === "success"

) {


aiFormMessage.classList.add(

"success-message"

);


}


else {


aiFormMessage.classList.add(

"error-message"

);


}


}