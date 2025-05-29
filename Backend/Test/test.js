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
        message.textContent = "1. Användarnamnet är upptaget!";
    } else if (response.status === 400) {
        message.textContent = "1. Användarnamn eller lösenord saknas!";
    }
}

async function GETLogin(username, password) {
    const response = await fetch(`http://localhost:8000/login?username=${username}&password=${password}`, {
        method: "GET"
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "2. Inloggning genomförd!";
    } else if (response.status === 401) {
        message.textContent = "2. Fel lösenord!";
    } else if (response.status === 404) {
        message.textContent = "2. Användarnamnet finns inte, skapa ett konto!";
    }
}

async function GETCurrentUser() {
    const response = await fetch("http://localhost:8000/profil", {
        method: "GET"
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (!response.ok) {
        message.textContent = `3. Något gick fel!`;
    } else {
        message.textContent = `3. Användarinformation för profilen är uppdaterad`;
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

    if (!response.ok) {
        message.textContent = `4. Något gick fel!`;
    } else {
        message.textContent = "4. Poäng har adderats till totalpoängen för användaren!";

    }
}


async function GETHandlerAllUsers() {
    const response = await fetch("http://localhost:8000/rankningslista");

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (!response.ok) {
        message.textContent = "5. Något gick fel!";
    } else {
        message.textContent = "5. Alla användare är rankade!";
    }
}

async function POSTLogout() {
    const response = await fetch("http://localhost:8000/logout", {
        method: "POST"
    })

    if (!response.ok) {
        message.textContent = "6. Något gick fel!";
    } else {
        const logOutMessage = await response.json();
        const message = document.createElement("p");
        message.textContent = `6. ${logOutMessage}`;
        document.body.appendChild(message);
    }

}


async function testDriver() {
    await POSTHandlerRegistration("Tester", "tester", "tester");
    await POSTHandlerRegistration("Tester", "tester", "");
    await POSTHandlerRegistration("Test", "hej", "hej");

    await GETLogin("Tester", "tester");
    await GETLogin("Tester", "test");
    await GETLogin("Tes", "test");

    await GETCurrentUser();

    await PATCHScore("Tester", 200);

    await GETHandlerAllUsers();

    await POSTLogout();
}

testDriver();