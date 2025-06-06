import { loadUsers, saveUsers } from "./fileUtils.js";

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.level = 0;
        this.score = 0;
    }
}

let currentUser = null;

async function handler(request) {
    const url = new URL(request.url);

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Content-Type", "application/json");

    if (request.method == "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headers
        });
    }

    if (request.method == "GET") {
        const allUsers = await loadUsers();

        if (url.pathname == "/login") {
            if (url.searchParams.has("username") && url.searchParams.has("password")) {
                const usernameValue = url.searchParams.get("username");
                const passwordValue = url.searchParams.get("password");

                if (usernameValue && passwordValue) {
                    const user = allUsers.find(u => u.username === usernameValue);

                    if (user) {
                        if (user.password === passwordValue) {
                            currentUser = user;

                            return new Response(null, {
                                status: 200,
                                headers: headers
                            });
                        } else {
                            return new Response(JSON.stringify("Fel lösenord!"), {
                                status: 401,
                                headers: headers
                            });
                        };
                    } else {
                        return new Response(JSON.stringify("Användarnamnet finns inte, skapa ett konto!"), {
                            status: 404,
                            headers: headers
                        });

                    }
                }

            }
        }

        if (url.pathname === "/profil") {
            const userCopy = {
                username: currentUser.username,
                score: currentUser.score,
                level: currentUser.level
            };

            return new Response(JSON.stringify(userCopy), {
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

    if (request.method === "POST") {
        const allUsers = await loadUsers();

        if (url.pathname === "/registrering") {
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

            const existingUser = allUsers.find(u => u.username === inputUsername);
            if (existingUser) {
                return new Response(JSON.stringify("Användarnamnet är upptaget!"), {
                    status: 409,
                    headers: headers
                });
            }

            currentUser = new User(inputUsername, inputPassword);
            allUsers.push(currentUser);
            await saveUsers(allUsers);

            return new Response(null, {
                status: 200,
                headers: headers,
            })
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
        const allUsers = await loadUsers();

        if (url.pathname === "/gameScore") {
            const body = await request.json();
            const score = body.score;

            const user = allUsers.find(u => u.username === currentUser.username);
            if (user) {
                user.score += score;
                await saveUsers(allUsers);
                currentUser = user;
                return new Response(JSON.stringify(`Poäng har uppdaterats för ${currentUser.username}`), {
                    status: 200,
                    headers: headers
                });
            } else {
                return new Response(JSON.stringify("Användaren hittades inte i databasen!"), { status: 401, headers });
            }

        }
    }

    return new Response(JSON.stringify("Felaktig endpoint!", request), {
        status: 400,
        headers: headers,
    });
}

Deno.serve(handler);