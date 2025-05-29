const usersFile = "./users.json";

export async function loadUsers() {
    const data = await Deno.readTextFile(usersFile);
    return JSON.parse(data);
}

export async function saveUsers(users) {
    const jsonData = JSON.stringify(users, null, 2);
    await Deno.writeTextFile(usersFile, jsonData);
}