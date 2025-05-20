const allUsers = [
    { username: "Test", password: "test", score: 0, level: 1 },
    { username: "Test2", password: "test2", score: 300, level: 3 },
    { username: "Test3", password: "test3", score: 200, level: 2 },
];

let currentUser = null;

async function handler(request) {
    const url = new URL(request.url);

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Content-Type", "application/json");

    if (request.method == "OPTIONS") {
        return new Response(null, { headers: headers });
    }

    if (request.method == "GET") {
        if (url.pathname == "/login") {
            if (url.searchParams.has("username") && url.searchParams.has("password")) {
                const usernameValue = url.searchParams.get("username");
                const passwordValue = url.searchParams.get("password");

                for (let user of allUsers) {
                    if (usernameValue === user.username) {
                        if (passwordValue === user.password) {
                            currentUser = user;
                            console.log(currentUser)
                            return new Response(JSON.stringify(user), {
                                status: 200,
                                headers: headers
                            });
                        } else {
                            return new Response(JSON.stringify("Fel lösenord!"), {
                                status: 401,
                                headers: headers
                            });
                        };
                    }
                }

                return new Response(JSON.stringify("Användarnamnet finns inte, skapa ett konto!"), {
                    status: 404,
                    headers: headers
                });
            }
        }


        if (url.pathname === "/profil") {
            if (!currentUser) {
                return new Response(JSON.stringify("Ingen användare är inloggad"), {
                    status: 400,
                    headers: headers
                });
            }

            delete currentUser.password;

            return new Response(JSON.stringify(currentUser), {
                status: 200,
                headers: headers
            });
        }


        if (url.pathname === "/rankningslista") {
            let sortAllUsers = allUsers.map(user => ({
                username: user.username,
                score: user.score
            }));

            sortAllUsers.sort((a, b) => b.score - a.score);

            return new Response(JSON.stringify(sortAllUsers), {
                status: 200,
                headers: headers
            });
        }
    }

    if (request.method == "POST") {
        if (url.pathname == "/registrering") {
            const inputBody = await request.json();
            const inputUsername = inputBody.username;
            const inputPassword = inputBody.password;
            const inputPassword2 = inputBody.password2;

            if (!inputUsername || !inputPassword || !inputPassword2) {
                return new Response(JSON.stringify("Användarnamn eller lösenord saknas!"), {
                    status: 400,
                    headers: headers
                });
            }


            for (let user of allUsers) {
                if (user.username == inputUsername) {
                    return new Response(JSON.stringify("Användarnamnet är upptaget!"), {
                        status: 409,
                        headers: headers
                    })
                }
            }

            let newUser = {
                username: inputUsername,
                password: inputPassword,
                score: 0,
                level: 1
            };

            allUsers.push(newUser);

            return new Response(JSON.stringify("Ny användare har lagts till:", newUser), {
                status: 200,
                headers: headers,
            });
        }

        if (url.pathname === "/logout") {
            currentUser = null;

            return new Response(JSON.stringify("Utloggad"), {
                status: 200,
                headers: headers
            });
        }
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

    return new Response(JSON.stringify("Felaktig endpoint!", request), {
        status: 400,
        headers: headers,
    });
}

Deno.serve(handler);