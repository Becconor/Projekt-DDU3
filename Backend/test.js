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
// async function testLeaderboard() {
//     const response = await fetch("http://0.0.0.0:8000/leaderboard", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });

//     const message = document.createElement("p");
//     body.appendChild(message);

//     if (response.status === 200) {
//         message.textContent = "Lyckad förfrågan om att få alla users scores rangordnade";
//     } else {
//         message.textContent = `Nånting gick snett med test1!${response.status}`;
//     }
// }

async function testReg() {
    const response = await fetch("http://0.0.0.0:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Sebastian", password: "sebbe123" })
    })
    const message = document.createElement("p");
    body.appendChild(message);

    if (response.status === 201) {
        message.textContent = "Lyckad förfrågan om att registrera användare, funkar!";
    } else if (response.status === 409) {
        message.textContent = `Username already exist`
    } else if (response.status === 400) {
        message.textContent = `Missing username or password`
    }
}

async function callTests() {
    // await testLeaderboard();
    await testReg()
}

