//FÖRSLAG: att ha våra x-antal fetches, alltså de specifika förfrågningarna vi behöver göra, 
//i varsin async-funktion och sen ha en async-funktion som anropar alla test-fetches
//t.ex:
//
//async function test1(){
//  const response = await fetch(request, {
//   method: "POST", 
//   osv
//  });
//}

//async function callTests(){
//  await test1();
//  await test2();
//  await test3();
//  ...osv...
//}

//test1 är att skicka en GET-förfrågan för att få alla users, detta är förutsättningen för register och login
async function testLeaderboard() {
    const response = await fetch("http://0.0.0.0:8000/leaderboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    const dataJson = JSON.stringify(data);
    const message = document.createElement("p");
    const dataMessage = document.createElement("p");
    document.body.appendChild(message);
    document.body.appendChild(dataMessage);

    if (response.status === 200) {
        message.textContent = `Lyckad förfrågan om att få alla users scores rangordnade`;
        dataMessage.textContent = `${dataJson}`;
    } else {
        message.textContent = `Nånting gick snett med test1!${response.status}`;
    }
}

async function testReg() {
    const response = await fetch("http://0.0.0.0:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Sebastian", password: "sebbe" })
    })
    const message = document.createElement("p");
    document.body.appendChild(message)

    if (response.status === 201) {
        message.textContent = "Successful request to register user!";
    } else if (response.status === 409) {
        message.textContent = `Username already exist`
    } else if (response.status === 400) {
        message.textContent = `Missing username or password`
    }

}

async function testLogin(username, password) {
    const response = await fetch(`http://0.0.0.0:8000/login?username=${username}&password=${password}`, {
        method: "GET"
    });

    const successMessage = document.createElement("p");
    document.body.appendChild(successMessage);

    if (response.status === 200) {

        const message = await response.json();
        successMessage.textContent = message;
        //OBS! I index.js så behöver login-processen fortsättas härifrån förmodligen då klienten ska förfråga om att få bli skickad till nästa sida, startsidan 
        //men vi måste klura ut hur den förfrågan ska ske
    } else if (response.status === 400) {
        message.textContent = "Unsuccessful login! Wrong password! Try again!";
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
        message.textContent = "Poäng har adderats till totalpoängen för användaren!";
        // await GETHandlerAllUsers();

    } else if (response.status === 404) {
        message.textContent = "Användaren hittades inte!";
    } else {
        message.textContent = "Något gick fel!";
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
        message.textContent = "Spel avbrutet, poängen uppdaterades ej.";
    } else {
        message.textContent = "Något gick fel vid avslut.";
    }
}

async function testCurrentUser() {
    const response = await fetch("http://0.0.0.0:8000/me", {
        method: "GET"
    })

    const data = await response.json()
    const message = document.createElement("p");
    message.textContent = `${data}`
    document.body.appendChild(message)
    console.log(data)
}


async function callTests() {
    await testReg();
    await testLogin("Sebastian", "sebbe")
    await PATCHScore("Sebastian", "100")
    await PATCHExitGame("Test");
    await testLeaderboard()
    await testCurrentUser();
}

callTests()
