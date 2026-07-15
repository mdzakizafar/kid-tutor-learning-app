// =================================
// GET CONTACT FORM ELEMENTS
// =================================

const contactForm =
    document.getElementById(
        "contactForm"
    );


const contactResult =
    document.getElementById(
        "contactResult"
    );


const submitButton =
    document.getElementById(
        "contactSubmitButton"
    );


// =================================
// SEND CONTACT MESSAGE
// =================================

contactForm.addEventListener(

    "submit",

    async function (event) {

        // Stop normal page refresh

        event.preventDefault();


        // Show loading state

        submitButton.disabled =
            true;


        submitButton.textContent =
            "Sending...";


        contactResult.textContent =
            "Sending your message...";


        contactResult.style.color =
            "#6545f5";


        // Get all form information

        const formData =

            new FormData(

                contactForm

            );


        try {

            // Send data to Web3Forms

            const response =

                await fetch(

                    "https://api.web3forms.com/submit",

                    {

                        method:
                            "POST",

                        body:
                            formData

                    }

                );


            const data =

                await response.json();


            // Message successfully sent

            if (

                data.success

            ) {

                contactResult.textContent =

                    "Message sent successfully! We will contact you soon. 🎉";


                contactResult.style.color =

                    "#16a34a";


                // Clear form

                contactForm.reset();

            }


            // Web3Forms returned an error

            else {

                throw new Error(

                    data.message

                    ||

                    "Unable to send your message."

                );

            }

        }


        catch (error) {

            console.error(

                "Contact form error:",

                error

            );


            contactResult.textContent =

                "Message could not be sent. Please try again.";


            contactResult.style.color =

                "#dc2626";

        }


        finally {

            // Enable button again

            submitButton.disabled =

                false;


            submitButton.textContent =

                "Send Message ✉️";

        }

    }

);