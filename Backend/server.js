const users = [];

async function handler(request) {

    const url = new URL(request.url);
    const pathname = url.pathname;

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");



    if (request.method === "GET") {
        if (pathname === "/logIn") {
            const body = await request.json();

            const alreadyExistUsername = users.some(user => user.name === users.name);
            const alreadyExistPassword = users.some(user => user.password === users.password);

            if (alreadyExistUsername) {
            }

        }
    }
}