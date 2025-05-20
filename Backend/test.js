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
        await GETLogin(username, password);
    } else if (response.status === 409) {
        message.textContent = "1. Användaren finns redan!";
    } else if (response.status === 400) {
        message.textContent = "1. Användarnamn eller lösenord saknas!";
    }
}

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
        // await GETHandlerAllUsers();

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
        // await POSTHandler();
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


async function testDriver() {
    await POSTHandlerRegistration("Hej", "hej", "hej");
    await POSTHandlerRegistration("Test", "hej", "hej");
    await POSTHandlerRegistration("Hej", "hej", "");

    // await GETLogin("Test", "test");
    await GETLogin("Test", "test1");
    await GETLogin("Tes", "test");

    await GETCurrentUser();

    await PATCHScore("Test", 150);
    await PATCHScore("Tes", 150);

    await PATCHExitGame("Test");
    await PATCHExitGame("Tes");

    await GETHandlerAllUsers();
    await POSTLogout();
}

testDriver();