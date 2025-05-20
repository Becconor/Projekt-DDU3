let bodyDOM = document.getElementById("login");
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
        /*Är osöker på hur vi ska ta användarens data så gjorde så här, men ändra gärna :) */
        console.log("2. Inloggning genomförd!");
        /* await GETCurrentUser(); */
        createProfilePage();

    } else if (response.status === 401) {
        console.log("2. Fel lösenord!");
    } else if (response.status === 404) {
        console.log("2. Användarnamnet finns inte, skapa ett konto!");
    }
}

function createProfilePage() {

    bodyDOM.innerHTML = ``;
    let headerDOM = document.createElement("header");
    let mainDOM = document.createElement("main");
    let footerDOM = document.createElement("footer");
    bodyDOM.removeAttribute("login");
    bodyDOM.classList.add(".bodyBox");
    bodyDOM.id = "profil";
    headerDOM.innerHTML = `
        <h1>REMEMBER ME</h1>
    `;
    mainDOM.innerHTML = `
            <div id="levelButtons">
            <button class="buttons" id="easy">EASY</button>
            <button class="buttons" id="medium">MEDIUM</button>
            <button class="buttons" id="hard">HARD</button>
        </div>

        <div id="categoryButtons">
            <button class="buttons" id="katt">CATS</button>
            <button class="buttons" id="hund">DOGS</button>
            <button class="buttons" id="fågel">FOXES</button>
        </div>

        <div id="playButton">
            <button class="buttons" id="play">PLAY</button>
        </div>
    `;

    footerDOM.innerHTML = `
    <div id="info">
            <div id="profilImage"></div>

            <h2>Rebecca</h2>

            <p>LogOut</p>
        </div>

        <div id="points">
            <div id="myPoints">
                <div>
                    <h3>Level</h3>
                    <h3>1</h3>
                </div>

                <div>
                    <p>200</p>
                    <p>/</p>
                    <p>1000</p>
                </div>
            </div>

            <button>Top Players</button>
        </div>
    `;
    bodyDOM.appendChild(headerDOM);
    bodyDOM.appendChild(mainDOM);
    bodyDOM.appendChild(footerDOM);
}


/*----------------------------------------------------------------------------------------------------------------- */
/*Från test sidan! Från denna rad till rad 232! */
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
        await PATCHScore("Sebastian", 150);

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
        await PATCHExitGame("Sebastian");

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
        await GETHandlerAllUsers();

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
        // await POSTHandler();
        // return rankning;
        await POSTLogout();
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
/* ------------------------------------------------------------------------------ */



signInButton.addEventListener("click", () => {
    let usernameInputDOM = document.getElementById("username");
    let passwordInputDOM = document.getElementById("password1");
    GETLogin(usernameInputDOM, passwordInputDOM);
})

loginButtonDOM.addEventListener("click", () => {
    let usernameInputDOM = document.getElementById("username");
    let passwordInputDOM = document.getElementById("password1");
    getRegisterUser(usernameInputDOM, passwordInputDOM);
});
