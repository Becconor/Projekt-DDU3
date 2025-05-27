export async function getImage(animal) {
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




export async function POSTHandlerRegistration(username, password, password2) {
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

export async function GETLogin(username, password) {
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

export async function GETCurrentUser() {
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


export async function PATCHScore(username, score) {
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

export async function PATCHExitGame(username) {
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


export async function GETHandlerAllUsers() {
    const response = await fetch("http://localhost:8000/rankningslista");

    if (!response.ok) {
        console.log("6. Någonting gick fel!");
    } else {
        const rankning = await response.json();
        console.log("6. Alla användare är rankade!");
        return rankning;
    }
}


export async function POSTLogout() {
    const response = await fetch("http://localhost:8000/logout", {
        method: "POST"
    })

    if (response.status === 200) {
        const logOutMessage = await response.json();
        //const message = document.createElement("p");
        console.log(`7. ${logOutMessage}`)
    }

}

import {
    getImage,
    POSTHandlerRegistration,
    GETLogin,
    GETCurrentUser,
    PATCHScore
} from "./client.js"


