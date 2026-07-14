// =================================
// GET AI QUIZ SETTINGS
// =================================

const savedSettings = JSON.parse(
    sessionStorage.getItem("aiQuizSettings")
);


// If quiz settings do not exist,
// return the user to the setup page

if (!savedSettings) {

    window.location.href = "ai-quiz.html";

}


// =================================
// QUIZ SETTINGS
// =================================

const topic = savedSettings.topic;

const totalQuestions =
    Number(savedSettings.questionCount);

const adaptiveMode =
    savedSettings.adaptive;

let currentDifficulty =
    savedSettings.difficulty;


// =================================
// QUIZ VARIABLES
// =================================

let currentQuestionNumber = 0;

let score = 0;

let correctStreak = 0;

let wrongStreak = 0;

let highestDifficulty =
    currentDifficulty;

let currentQuestion = null;

let previousQuestions = [];

let answerSelected = false;


// =================================
// DIFFICULTY LEVEL ORDER
// =================================

const difficultyLevels = [

    "easy",

    "medium",

    "hard"

];


// =================================
// GET HTML ELEMENTS
// =================================

const topicHeading =
    document.getElementById(
        "adaptiveTopic"
    );


const difficultyBadge =
    document.getElementById(
        "difficultyBadge"
    );


const difficultyIcon =
    document.getElementById(
        "difficultyIcon"
    );


const difficultyText =
    document.getElementById(
        "difficultyText"
    );


const questionNumber =
    document.getElementById(
        "adaptiveQuestionNumber"
    );


const scoreElement =
    document.getElementById(
        "adaptiveScore"
    );


const progressBar =
    document.getElementById(
        "adaptiveProgressBar"
    );


const loadingSection =
    document.getElementById(
        "questionLoading"
    );


const errorSection =
    document.getElementById(
        "quizError"
    );


const errorMessage =
    document.getElementById(
        "quizErrorMessage"
    );


const retryButton =
    document.getElementById(
        "retryQuestionButton"
    );


const questionCard =
    document.getElementById(
        "adaptiveQuestionCard"
    );


const questionDifficulty =
    document.getElementById(
        "questionDifficulty"
    );


const questionText =
    document.getElementById(
        "adaptiveQuestionText"
    );


const answerContainer =
    document.getElementById(
        "adaptiveAnswerContainer"
    );


const feedback =
    document.getElementById(
        "adaptiveFeedback"
    );


const nextButton =
    document.getElementById(
        "adaptiveNextButton"
    );


const resultSection =
    document.getElementById(
        "adaptiveResult"
    );


// =================================
// START THE QUIZ
// =================================

topicHeading.textContent =
    `${topic} Quiz`;


updateDifficultyDisplay();

updateProgress();

generateQuestion();


// =================================
// GENERATE QUESTION USING API
// =================================

async function generateQuestion() {

    showLoading();


    try {

        const response = await fetch(

            "/api/generate-question",

            {

                method: "POST",


                headers: {

                    "Content-Type":
                        "application/json"

                },


                body: JSON.stringify({

                    topic:
                        topic,


                    difficulty:
                        currentDifficulty,


                    previousQuestions:
                        previousQuestions

                })

            }

        );


        // Try to read the API response

        const data =
            await response.json();


        // Show the API error if request failed

        if (!response.ok) {

            throw new Error(

                data.error

                ||

                "Unable to generate a question."

            );

        }


        // Save generated question

        currentQuestion = data;


        // Save question so Gemini
        // does not repeat it

        previousQuestions.push(

            data.question

        );


        // Display question

        displayQuestion();

    }


    catch (error) {

        console.error(

            "AI quiz error:",

            error

        );


        showError(

            error.message

            ||

            "Unable to generate the question."

        );

    }

}


// =================================
// DISPLAY GENERATED QUESTION
// =================================

function displayQuestion() {

    answerSelected = false;


    loadingSection.style.display =
        "none";


    errorSection.style.display =
        "none";


    resultSection.style.display =
        "none";


    questionCard.style.display =
        "block";


    feedback.textContent =
        "";


    feedback.className =
        "adaptive-feedback";


    nextButton.disabled =
        true;


    nextButton.textContent =
        "Next Question →";


    questionDifficulty.textContent =

        `${capitalize(
            currentDifficulty
        )} Question`;


    questionText.textContent =

        currentQuestion.question;


    // Remove old answer buttons

    answerContainer.innerHTML =
        "";


    // Create four answer buttons

    currentQuestion.options.forEach(

        function (
            option,
            index
        ) {

            const button =

                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =

                "adaptive-answer-button";


            button.textContent =

                `${String.fromCharCode(
                    65 + index
                )}. ${option}`;


            button.addEventListener(

                "click",

                function () {

                    checkAnswer(

                        index,

                        button

                    );

                }

            );


            answerContainer.appendChild(

                button

            );

        }

    );

}


