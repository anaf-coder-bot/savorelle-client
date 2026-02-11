import { useAuth } from "../../context/AuthContext";

export const useApi = () => {
    const { accessToken, get_token, logout } = useAuth();
    const BACKEND = import.meta.env.VITE_BACKEND;

    const request = async (endpoint, option) => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            };
            
            let response = await fetch(`${BACKEND}${endpoint}`, {headers, ...option});
    
            if (response.status === 403 || response.status === 401) {
                console.log("Access token expired, attempting refresh...");
    
                const newToken = await get_token();
    
                if (newToken) {
                    headers["Authorization"] = `Bearer ${newToken}`;
                    response = await fetch(`${BACKEND}${endpoint}`, {headers, ...option});
                } else {
                    logout();
                };
            };
            return response;
        } catch(error) {
            return {error:"Something went wrong try again."};
        }
    };
    return { request };
};