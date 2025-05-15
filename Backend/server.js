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

            const body = await request.json();

            const alreadyExistUsername = users.some(user => user.name === users.name);
            const alreadyExistPassword = users.some(user => user.password === users.password);

            if (alreadyExistUsername) {
            }

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
}