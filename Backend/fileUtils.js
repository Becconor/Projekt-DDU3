const usersFile = "./users.json";


export async function loadUsers() {
    const data = await Deno.readTextFile(usersFile); //Här hämtar vi json filen 
    return JSON.parse(data);// och här parsar vi json filen till javascript objekt
}

export async function saveUsers(users) {
    const jsonData = JSON.stringify(users, null, 2);//Här gör vi om användaren som vi vill uppdatera i json filen till ett JSON objekt
    await Deno.writeTextFile(usersFile, jsonData);//Här skickar vi det nya jasonObjektet för att läggas till i json filen
}