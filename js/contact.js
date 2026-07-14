// GET CONTACT ELEMENTS


const contactForm =

document.getElementById(

"contactForm"

);


const nameInput =

document.getElementById(

"contactName"

);


const emailInput =

document.getElementById(

"contactEmail"

);


const subjectInput =

document.getElementById(

"contactSubject"

);


const messageInput =

document.getElementById(

"contactMessage"

);


const characterNumber =

document.getElementById(

"characterNumber"

);


const contactFormMessage =

document.getElementById(

"contactFormMessage"

);



// UPDATE CHARACTER NUMBER


messageInput.addEventListener(

"input",

function () {


characterNumber.textContent =

messageInput.value.length;


}

);



// GET SAVED USER


const savedUser =

JSON.parse(

localStorage.getItem(

"kidTutorUser"

)

);


// AUTOMATICALLY ADD USER DETAILS


if (

savedUser

) {


nameInput.value =

savedUser.name;


emailInput.value =

savedUser.email;


}



// SUBMIT CONTACT FORM


contactForm.addEventListener(

"submit",

function (

event

) {


event.preventDefault();


// GET VALUES


const name =

nameInput

.value

.trim();


const email =

emailInput

.value

.trim();


const subject =

subjectInput

.value;


const message =

messageInput

.value

.trim();



// CHECK NAME


if (

name.length < 3

) {


showContactMessage(

"Please enter a valid name.",

"error"

);


return;


}



// CHECK MESSAGE


if (

message.length < 10

) {


showContactMessage(

"Please write a message containing at least 10 characters.",

"error"

);


return;


}



// CREATE CONTACT MESSAGE


const newContactMessage = {


name:

name,


email:

email,


subject:

subject,


message:

message,


date:

new Date()

.toLocaleString()


};



// GET PREVIOUS MESSAGES


const savedMessages =

JSON.parse(

localStorage.getItem(

"kidTutorMessages"

)

)

||

[];



// ADD NEW MESSAGE


savedMessages.push(

newContactMessage

);



// SAVE MESSAGES


localStorage.setItem(

"kidTutorMessages",

JSON.stringify(

savedMessages

)

);


// SHOW SUCCESS


showContactMessage(

"Your message was sent successfully! Thank you for contacting Kid Tutor. 🎉",

"success"

);


// CLEAR FORM


contactForm.reset();


characterNumber.textContent =

"0";


// RESTORE USER DETAILS


if (

savedUser

) {


nameInput.value =

savedUser.name;


emailInput.value =

savedUser.email;


}


}

);



// SHOW FORM MESSAGE


function showContactMessage(

message,

type

) {


contactFormMessage.textContent =

message;


contactFormMessage.className =

"form-message";


if (

type === "success"

) {


contactFormMessage.classList.add(

"success-message"

);


}


else {


contactFormMessage.classList.add(

"error-message"

);


}


// REMOVE MESSAGE AFTER 5 SECONDS


setTimeout(

function () {


contactFormMessage.className =

"form-message";


contactFormMessage.textContent =

"";


},

5000

);


}