// =================================
// CHECK SELECTED ANSWER
// =================================

function checkAnswer(

    selectedAnswer,

    selectedButton

) {

    // Prevent multiple answers

    if (answerSelected) {

        return;

    }


    answerSelected = true;


    const answerButtons =

        document.querySelectorAll(

            ".adaptive-answer-button"

        );


    // Disable every answer button

    answerButtons.forEach(

        function (
            button,
            index
        ) {

            button.disabled =
                true;


            // Highlight correct answer

            if (

                index

                ===

                currentQuestion.correctAnswer

            ) {

                button.classList.add(

                    "correct"

                );

            }

        }

    );


    // =================================
    // CORRECT ANSWER
    // =================================

    if (

        selectedAnswer

        ===

        currentQuestion.correctAnswer

    ) {

        score++;


        correctStreak++;


        wrongStreak = 0;


        selectedButton.classList.add(

            "correct"

        );


        feedback.textContent =

            `Correct! 🎉 ${
                currentQuestion.explanation
            }`;


        feedback.classList.add(

            "correct-text"

        );

    }


    // =================================
    // WRONG ANSWER
    // =================================

    else {

        correctStreak = 0;


        wrongStreak++;


        selectedButton.classList.add(

            "wrong"

        );


        feedback.textContent =

            `Good try! ${
                currentQuestion.explanation
            }`;


        feedback.classList.add(

            "wrong-text"

        );

    }


    // One question is completed

    currentQuestionNumber++;


    // Change difficulty

    updateDifficulty();


    // Update score and progress

    updateProgress();


    nextButton.disabled =
        false;


    // Change button on final question

    if (

        currentQuestionNumber

        >=

        totalQuestions

    ) {

        nextButton.textContent =

            "View My Result 🏆";

    }

}


// =================================
// ADAPTIVE DIFFICULTY
// =================================

function updateDifficulty() {

    // Do not change level if
    // adaptive mode is disabled

    if (!adaptiveMode) {

        return;

    }


    let difficultyIndex =

        difficultyLevels.indexOf(

            currentDifficulty

        );


    // =================================
    // LEVEL UP
    // =================================

    // Two continuous correct answers:

    // Easy → Medium

    // Medium → Hard

    if (

        correctStreak >= 2

        &&

        difficultyIndex < 2

    ) {

        difficultyIndex++;


        currentDifficulty =

            difficultyLevels[
                difficultyIndex
            ];


        correctStreak = 0;


        feedback.textContent +=

            ` Level Up! 🎉 Your next question will be ${capitalize(
                currentDifficulty
            )}. 🚀`;

    }


    // =================================
    // LEVEL DOWN
    // =================================

    // Two continuous wrong answers:

    // Hard → Medium

    // Medium → Easy

    else if (

        wrongStreak >= 2

        &&

        difficultyIndex > 0

    ) {

        difficultyIndex--;


        currentDifficulty =

            difficultyLevels[
                difficultyIndex
            ];


        wrongStreak = 0;


        feedback.textContent +=

            ` The next question will be ${capitalize(
                currentDifficulty
            )}. 🌱`;

    }


    // =================================
    // SAVE HIGHEST LEVEL
    // =================================

    if (

        difficultyLevels.indexOf(

            currentDifficulty

        )

        >

        difficultyLevels.indexOf(

            highestDifficulty

        )

    ) {

        highestDifficulty =

            currentDifficulty;

    }


    updateDifficultyDisplay();

}


// =================================
// NEXT QUESTION BUTTON
// =================================

nextButton.addEventListener(

    "click",

    function () {

        if (

            currentQuestionNumber

            >=

            totalQuestions

        ) {

            showResult();

        }

        else {

            generateQuestion();

        }

    }

);


// =================================
// UPDATE DIFFICULTY DESIGN
// =================================

