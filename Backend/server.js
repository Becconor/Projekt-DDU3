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
        if (pathname === "/") {
            return new Response(JSON.stringify(users), {
                status: 200,
                headers: headers
            })
        }

        if (pathname === "/login") {
            const usernameValue = url.searchParams.get("username");
            const passwordValue = url.searchParams.get("password");

            if (!usernameValue) {
                return new Response(JSON.stringify(alert("Skapa ett konto.")), {
                    status: 400,
                    headers: headers
                })
            }

            if (url.searchParams.has("username") && url.searchParams.has("password")) {
                for (let user of users) {
                    if (passwordValue === user.password) {
                        return new Response(JSON.stringify(user), {
                            status: 200,
                            headers: headers
                        })
                    } else {
                        return new Response(JSON.stringify(alert("Fel lösenord!")), {
                            status: 400,
                            headers: headers
                        })
                    }
                }
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
