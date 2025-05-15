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

    const message = document.createElement("p");
    body.appendChild(message);

    if (response.status === 200) {
        message.textContent = "Lyckad förfrågan om att få alla users scores rangordnade";
    } else {
        message.textContent = `Nånting gick snett med test1!${response.status}`;
    }


async function callTests() {
    await testLeaderboard();
}