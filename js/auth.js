// GET LOGIN ELEMENTS


const loginForm =

document.getElementById("loginForm");


const showPasswordButton =

document.getElementById("showPassword");


const passwordInput =

document.getElementById("loginPassword");


const loginMessage =

document.getElementById("loginMessage");




// SHOW AND HIDE PASSWORD


if (

showPasswordButton

) {


showPasswordButton.addEventListener(

"click",

function () {


if (

passwordInput.type === "password"

) {


passwordInput.type = "text";


showPasswordButton.textContent = "🙈";


}


else {


passwordInput.type = "password";


showPasswordButton.textContent = "👁️";


}


}

);


}




// LOGIN


if (

loginForm

) {


loginForm.addEventListener(

"submit",

function (event) {


event.preventDefault();


// GET VALUES


const email =

document

.getElementById("loginEmail")

.value

.trim();


const password =

passwordInput

.value;


// GET REGISTERED USER


const savedUser =

JSON.parse(

localStorage.getItem(

"kidTutorUser"

)

);


// CHECK ACCOUNT


if (

!savedUser

) {


showLoginMessage(

"No account found. Please create an account first.",

"error"

);


return;


}


// CHECK EMAIL AND PASSWORD


if (

email === savedUser.email

&&

password === savedUser.password

) {


// SAVE LOGIN STATUS


localStorage.setItem(

"kidTutorLoggedIn",

"true"

);


showLoginMessage(

"Login successful! Opening your learning dashboard...",

"success"

);


// OPEN HOME PAGE


setTimeout(

function () {


window.location.href =

"index.html";


},

1500

);


}


else {


showLoginMessage(

"Incorrect email or password.",

"error"

);


}


}

);


}




// DISPLAY MESSAGE


function showLoginMessage(

message,

type

) {


loginMessage.textContent =

message;


loginMessage.className =

"form-message";


if (

type === "success"

) {


loginMessage.classList.add(

"success-message"

);


}


else {


loginMessage.classList.add(

"error-message"

);


}


}