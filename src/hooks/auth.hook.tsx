import React, {useEffect, useState} from 'react';

export const useAuth = () => {

    useEffect(() => {
        const userData = localStorage.getItem("userData")
        let data;
        if (userData) {
            data = JSON.parse(userData)
        }
        if (data && data.token) {
            login(data.token);
        }
        setIsReady(true);
    },[])

    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    const login = (JWTtoken: string) => {
        setToken(JWTtoken);
        localStorage.setItem("userData", JSON.stringify({
            token: JWTtoken
        }))
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("userData")
    }
    return {token, isReady, login, logout}
};



