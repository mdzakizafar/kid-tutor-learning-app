// GET SAVED QUIZ RESULTS


let quizResults =

JSON.parse(

localStorage.getItem(

"kidTutorResults"

)

)

||

[];


// GET REGISTERED USER


const savedUser =

JSON.parse(

localStorage.getItem(

"kidTutorUser"

)

);


const studentName =

savedUser

?

savedUser.name

:

"Guest Student";



// HTML ELEMENTS


const leaderboardBody =

document.getElementById(

"leaderboardBody"

);


const emptyLeaderboard =

document.getElementById(

"emptyLeaderboard"

);


const tableContainer =

document.querySelector(

".table-container"

);


const bestScore =

document.getElementById(

"bestScore"

);


const totalQuizzes =

document.getElementById(

"totalQuizzes"

);


const averageScore =

document.getElementById(

"averageScore"

);


const clearHistoryButton =

document.getElementById(

"clearHistory"

);



// DISPLAY RESULTS


function displayLeaderboard() {


leaderboardBody.innerHTML = "";



if (

quizResults.length === 0

) {


tableContainer.style.display =

"none";


emptyLeaderboard.style.display =

"block";


clearHistoryButton.style.display =

"none";


bestScore.textContent =

"0%";


totalQuizzes.textContent =

"0";


averageScore.textContent =

"0%";


return;


}



// SHOW TABLE


tableContainer.style.display =

"block";


emptyLeaderboard.style.display =

"none";


clearHistoryButton.style.display =

"block";



// SORT HIGH SCORE FIRST


const sortedResults =

[...quizResults]

.sort(

function (

firstResult,

secondResult

) {


return (

secondResult.percentage

-

firstResult.percentage

);


}

);



// CREATE TABLE ROWS


sortedResults.forEach(

function (

result,

index

) {


const row =

document.createElement(

"tr"

);


let rankIcon =

index + 1;


if (

index === 0

) {


rankIcon = "🥇";


}


else if (

index === 1

) {


rankIcon = "🥈";


}


else if (

index === 2

) {


rankIcon = "🥉";


}



row.innerHTML = `


<td>

${rankIcon}

</td>


<td>

<strong>

${studentName}

</strong>

</td>


<td>

${result.subject}

</td>


<td>

${result.score}

/

${result.total}

</td>


<td>

<span class="score-badge">

${result.percentage}%

</span>

</td>


<td>

${result.date}

</td>


`;


leaderboardBody.appendChild(

row

);


}

);



// STATISTICS


const percentages =

quizResults.map(

function (

result

) {


return result.percentage;


}

);


const highestScore =

Math.max(

...percentages

);


const totalPercentage =

percentages.reduce(

function (

total,

percentage

) {


return total + percentage;


},

0

);


const average =

Math.round(

totalPercentage

/

percentages.length

);


bestScore.textContent =

`${highestScore}%`;


totalQuizzes.textContent =

quizResults.length;


averageScore.textContent =

`${average}%`;



// DISPLAY TOP SCORES


displayTopPlayers(

sortedResults

);


}



// TOP PLAYER CARDS


function displayTopPlayers(

results

) {


const positions = [


{

name:

"firstName",

score:

"firstScore",

result:

results[0]

},


{

name:

"secondName",

score:

"secondScore",

result:

results[1]

},


{

name:

"thirdName",

score:

"thirdScore",

result:

results[2]

}


];


positions.forEach(

function (

position

) {


const nameElement =

document.getElementById(

position.name

);


const scoreElement =

document.getElementById(

position.score

);



if (

position.result

) {


nameElement.textContent =

studentName;


scoreElement.textContent =

`${position.result.percentage}%`;


}


else {


nameElement.textContent =

"No Player";


scoreElement.textContent =

"--%";


}


}

);


}



// CLEAR QUIZ HISTORY


clearHistoryButton

.addEventListener(

"click",

function () {


const confirmation =

confirm(

"Do you want to delete all quiz scores?"

);


if (

confirmation

) {


localStorage.removeItem(

"kidTutorResults"

);


quizResults = [];


displayLeaderboard();


}


}

);



// START


displayLeaderboard();