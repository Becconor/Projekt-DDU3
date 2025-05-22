
let currentUser = null;
// login sida

let bodyDOM = document.querySelector("body");

function login() {
    bodyDOM.id = "login";

    bodyDOM.innerHTML = `
        <h1 id="logga">REMEMBER ME</h1>

        <div class="loginCenter" id="signIn">
            <h2>Login</h2>

            <input type="text" placeholder="Username" id="username">
            <input type="text" placeholder="Password" id="password">
            <button id="signInButton" class="signButton">SIGN IN</button>
            
            <div class="loginCenter" id="signUpTransfer">
                <p>Not a member?</p>
                <button id="signButton" class="signButton">REGISTER HERE</button>
            </div>
        </div>
    `;

    let loginH1 = bodyDOM.querySelector("h1");
    loginH1.id = "logga";


    let signInButton = document.getElementById("signInButton");
    let signUpButton = document.getElementById("signButton");


    let usernameDOM = document.getElementById("username");
    let PasswordDOM = document.getElementById("password");


    signInButton.addEventListener("click", function () {
        let usernameValue = usernameDOM.value;
        let passwordValue = PasswordDOM.value;

        GETLogin(usernameValue, passwordValue);
    });

    signUpButton.addEventListener("click", registerUser);
}

login();


function registerUser() {

    bodyDOM.innerHTML = `
            <h1 id="logga">REMEMBER ME</h1>

            <div class="loginCenter" id="signIn">
                <h2>Create Account</h2>

                <input type="text" placeholder="Username" id="username">
                <input type="text" placeholder="Password" id="password1">
                <input type="text" placeholder="Confirm Password" id="password2">
                <button id="signInButton" class="signButton">SIGN UP</button>
        </div>
    `;

    // loginButtonDOM.textContent = "SIGN UP"
    let usernameDOM = document.getElementById("username");
    let PasswordDOM1 = document.getElementById("password1");
    let PasswordDOM2 = document.getElementById("password2");
    let signUpButton = document.getElementById("signInButton")


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


};

function homePage() {
    bodyDOM.innerHTML = ``;

    let headerDOM = document.createElement("header");
    let titleDivDOM = document.createElement("h2");
    let mainDOM = document.createElement("main");
    let footerDOM = document.createElement("footer");

    bodyDOM.removeAttribute("login");
    bodyDOM.classList.add("bodyBox");
    bodyDOM.id = "profil";
    titleDivDOM.id = "titleH2";

    footerDOM.classList.add("footerProfilInfo");

    headerDOM.innerHTML = `
        <h1>REMEMBER ME</h1>
    `;
    titleDivDOM.textContent = "Select your game!";

    mainDOM.innerHTML = `
        <div id="levelButtons">
            <button value="6" class="buttons" class="difficultyButton" id="easy">EASY</button>
            <button value="10" class="buttons" class="difficultyButton" id="medium">MEDIUM</button>
            <button value="16" class="buttons" class="difficultyButton"  id="hard">HARD</button>
        </div>

        <div id="categoryButtons">
            <button value="dog" class="buttons" id="cat">CATS</button>
            <button value="cat" class="buttons" id="dog">DOGS</button>
            <button value="fox" class="buttons" id="fox">FOXES</button>
        </div>

        <div id="playButton">
            <button class="buttons" id="playNow">PLAY</button> 
        </div>
    `;
    //Play button har id="startButton" från sebbes sida

    footerDOM.innerHTML = `
        <div id="info">
            <div id="profilImage"></div>

            <h2>${currentUser.username}</h2>

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

            <button id="topPlayersButton">Top Players</button>
        </div>
    `;

    bodyDOM.appendChild(headerDOM);
    bodyDOM.appendChild(titleDivDOM);
    bodyDOM.appendChild(mainDOM);
    bodyDOM.appendChild(footerDOM);

    const topPlayersButton = document.getElementById("topPlayersButton")

    topPlayersButton.addEventListener("click", ranking);
}

function playGame() {

}

async function ranking() {
    const players = await GETHandlerAllUsers()

    bodyDOM.classList.add("bodyBox");

    bodyDOM.innerHTML = `
    <header>
      <h1>REMEMBER ME</h1>
    </header>

    <h2>Top Ranking!</h2>

    <main id="listMain">
      <div id="list"></div>
    </main>

    <footer>
      <div id="info">
        <div id="profilImage"></div>
        <h2>${currentUser.username}</h2>
        <p id="logout">LogOut</p>
      </div>

      <div id="points">
        <div id="myPoints">
          <div>
            <h3>Level</h3>
            <h3>${currentUser.level}</h3>
          </div>

          <div>
            <p>${currentUser.score}</p>
            <p>/</p>
            <p>1000</p>
          </div>
        </div>
        <button id="playFromRank">PLAY</button>
      </div>
    </footer>
    `;

    const listDOM = document.querySelector("#list")

    for (let i = 0; i < players.length; i++) {
        const user = players[i];
        listDOM.innerHTML += `
           <div class="user">
        <div>
          <h2>${i + 1}</h2>
          <h2>${user.username}</h2>
        </div>
        <h2>${user.score}p</h2>
        </div>
        `;
    }

    document.querySelector("#logout").addEventListener("click", () => {
        POSTLogout();
        login()
    })
}

