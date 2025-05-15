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

    if (request.method === "POST") {
        if (pathname === "/register") {

            const body = await request.json();
            const username = body.username;
            const password = body.password;

            if (!username || !password) {
                return new Response(JSON.stringify("Missing username or password"), {
                    status: 400,
                    headers: headers
                })
            }

            const alreadyExists = users.some(user => user.username === username);

            if (alreadyExists) {
                return new Response(JSON.stringify("Username already exist"), {
                    status: 409,
                    headers: headers
                })
            }

            users.push({
                username: username,
                password: password
            });

            return new Response(JSON.stringify("User registered"), {
                status: 201,
                headers: headers
            })
        }
    }
}
