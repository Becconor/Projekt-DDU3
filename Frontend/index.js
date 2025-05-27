let currentUser = null;

let bodyDOM = document.querySelector("body");
let headerDOM = document.createElement("header");
let titleDOM = document.createElement("h2");
let mainDOM = document.createElement("main");
let footerDOM = document.createElement("footer");


bodyDOM.appendChild(headerDOM);
bodyDOM.appendChild(titleDOM);
bodyDOM.appendChild(mainDOM);
bodyDOM.appendChild(footerDOM);

headerDOM.innerHTML = `<h1>REMEMBER ME</h1>`;

class Card {
    constructor(url, id, theme) {
        this.url = url;
        this.id = id;
        this.theme = theme;
    }
}

function login() {
    footerDOM.removeAttribute("id");
    mainDOM.removeAttribute("id");
    titleDOM.removeAttribute("id");
    headerDOM.removeAttribute("id");
    footerDOM.innerHTML = ``;
    titleDOM.innerHTML = ``;

    bodyDOM.id = "loginSite";

    mainDOM.innerHTML = `
        <div id="login">
            <h2>Login</h2>

            <div id="inputBox">
                <input type="text" placeholder="Username" id="username" class="inputs">

                <div id="inputPassword">
                    <input type="password" placeholder="Password" id="password">
                    <button type="button" id="hidePassword">👁️</button>
                </div>
            </div>

            <button id="signIn" class="loginButtons">SIGN IN</button>

            <div id="registerUser">
                <p>Not a member?</p>
                <button id="registerButton" class="loginButtons">REGISTER HERE</button>
            </div>
        </div>
    `;

    let signInButton = document.getElementById("signIn");
    let registerUserButton = document.getElementById("registerUser");
    const hidePassword = document.getElementById("hidePassword");

    let usernameDOM = document.getElementById("username");
    let PasswordDOM = document.getElementById("password");

    hidePassword.addEventListener("click", function () {
        if (PasswordDOM.type === "password") {
            PasswordDOM.type = "text";
            hidePassword.textContent = "🙈";
        } else {
            PasswordDOM.type = "password";
            hidePassword.textContent = "👁️"
        }
    })

    signInButton.addEventListener("click", function () {
        let usernameValue = usernameDOM.value;
        let passwordValue = PasswordDOM.value;

        GETLogin(usernameValue, passwordValue);
    });

    registerUserButton.addEventListener("click", registerUser);
}


function registerUser() {
    mainDOM.innerHTML = `
        <div id="login">
            <h2>Create Account</h2>

            <input type="text" placeholder="Username" id="username" class="inputs">
            <input type="text" placeholder="Password" id="password1" class="inputs">
            <input type="text" placeholder="Confirm Password" id="password2" class="inputs">
            <button id="signUp" class="loginButtons">SIGN UP</button>

            <button id="back" class="loginButtons">Back To Login</button>
        </div>
    `;

    // loginButtonDOM.textContent = "SIGN UP"
    let usernameDOM = document.getElementById("username");
    let PasswordDOM1 = document.getElementById("password1");
    let PasswordDOM2 = document.getElementById("password2");
    let signUpButton = document.getElementById("signUp")
    let backToLoginButton = document.getElementById("back")


    signUpButton.addEventListener("click", () => {
        let usernameValue = usernameDOM.value;
        let password1Value = PasswordDOM1.value;
        let password2Value = PasswordDOM2.value;

        if (!usernameValue || !password1Value || !password2Value) {
            alert("Please fill in all fields!");
            return;
        }

        if (password1Value !== password2Value) {
            alert("Password do not match!");
            return;
        }

        POSTHandlerRegistration(usernameValue, password1Value, password2Value);
    });

    backToLoginButton.addEventListener("click", login);
};


function homePage() {
    let headerH1 = document.querySelector("h1");
    headerH1.removeAttribute("id");

    mainDOM.innerHTML = ``;
    bodyDOM.removeAttribute("id");

    bodyDOM.id = "sites";
    headerDOM.id = "logotype";
    titleDOM.id = "titleH2";
    mainDOM.id = "chooseGame";
    footerDOM.id = "footerContainer";

    titleDOM.textContent = "Select your game!";

    mainDOM.innerHTML = `
        <div id="levelButtons" class="mainContent">
            <button value="4" data-points="8" class="buttons" class="difficultyButton" id="easy">EASY</button>
            <button value="6" data-points="10" class="buttons" class="difficultyButton" id="medium">MEDIUM</button>
            <button value="8" data-points="12" class="buttons" class="difficultyButton"  id="hard">HARD</button>
        </div>

        <div id="categoryButtons" class="mainContent">
            <button value="cat" class="buttons" class="themeButton" id="cat">CATS</button>
            <button value="dog" class="buttons" class="themeButton" id="dog">DOGS</button>
            <button value="fox" class="buttons" class="themeButton" id="fox">FOXES</button>
        </div>

        <div id="playButton" class="mainContent">
            <button class="buttons" id="playNow">PLAY</button> 
        </div>
    `;

    footerDOM.innerHTML = `
        <div id="footerContent">
            <div id="userInfo">
                <h2>${currentUser.username}</h2>

                <button id="logOutButton">LogOut</button>
            </div>

            <div id="info">
                <div id="myScoreBoard">
                    <div id="myLevel">
                        <h3>Level</h3>
                        <h3>1</h3>
                    </div>

                    <div id="myPoints">
                        <p>${currentUser.score}</p>
                        <p>/</p>
                        <p>1000</p>
                    </div>
                </div>

                <button id="topPlayButton">Top Players</button>
            </div>
        </div>
    `;

    const difficultyButtons = document.querySelectorAll("#levelButtons button");
    const themeButtons = document.querySelectorAll("#categoryButtons button");

    let selectedDifficulty = null;
    let selectedTheme = null;
    let selectedChances = null;

    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            difficultyButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedDifficulty = button.value;
            selectedChances = button.data.points;
        });
    });

    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            themeButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedTheme = button.value;
        });
    });

    const topPlayButton = document.getElementById("topPlayButton");
    const logOutButton = document.getElementById("logOutButton");

    const playButton = document.getElementById("playNow")
    playButton.addEventListener("click", function () {
        if (!selectedDifficulty || !selectedTheme) {
            alert("Please select both a difficulty and a theme!");
            return;
        }

        console.log("numPairs:", selectedDifficulty);
        console.log("Theme:", selectedTheme);

        playGame(selectedDifficulty, selectedTheme, selectedChances);
    });

    logOutButton.addEventListener("click", function () {
        POSTLogout()
        login()
    })

    topPlayButton.removeEventListener("click", homePage)
    topPlayButton.addEventListener("click", ranking);
}


