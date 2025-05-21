// login sida

let bodyDOM = document.querySelector("body");
let headerDOM = document.querySelector("header");
let mainDOM = document.querySelector("main");
let footerDOM = document.querySelector("footer");



// function login() {
bodyDOM.id = "login";
let loginH1 = headerDOM.querySelector("h1");
loginH1.id = "logga";

mainDOM.innerHTML = `
    <div class="loginCenter" id="signIn">
        <h2>Login</h2>

        <input type="text" placeholder="Username" id="username">
        <input type="text" placeholder="Password" id="password">
        <button id="signInButton" class="signButton">SIGN IN</button>
    </div>
`;

let signInButton = document.getElementById("signInButton");
let signUpButton = document.createElement("button");
//signUpButton

let usernameDOM = document.getElementById("username");
let PasswordDOM = document.getElementById("password");


signInButton.addEventListener("click", function () {
    let usernameValue = usernameDOM.value;
    let passwordValue = PasswordDOM.value;

    GETLogin(usernameValue, passwordValue);
});
// }

async function GETLogin(username, password) {
    const response = await fetch(`http://localhost:8000/login?username=${username}&password=${password}`, {
        method: "GET"
    });

    const user = await response.json();
    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "2. Inloggning genomförd!";
        await GETCurrentUser();
    } else if (response.status === 401) {
        message.textContent = "2. Fel lösenord!";
        console.log(user);
    } else if (response.status === 404) {
        message.textContent = "2. Användarnamnet finns inte, skapa ett konto!";
        console.log(user);
    }
}

function registerUser() {



    // signUpButton.addEventListener("click", function {

    // })
}

function home() {

}

function playGame() {

}

function ranking() {

}

login();







async function POSTHandlerRegistration(username, password, password2) {
    const response = await fetch("http://localhost:8000/registrering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
            password2: password2
        }),
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "1. En ny användaren har registrerats!";
    } else if (response.status === 409) {
        message.textContent = "1. Användaren finns redan!";
    } else if (response.status === 400) {
        message.textContent = "1. Användarnamn eller lösenord saknas!";
    }
}

async function GETCurrentUser() {
    const response = await fetch("http://localhost:8000/profil", {
        method: "GET"
    })

    const data = await response.json();
    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = `3. Användar information för profilen är uppdaterad`;
        console.log(`3.`, data);
    } else if (response.status === 400) {
        message.textContent = `3. Ingen användare är inloggad`;
        console.log(`3.`, data);
    }
}

async function PATCHScore(username, score) {
    const response = await fetch("http://localhost:8000/gameScore", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            score: score
        }),
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "4. Poäng har adderats till totalpoängen för användaren!";
    } else if (response.status === 404) {
        message.textContent = "4. Användaren hittades inte!";
    } else {
        message.textContent = "4. Något gick fel!";
    }
}

async function PATCHExitGame(username) {
    const response = await fetch("http://localhost:8000/gameScore", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            score: 0
        }),
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "5. Spel avbrutet, poängen uppdaterades ej.";
    } else if (response.status === 404) {
        message.textContent = "5. Något gick fel vid avslut.";
    }
}

async function GETHandlerAllUsers() {
    const response = await fetch("http://localhost:8000/rankningslista");

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (!response.ok) {
        message.textContent = "6. Någonting gick fel!";
    } else {
        const rankning = await response.json();
        message.textContent = "6. Alla användare är rankade!";
        console.log(rankning);
        return rankning;
    }
}

async function POSTLogout() {
    const response = await fetch("http://localhost:8000/logout", {
        method: "POST"
    })

    if (response.status === 200) {
        const logOutMessage = await response.json();
        const message = document.createElement("p");
        message.textContent = `7. ${logOutMessage}`;
        document.body.appendChild(message);
    }

}


// async function testDriver() {
//     await POSTHandlerRegistration("Hej", "hej", "hej");
//     await POSTHandlerRegistration("Test", "hej", "hej");
//     await POSTHandlerRegistration("Hej", "hej", "");

//     await GETLogin("Test", "test");
//     await GETLogin("Test", "test1");
//     await GETLogin("Tes", "test");

//     await GETCurrentUser();

//     await PATCHScore("Test", 150);
//     await PATCHScore("Tes", 150);

//     await PATCHExitGame("Test");
//     await PATCHExitGame("Tes");

//     await GETHandlerAllUsers();
//     await POSTLogout();
// }

// testDriver();







//Från JJ's index.js
/*-_------------------------------------------------------------------------------------------------------------------------*/



/* let bodyDOM = document.getElementById("login");
let loginDivDOM = document.getElementById("signIn");
let signInButton = document.getElementById("signInButton");
let loginButtonDOM = document.getElementById("signButton");
let mainDOM = "";


function getRegisterUser(username, password) {
    loginDivDOM.innerHTML = `
        <h2>Create Account</h2>
            <input type="text" placeholder="Username">
            <input type="text" placeholder="Password" id="password1">
            <input type="text" placeholder="Confirm Password" id="password2">
            <button class="signButton">SIGN UP</button>
    `;
    let confirmPasswordInputDOM = document.getElementById("password2");
    loginButtonDOM.textContent = "SIGN UP"
    let usernameValue = username.value;
    let password1Value = password.value;
    let password2Value = confirmPasswordInputDOM.value;
    loginButtonDOM.addEventListener("click", () => {
        POSTHandlerRegistration(usernameValue, password1Value, password2Value);
    });

}

async function POSTHandlerRegistration(username, password, password2) {
    const response = await fetch("http://localhost:8000/registrering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
            password2: password2
        }),
    });

    if (response.status === 200) {
        message.textContent = "1. En ny användaren har registrerats!";
        await GETLogin(username, password);

    } else if (response.status === 409) {
        message.textContent = "1. Användaren finns redan!";
    } else if (response.status === 400) {
        message.textContent = "1. Användarnamn eller lösenord saknas!";
    }

}



async function GETLogin(username, password) {
    const response = await fetch(`http://localhost:8000/login?username=${username.value}&password=${password.value}`, {
        method: "GET"
    });

    const user = await response.json();

    if (response.status === 200) {
        //Är osöker på hur vi ska ta användarens data så gjorde så här, men ändra gärna :) 
        console.log("2. Inloggning genomförd!");
        //let currentUserResponse = await GETCurrentUser();
        //let currentUserProfile = await currentUserResponse.json();
        //let currentUserData = JSON.stringify(currentUserProfile); 
        createProfilePage(); //Finns i den andra branchen


    } else if (response.status === 401) {
        console.log("2. Fel lösenord!");
    } else if (response.status === 404) {
        console.log("2. Användarnamnet finns inte, skapa ett konto!");
    }
}


//För vanliga logga in knappen
signInButton.addEventListener("click", () => {
    let usernameInputDOM = document.getElementById("username");
    let passwordInputDOM = document.getElementById("password1");
    GETLogin(usernameInputDOM, passwordInputDOM);
})

//För registrera dig knappen
loginButtonDOM.addEventListener("click", () => {
    let usernameInputDOM = document.getElementById("username");
    let passwordInputDOM = document.getElementById("password1");
    getRegisterUser(usernameInputDOM, passwordInputDOM);
});*/