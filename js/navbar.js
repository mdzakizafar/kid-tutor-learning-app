// =================================
// KID TUTOR NAVBAR
// =================================


// GET SAVED USER

const currentUser = JSON.parse(

    localStorage.getItem(
        "kidTutorUser"
    )

);


// CHECK LOGIN STATUS

const isLoggedIn =

localStorage.getItem(
    "kidTutorLoggedIn"
)

===

"true";


// GET NAVBAR

const navbar =

document.querySelector(
    ".navbar nav"
);


// UPDATE NAVBAR

if (

    navbar

    &&

    currentUser

    &&

    isLoggedIn

) {


    // FIND LOGIN LINK

    const loginLink =

    navbar.querySelector(

        'a[href="login.html"]'

    );


    // CHANGE LOGIN INTO USER NAME

    if (

        loginLink

    ) {


        loginLink.textContent =

        `👤 ${currentUser.name}`;


        loginLink.href =

        "#";


        loginLink.classList.add(

            "user-name-link"

        );


        // CREATE LOGOUT BUTTON

        const logoutButton =

        document.createElement(

            "button"

        );


        logoutButton.textContent =

        "Logout";


        logoutButton.className =

        "logout-button";


        // ADD LOGOUT BUTTON

        navbar.appendChild(

            logoutButton

        );


        // LOGOUT

        logoutButton.addEventListener(

            "click",

            function () {


                const confirmation =

                confirm(

                    "Do you want to log out?"

                );


                if (

                    confirmation

                ) {


                    // REMOVE LOGIN SESSION

                    localStorage.removeItem(

                        "kidTutorLoggedIn"

                    );


                    // RETURN HOME

                    window.location.href =

                    "index.html";


                }


            }

        );


    }


}