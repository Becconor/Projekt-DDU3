const users = [
    { username: "Test", password: "test", score: 0, level: 1 },
    { username: "Test2", password: "test2", score: 100, level: 1 },
    { username: "Test3", password: "test3", score: 200, level: 2 }
];

let currentUser = null;

async function handler(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;


    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    headers.set("Content-Type", "application/json");

    if (request.method == "OPTIONS") {
        return new Response(null, { headers: headers });
    }

    if (request.method === "GET") {
        if (pathname === "/login") {

            console.log("Inne i login")
            const usernameValue = url.searchParams.get("username");
            const passwordValue = url.searchParams.get("password");

            if (!usernameValue || !passwordValue) {
                return new Response(JSON.stringify("Saknar användarnamn eller lösenord"), {
                    status: 400,
                    headers: headers
                })
            }

            const match = users.find(user => user.username === usernameValue && user.password === passwordValue);
            console.log(match, "användaren som matchades");
            currentUser = match

            if (match) {

                return new Response(JSON.stringify("Login successful!"), {
                    status: 200,
                    headers: headers
                })
            } else {
                return new Response(JSON.stringify("Fel användarnamn eller lösenord"), {
                    status: 400,
                    headers: headers
                })
            }
        };

        if (url.pathname === "/leaderboard") {
            let sortAllUsers = users.map(user => ({
                username: user.username,
                score: user.score
            }));

            sortAllUsers.sort((a, b) => b.score - a.score);
            return new Response(JSON.stringify(sortAllUsers), {
                status: 200,
                headers: headers
            });
        }

        if (pathname === "/me") {
            if (!currentUser) {
                return new Response(JSON.stringify("Ingen användare är inloggad"), {
                    status: 400,
                    headers: headers
                })
            }

            delete currentUser.password;

            return new Response(JSON.stringify(currentUser), {
                status: 200,
                headers: headers
            })
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
                password: password,
                score: 0,
                level: 1
            });

            return new Response(JSON.stringify("User registered"), {
                status: 201,
                headers: headers
            })
        }

        // if (pathname === "/score") {
        //     const body = await request.json();
        //     const score = body.score;
        //     const username = body.username;

        //     const existingPlayer = users.find(player => player.username === username);

        //     if (!existingPlayer) {
        //         return new Response(JSON.stringify("Användaren finns inte!"), {
        //             status: 404,
        //             headers: headers
        //         })
        //     }

        //     existingPlayer.score += score

        //     return new Response(JSON.stringify(`Poäng har uppdaterats för ${existingPlayer.username}`), {
        //         status: 200,
        //         headers: headers
        //     })
        // }

    }

    if (request.method === "PATCH") {
        if (url.pathname === "/gameScore") {
            const body = await request.json();
            const username = body.username;
            const score = body.score;

            const existingPlayer = allUsers.find(player => player.username === username);

            if (!existingPlayer) {
                return new Response(JSON.stringify("Användaren hittades inte!"), {
                    status: 404,
                    headers: headers
                });
            }

            existingPlayer.score += score;

            return new Response(JSON.stringify(`Poäng har uppdaterats för ${existingPlayer.username}`), {
                status: 200,
                headers: headers
            });
        }
    }

    return new Response(JSON.stringify("Här ska du inte vara!", request), {
        status: 200,
        headers: headers,
    })
}



Deno.serve(handler);