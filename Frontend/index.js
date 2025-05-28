class Card {
    constructor(url, id, theme) {
        this.url = url;
        this.theme = theme;
        this.flipped = false;
    }

    flipStatusTrue() {
        this.flipped = true;
    }
    flipStatusFalse() {
        this.flipped = false;
    }
}


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
                <div class="wrongPasswordDiv">
                    <p id="wrongPasswordMessage" class="hidden">Wrong password!</p>
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
            <button value="4" data-points="100" class="buttons" class="difficultyButton" id="easy">EASY</button>
            <button value="6" data-points="200" class="buttons" class="difficultyButton" id="medium">MEDIUM</button>
            <button value="8" data-points="300" class="buttons" class="difficultyButton"  id="hard">HARD</button>
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
                        <h3 id="level">0</h3>
                    </div>

                    <div id="myPoints">
                        <p>${currentUser.score}</p>
                        <p>/</p>
                        <p id="levelPoints">0</p>
                    </div>
                </div>

                <button id="topPlayButton">Top Players</button>
            </div>
        </div>
    `;

    let level = document.getElementById("level");
    let levelPoints = document.getElementById("levelPoints");

    if (currentUser.score >= 4000) {
        levelPoints.textContent = 5000;
        level.textContent = 4;
    } else if (currentUser.score >= 3000) {
        levelPoints.textContent = 4000;
        level.textContent = 3;
    } else if (currentUser.score >= 2000) {
        levelPoints.textContent = 3000;
        level.textContent = 2;
    } else if (currentUser.score >= 1000) {
        levelPoints.textContent = 2000;
        level.textContent = 1;
    } else {
        levelPoints.textContent = 1000;
        level.textContent = 0;
    }

    const difficultyButtons = document.querySelectorAll("#levelButtons button");
    const themeButtons = document.querySelectorAll("#categoryButtons button");

    let selectedDifficulty = null;
    let selectedTheme = null;
    let selectedPoints = null;

    difficultyButtons.forEach(button => {
        button.addEventListener("click", function () {
            difficultyButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedDifficulty = this.value;
            selectedPoints = this.dataset.points;
        });
    });

    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            themeButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedTheme = this.value;
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

        playGame(selectedDifficulty, selectedTheme, selectedPoints);
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


async function playGame(selectedDifficulty, selectedTheme, selectedPoints) {
    mainDOM.innerHTML = ``;
    footerDOM.innerHTML = ``;
    titleDOM.textContent = `Wrong Moves Left: 6`;

    mainDOM.innerHTML = `
        <div id="gamePlan"></div>
    `;

    footerDOM.innerHTML = `
        <div id="gameFooter">
        <button id="gameButton">Exit game</button>
        </div>
    `;

    const gamePlan = document.getElementById("gamePlan");
    const gameButton = document.getElementById("gameButton");
    const numberOfCards = Number(selectedDifficulty);
    const animalValue = selectedTheme;
    let wrongMovesLeft = 6;

    const points = Number(selectedPoints);

    let images = [];

    //Lägg till skapandet av korten här

    while (images.length < numberOfCards) {
        const url = await getImage(animalValue);

        let alreadyExistsURL = false;
        for (let i = 0; i < images.length; i++) {
            if (images[i].url === url) {
                alreadyExistsURL = true;
            }
        }

        if (!alreadyExistsURL) {
            const card = new Card(url, animalValue);
            images.push(card);

        }
    }

    const startLength = images.length;
    for (let i = 0; i < startLength; i++) {
        const originalCard = images[i];
        const copyCard = new Card(originalCard.url, originalCard.theme);
        images.push(copyCard);
    }

    images.sort(() => Math.random() - 0.5);

    let flippedCards = [];

    for (let i = 0; i < images.length; i++) {
        const card = images[i];
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("memoryCard");
        cardDiv.cardData = card;

        cardDiv.addEventListener("click", function () {
            if (card.flipped || flippedCards.length === 2 || flippedCards.includes(cardDiv)) {
                return;
            }

            card.flipStatusTrue();//card är ett objekt från klassen Card
            cardDiv.style.backgroundImage = `url('${card.url}')`;

            flippedCards.push(cardDiv);

            if (flippedCards.length === 2) {
                setTimeout(function () {
                    const firstCard = flippedCards[0];
                    const secondCard = flippedCards[1];

                    if (firstCard.cardData.url === secondCard.cardData.url) {
                        // här får vi matchen
                        firstCard.cardData.flipStatusTrue();
                        secondCard.cardData.flipStatusTrue();
                    } else {
                        firstCard.cardData.flipStatusFalse();
                        secondCard.cardData.flipStatusFalse();

                        firstCard.style.backgroundImage = "url(`img/backside.png`)";
                        secondCard.style.backgroundImage = "url(`img/backside.png`)";

                        wrongMovesLeft--;
                        titleDOM.textContent = "Wrong Moves Left: " + wrongMovesLeft;
                    }

                    flippedCards = [];

                    let allFlipped = false;
                    let flippedCount = 0;
                    const allCards = document.querySelectorAll(".memoryCard");

                    for (let i = 0; i < allCards.length; i++) {
                        if (allCards[i].cardData.flipped) {
                            flippedCount++;
                        }
                    }

                    if (flippedCount === allCards.length) {
                        allFlipped = true;
                    }

                    if (allFlipped) {
                        mainDOM.innerHTML = ``;
                        mainDOM.innerHTML = `
                        <div class="finishedGameMessages">
                          <p class="finishedMessage">You Win!</p>
                          <p class="finishedMessage">Collect Points Down Below</p>
                        </div>   
                        `;

                        gameButton.textContent = `Collect Points`;
                        gameButton.addEventListener("click", async function () {
                            await PATCHScore(currentUser.username, points);
                            currentUser.score += points;
                            homePage();
                            return
                        });
                    } else if (wrongMovesLeft === 0) {
                        mainDOM.innerHTML = ``;
                        mainDOM.innerHTML = `
                        <div class="finishedGameMessages">
                          <p class="finishedMessage">You Have Used All Your Wrong Moves</p>
                          <p class="finishedMessage">Please Exit Down Below</p>
                        </div>
                        `;

                        gameButton.textContent = `Game Over`;
                        gameButton.addEventListener("click", function () {
                            homePage();
                            return
                        });

                    }
                }, 1000)
            }
        });

        gamePlan.append(cardDiv);
    }
    gameButton.addEventListener("click", function () {
        homePage();
        return
    });
}









// Server request
async function getImage(animal) {
    if (animal === "dog") {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        console.log(data.message);
        return data.message;
    }
    if (animal === "fox") {
        const response = await fetch("https://randomfox.ca/floof/");
        const data = await response.json();
        return data.image;
    }
    if (animal === "cat") {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        return data[0].url;
    }
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
        // message.textContent = "2. Inloggning genomförd!";
        await GETCurrentUser();
        homePage();
    } else if (response.status === 401) {

        document.getElementById("inputPassword").value = "";
        document.getElementById("wrongPasswordMessage").classList.remove("hidden");
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
        // message.textContent = `3. Användar information för profilen är uppdaterad`;
        console.log(`3.`, data);
        currentUser = data
    } else if (response.status === 400) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        alert(errorMessage);

        // message.textContent = `3. Ingen användare är inloggad`;
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
        console.log("Poängen har uppdaterats för användaren");

        // message.textContent = "4. Poäng har adderats till totalpoängen för användaren!";
    } else if (response.status === 404) {
        alert("4. Användaren hittades inte!");

        // message.textContent = "4. Användaren hittades inte!";
    } else {
        alert("4. Något gick fel!");

        // message.textContent = "4. Något gick fel!";
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




