
export const login_user = async (username, password, login) => {
    const BACKEND = import.meta.env.VITE_BACKEND;

    try {
        const request = await fetch(`${BACKEND}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, client: "web"}),
            credentials: "include",
        });
        const responde = await request.json();
        if (request.status===200) {
            login(responde.accessToken, responde.user);
        };
        return {status: request.status, msg: responde.msg || undefined, accessToken: responde.accessToken||undefined};
    } catch(error) {
        console.error(error.message);
        return {status:500, msg:"Something went wrong, try again."}
    }
};