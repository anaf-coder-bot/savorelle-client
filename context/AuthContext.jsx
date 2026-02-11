import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Loading2 from "../src/components/Loading2";
import LoadingToken from "../src/components/LoadingToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const BACKEND = import.meta.env.VITE_BACKEND;
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get_token();
    }, []);

    const get_token = useCallback( async () => {
        try {
            setLoading(true);
            const request = await fetch(`${BACKEND}/auth/refresh`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                credentials: "include",
            });
            if (request.ok){
                const responde = await request.json();
                setAccessToken(responde.accessToken);
                setUser(responde.user);
                return responde.accessToken;
            } else {
                setAccessToken(null);
                setUser(null);
                return null;
            };
        } catch (error) {
            console.error("Silent refresh failed:",error.message);
        } finally {
            setLoading(false);
        };
    }, []);

    const login = (token, user) => {
        setAccessToken(token);
        setUser(user)
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        try {
            fetch(`${BACKEND}/auth/logout`, {
                method: "POST",
                credentials:"include",
            });
        } catch (e) {};
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, get_token, user, loading }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);