async function ranking() {
    const players = await GETHandlerAllUsers()

    mainDOM.innerHTML = ``;
    titleDOM.textContent = "Top Ranking!";

    mainDOM.innerHTML = `
        <div id="list"></div>
    `;

    const listDOM = document.getElementById("list");

    for (let i = 0; i < players.length; i++) {
        const user = players[i];
        listDOM.innerHTML += `
            <div class="user">
                <div class="rankingUser">
                    <h2>${i + 1}</h2>
                    <h2>${user.username}</h2>
                </div>

                <h2>${user.score}p</h2>
            </div>
        `;
    }

    const topPlayButton = document.getElementById("topPlayButton");
    topPlayButton.textContent = "Play Now";
    const logOutButton = document.getElementById("logOutButton");

    logOutButton.addEventListener("click", function () {
        POSTLogout()
        login()
    })

    topPlayButton.removeEventListener("click", ranking);
    topPlayButton.addEventListener("click", homePage);
}


function playGame(selectedDifficulty, selectedTheme, selectedChances) {
    mainDOM.innerHTML = ``;
    footerDOM.innerHTML = ``;
    titleDOM.textContent = `${selectedChances}`;

    mainDOM.innerHTML = `
        <div id="gamePlan"></div>
    `;

    footerDOM.innerHTML = `
        <div id="gameFooter">
        <button id="gameButton">Exit game! / Game over! / Collect points!</button>
        </div>
    `;

    const numberOfCards = Number(selectedDifficulty);
    const animalValue = selectedTheme;
    const numberOfUniqueImages = numberOfCards / 2; // blir det inte bättre med numberOfCards * 2??

    let images = [];



    //Lägga till fetch funktionerna här



    //Lägg till skapandet av korten här




    //Lägg till addventListener till 

    const exitButton = document.getElementById("gameButton")
    exitButton.addEventListener("click", function () {
        // if () {
        //     PATCHScore();
        //     homePage();
        // } else {
        PATCHExitGame();
        homePage();
        // }
    });
}









// Server request
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
        alert("User registered successfully! Please log in.");
        login()
    } else if (response.status === 409) {
        alert("1. Användaren finns redan!");
    } else if (response.status === 400) {
        alert("1. Användarnamn eller lösenord saknas!");
    }
}


async function GETLogin(username, password) {
    const response = await fetch(`http://localhost:8000/login?username=${username}&password=${password}`, {
        method: "GET"
    });

    const user = await response.json();
    // const message = document.createElement("p");
    // document.body.appendChild(message);

    if (response.status === 200) {
        alert("Login was successful!");
        // message.textContent = "2. Inloggning genomförd!";
        await GETCurrentUser();
        homePage();
    } else if (response.status === 401) {
        alert("Fel lösenord!");
        // message.textContent = "2. Fel lösenord!";
        console.log(user);
    } else if (response.status === 404) {
        alert("Användarnamnet finns inte, skapa ett konto!");
        // message.textContent = "2. Användarnamnet finns inte, skapa ett konto!";
        console.log(user);
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
        alert("Användar information för profilen är uppdaterad");
        // message.textContent = `3. Användar information för profilen är uppdaterad`;
        console.log(`3.`, data);
        currentUser = data
    } else if (response.status === 400) {
        alert("Användar information för profilen är uppdaterad");

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
        alert("Spel avbrutet, poängen uppdaterades ej.");
        // message.textContent = "5. Spel avbrutet, poängen uppdaterades ej.";
    } else if (response.status === 404) {
        alert("Något gick fel vid avslut.");
        // message.textContent = "5. Något gick fel vid avslut.";
    }
}


async function GETHandlerAllUsers() {
    const response = await fetch("http://localhost:8000/rankningslista");

    if (!response.ok) {
        console.log("6. Någonting gick fel!");
    } else {
        const rankning = await response.json();
        console.log("6. Alla användare är rankade!");
        return rankning;
    }
}


async function POSTLogout() {
    const response = await fetch("http://localhost:8000/logout", {
        method: "POST"
    })

    if (response.status === 200) {
        const logOutMessage = await response.json();
        //const message = document.createElement("p");
        console.log(`7. ${logOutMessage}`)
    }

}


login();