function updateDifficultyDisplay() {

    difficultyBadge.className =

        "difficulty-badge";


    // EASY

    if (

        currentDifficulty === "easy"

    ) {

        difficultyBadge.classList.add(

            "easy-level"

        );


        difficultyIcon.textContent =

            "🌱";

    }


    // MEDIUM

    else if (

        currentDifficulty === "medium"

    ) {

        difficultyBadge.classList.add(

            "medium-level"

        );


        difficultyIcon.textContent =

            "🚀";

    }


    // HARD

    else {

        difficultyBadge.classList.add(

            "hard-level"

        );


        difficultyIcon.textContent =

            "🔥";

    }


    difficultyText.textContent =

        currentDifficulty.toUpperCase();

}


// =================================
// UPDATE QUIZ PROGRESS
// =================================

function updateProgress() {

    const displayedQuestion =

        Math.min(

            currentQuestionNumber + 1,

            totalQuestions

        );


    questionNumber.textContent =

        `Question ${displayedQuestion} of ${totalQuestions}`;


    scoreElement.textContent =

        `Score: ${score}`;


    const progressPercentage =

        (

            currentQuestionNumber

            /

            totalQuestions

        )

        *

        100;


    progressBar.style.width =

        `${progressPercentage}%`;

}


// =================================
// SHOW LOADING SECTION
// =================================

function showLoading() {

    questionCard.style.display =
        "none";


    errorSection.style.display =
        "none";


    resultSection.style.display =
        "none";


    loadingSection.style.display =
        "block";

}


// =================================
// SHOW ERROR SECTION
// =================================

function showError(message) {

    loadingSection.style.display =
        "none";


    questionCard.style.display =
        "none";


    resultSection.style.display =
        "none";


    errorSection.style.display =
        "block";


    errorMessage.textContent =
        message;

}


// =================================
// RETRY QUESTION
// =================================

retryButton.addEventListener(

    "click",

    function () {

        generateQuestion();

    }

);


// =================================
// DISPLAY FINAL RESULT
// =================================

function showResult() {

    questionCard.style.display =
        "none";


    loadingSection.style.display =
        "none";


    errorSection.style.display =
        "none";


    resultSection.style.display =
        "block";


    // Calculate result percentage

    const percentage =

        Math.round(

            (

                score

                /

                totalQuestions

            )

            *

            100

        );


    // Display percentage

    document.getElementById(

        "adaptivePercentage"

    ).textContent =

        `${percentage}%`;


    // Display final score

    document.getElementById(

        "adaptiveFinalScore"

    ).textContent =

        `You scored ${score} out of ${totalQuestions}`;


    // Correct answer total

    document.getElementById(

        "correctAnswerTotal"

    ).textContent =

        score;


    // Highest difficulty

    document.getElementById(

        "highestLevel"

    ).textContent =

        capitalize(

            highestDifficulty

        );


    // Display topic

    document.getElementById(

        "resultTopicName"

    ).textContent =

        topic;


    document.getElementById(

        "adaptiveResultTopic"

    ).textContent =

        `You completed the ${topic} quiz.`;


    const resultMessage =

        document.getElementById(

            "adaptiveResultMessage"

        );


    // Result message

    if (

        percentage >= 80

    ) {

        resultMessage.textContent =

            "Excellent! You handled the adaptive challenge very well! 🌟";

    }


    else if (

        percentage >= 60

    ) {

        resultMessage.textContent =

            "Good work! Keep practicing and continue leveling up! 🚀";

    }


    else {

        resultMessage.textContent =

            "Every question helps you learn. Try another quiz and improve! 💪";

    }


    // Save quiz result

    saveResult(

        percentage

    );

}


// =================================
// SAVE RESULT IN LOCAL STORAGE
// =================================

function saveResult(

    percentage

) {

    const oldResults =

        JSON.parse(

            localStorage.getItem(

                "kidTutorResults"

            )

        )

        ||

        [];


    oldResults.push({

        subject:

            `AI: ${topic}`,


        score:

            score,


        total:

            totalQuestions,


        percentage:

            percentage,


        highestLevel:

            capitalize(

                highestDifficulty

            ),


        date:

            new Date()

            .toLocaleDateString()

    });


    localStorage.setItem(

        "kidTutorResults",

        JSON.stringify(

            oldResults

        )

    );

}


// =================================
// CAPITALIZE TEXT
// =================================

function capitalize(text) {

    return (

        text.charAt(0)

        .toUpperCase()

        +

        text.slice(1)

    );

}