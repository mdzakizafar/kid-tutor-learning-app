// GET REGISTER ELEMENTS


const registerForm =

document.getElementById("registerForm");


const registerPassword =

document.getElementById("registerPassword");


const confirmPassword =

document.getElementById("confirmPassword");


const showPasswordButton =

document.getElementById(

"showRegisterPassword"

);


const registerMessage =

document.getElementById(

"registerMessage"

);



// SHOW AND HIDE PASSWORD


showPasswordButton.addEventListener(

"click",

function () {


if (

registerPassword.type === "password"

) {


registerPassword.type = "text";


confirmPassword.type = "text";


showPasswordButton.textContent = "🙈";


}


else {


registerPassword.type = "password";


confirmPassword.type = "password";


showPasswordButton.textContent = "👁️";


}


}

);



// REGISTER USER


registerForm.addEventListener(

"submit",

function (event) {


event.preventDefault();


// GET USER DETAILS


const name =

document

.getElementById("registerName")

.value

.trim();


const email =

document

.getElementById("registerEmail")

.value

.trim()

.toLowerCase();


const password =

registerPassword.value;


const confirmedPassword =

confirmPassword.value;



// CHECK NAME


if (

name.length < 3

) {


showRegisterMessage(

"Please enter a valid name.",

"error"

);


return;


}



// CHECK PASSWORD LENGTH


if (

password.length < 6

) {


showRegisterMessage(

"Password must contain at least 6 characters.",

"error"

);


return;


}



// CHECK BOTH PASSWORDS


if (

password !== confirmedPassword

) {


showRegisterMessage(

"Passwords do not match.",

"error"

);


return;


}



// CREATE USER OBJECT


const user = {


name: name,


email: email,


password: password,


createdAt:

new Date()

.toISOString()


};



// SAVE USER


localStorage.setItem(

"kidTutorUser",

JSON.stringify(user)

);



// DISPLAY SUCCESS


showRegisterMessage(

"Account created successfully! Opening the login page...",

"success"

);



// CLEAR FORM


registerForm.reset();



// OPEN LOGIN PAGE


setTimeout(

function () {


window.location.href =

"login.html";


},

1800

);


}

);



// DISPLAY MESSAGE


function showRegisterMessage(

message,

type

) {


registerMessage.textContent =

message;


registerMessage.className =

"form-message";


if (

type === "success"

) {


registerMessage.classList.add(

"success-message"

);


}


else {


registerMessage.classList.add(

"error-message"

);


}


}