login();






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
        message.textContent = "5. Spel avbrutet, poängen uppdaterades ej.";
    } else if (response.status === 404) {
        message.textContent = "5. Något gick fel vid avslut.";
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
        // let currentUserResponse = await GETCurrentUser();
        let currentUserProfile = await currentUserResponse.json();
        let currentUserData = JSON.stringify(currentUserProfile); 
        createProfilePage();
        //Skapa funktion för att skapa divar för profil sidan

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
            <button value="6" class="difficultyButton" class="buttons" id="easy">EASY</button>
            <button value="10" class="difficultyButton" class="buttons" id="medium">MEDIUM</button>
            <button value="16" class="difficultyButton" class="buttons" id="hard">HARD</button>
        </div>

        <div id="categoryButtons">
            <button value="dog" class="animalButton" class="buttons" >CATS</button>
            <button value="cat" class="animalButton" class="buttons" >DOGS</button>
            <button value="fox" class="animalButton" class="buttons" >FOXES</button>
        </div>

        <div id="playButton">
            <button class="buttons" id="playButton">PLAY</button> 
        </div>
    `;
    //Play button har id="startButton" från sebbes sida

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





//Från Sebastians js branch index.js (20/5 15:23) 

let selectedDifficulty = null;
let selectedAnimal = null;

const difficultyButtons = document.querySelectorAll(".difficultyButton");
for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener("click", function () {
        selectedDifficulty = this.value;

        for (let j = 0; j < difficultyButtons.length; j++) {
            difficultyButtons[j].classList.remove("selected");
        }
        this.classList.add("selected")
    })
}

const animalButtons = document.querySelectorAll(".animalButton");
for (let i = 0; i < animalButtons.length; i++) {
    animalButtons[i].addEventListener("click", function () {
        selectedAnimal = this.value;

        for (let j = 0; j < animalButtons.length; j++) {
            animalButtons[j].classList.remove("selected")
        }
        this.classList.add("selected")
    })
}
//Vi skapar två varibler. En för svårighetsgrad och en för djuret.
//Vi loopar igenom alla knappar och tar ut värden från knappen som klickas.
//Använder en nästlad loop för att ta bort classen selected från en knapp.
//Sen lägger vi även till classen selected för den man trycker på.

let playButtonDOM = document.querySelector("#playButton");
playButtonDOM.addEventListener("click", async function () {

    const numberOfCards = Number(selectedDifficulty);
    const animalValue = selectedAnimal;
    const numberOfUniqueImages = numberOfCards / 2;

    let images = [];

    async function getImage(animal) {
        if (animal === "dog") {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
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

    for (let i = 0; i < numberOfUniqueImages; i++) {
        const imageURL = await getImage(animalValue);
        images.push(imageURL);
    }
    //Här loopar vi igenom hälften så många gånger som svårighetsgraden. Till exempel
    //Svårighetsgrad lätt vilket är 6 kort i memoryt, då loopar vi igenom 3 gånger.
    //Vi anropar då getImage 3 gånger där vi fetchar det valda djuret.
    //Vi får ut 3 bilder som vi pushar till image arrayen.

    let cards = [];
    for (let i = 0; i < images.length; i++) {
        cards.push(images[i]);
        cards.push(images[i]);
    }
    //Vi skapar en cards array. Vi loopar igenom images där vi nu har i detta fall 3 bilder.
    //För varje instans så pushar vi det objektet i arrayen två gånger.
    //cards inehåller nu 6 objekt.

    cards.sort(function () {
        return Math.random() - 0.5;
    })
    //Här blandar vi korten. Förstår inte riktigt denna rad men ska se om det finns ett 
    //enklare sätt att göra det.

    const gameBoard = document.querySelector("#gameBoard");
    gameBoard.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
        const img = document.createElement("img");
        img.src = cards[i];
        img.style.width = "100px"
        gameBoard.appendChild(img);
    }
    //Här selekterar vi vart vi vill att korten ska hamna.
    //Vi loopar sedan igenom cards och skapar en img för varje instans.
})
//SLUT p åfrån Sebastians kod från branch js index.js (20/5 15:23) 
//------------------------------------------------------------------------------------------------------------------------------------------------------- 


//-------------------------------------------------------------------------------------------------------------------------------------------------------
//Från test sidan! Från denna rad till rad 232! 
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
// ----------------------------------------------------------------------------------------------------------------------------- 


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
});
 */