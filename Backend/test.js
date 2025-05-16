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

    const message = document.createElement("p");
    document.body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "Successful login!";
        const successMessage = document.createElement("p");
        const userInfo = document.createElement("p");
        document.body.append(successMessage, userInfo);
        

    } if (response.status === 200) {

        successMessage.textContent = `${response.message}`;

        const userInfoForBar = await response.json();

        userInfo.textContent = `${userInfoForBar.username}, ${userInfoForBar.score}`;


        //OBS! I index.js så behöver login-processen fortsättas härifrån förmodligen då klienten ska förfråga om att få bli skickad till nästa sida, startsidan 
        //men vi måste klura ut hur den förfrågan ska ske
    } else if (response.status === 400) {
        message.textContent = "Unsuccessful login! Wrong password! Try again!";
    }
}

async function testScore() {
    const response = await fetch("http://0.0.0.0:8000/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Sebastian", score: 100 })
    });

    const message = document.createElement("p");
    document.body.appendChild(message);

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
        message.textContent = `${data}`
    } else {
        message.textContent = `Fel!, status: ${response.status}`
    }
}


async function callTests() {
    await testReg();
    await testLogin("Sebastian", "sebbe")
    await testScore()
    await testLeaderboard()
}

callTests()
